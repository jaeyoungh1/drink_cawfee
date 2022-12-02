from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Coffee, Cart, Order, Note, Day, Brand, Review, User, db
from app.forms.add_coffee_form import AddCoffeeForm
from app.forms.add_review_form import AddReviewForm
from app.forms.delete_form import DeleteForm
from app.forms.add_to_cart_form import AddToCartForm
from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

coffee_routes = Blueprint('coffees', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# def normalize_query_param(val):
#     return val if len(val) > 1 else val[0]
def normalize_query(params):
    init_params = params.to_dict(flat=False)
    return {key: val for key, val in init_params.items()}


# GET all coffees
@coffee_routes.route('/')
def get_all_coffee():
    # search and filter>>>>>>
    search_params = normalize_query(request.args)
    query = Coffee.query
    for param in search_params:
        # print(">>>>>>>>>> PARAM", param, search_params[param][0])
        if param == 'origin' and search_params[param] != ["singleOrigin"] and search_params[param] != ['Various (blend)']:
            query = query.filter(Coffee.origin.in_(search_params[param]))
        elif search_params[param] == ["singleOrigin"]:
            query = query.filter(Coffee.origin != 'Various (Blend)')
        elif search_params[param][0] == 'Various (blend)':
            query = query.filter(Coffee.origin == 'Various (Blend)')
        if param == 'roast':
            query = query.filter(Coffee.roast.in_(search_params[param]))
        if param == 'note':
            query = query.filter(Coffee.notes.any(
                Note.note.in_(search_params[param])))
        if param == 'roaster':
            query = query.join(Brand).filter(
                Brand.name.in_(search_params[param]))
    res = query.all()

    if search_params:
        # print(">>>>>>>>>>  SEARCH AND FILTER ACTIVATED!<3")
        coffee_list = [coffee.to_dict() for coffee in res]
        for coffee in coffee_list:
            brand = Brand.query.get(coffee['brand_id']).to_dict()
            coffee['Brand'] = brand
        return {'Coffees': coffee_list}
    # end search and filter<<<<<<<<<<<''

    else:
        coffees = Coffee.query.all()
        coffee_list = [coffee.to_dict() for coffee in coffees]
        for coffee in coffee_list:
            brand = Brand.query.get(coffee['brand_id']).to_dict()
            coffee['Brand'] = brand
        return {'Coffees': coffee_list}


# GET one coffee
@coffee_routes.route('/<int:coffee_id>')
def get_one_coffee_details(coffee_id):
    current_coffee = Coffee.query.get(coffee_id)
    if not current_coffee:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })
    coffee = current_coffee.to_dict()
    brand = Brand.query.get(coffee['brand_id']).to_dict()
    # coffee = coffee.to_dict()
    coffee['Brand'] = brand
    return coffee

# GET current user's curated coffees


@coffee_routes.route('/current')
@login_required
def get_current_user_coffees():
    user = current_user.to_dict()
    user_id = user['id']
    coffees = [coffee.to_dict()
               for coffee in Coffee.query.filter_by(curator_id=user_id)]
    for coffee in coffees:
        brand = Brand.query.get(coffee['brand_id']).to_dict()
        coffee['Brand'] = brand
    return {"Coffees": coffees}


notes = [
    {"Berry Fruit"},
    {"Stone Fruit"},
    {"Citrus"},
    {"Florals"},
    {"Vanilla"},
    {"Earthy"},
    {"Brown Sugar"},
    {"Milk Chocolate"},
    {"Nutty"},
    {"Spices"},
    {"Roastiness"},
    {"Tropical Fruit"}
]

# POST one coffee


@coffee_routes.route('/', methods=["POST"])
@login_required
def add_one_coffee():
    # print(">>>>> IM BEING PINGED")
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to curate", "status_code": 403}, 403
    user_id = user['id']


    # image = request.files["image"]

    # print(">>>>> request", request.files)

    form = AddCoffeeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # form = {}

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
            "errors": {}
        }

    # print("FORM.DATA", form.data)
    if "image" not in request.files:
            return {"errors": "image required"}, 401

    image = request.files["image"]
    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]

    # print("  >>>>>> URL", url)

    note_list = [Note(note=note) for note in form.data['notes'].split(',')]
    # print(" >>>>>> note_list", note_list)
    day_list = [Day(day=day) for day in form.data['days'].split(',')]
    if not form.data['name']:
        post_val_error['errors']['name'] = "Coffee name is required."
    if not form.data['origin']:
        post_val_error['errors']['origin'] = "Coffee origin is required."
    if not form.data['roast']:
        post_val_error['errors']['roast'] = "Coffee roast level is required."
    if not form.data['brand']:
        post_val_error['errors']['brand'] = "Coffee brand is required."
    check_brand = Brand.query.filter_by(name=form.data['brand'])
    if not check_brand:
        post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
    if not form.data['price']:
        post_val_error['errors']['price'] = "Coffee price is required."
    if not form.data['description']:
        post_val_error['errors']['description'] = "Coffee description is required."
    # if not form.data['img_url']:
    #     post_val_error['errors']['img_url'] = "Coffee preview image is required."
    if not form.data['notes']:
        post_val_error['errors']['notes'] = "Coffee tasting notes are required."
    if not form.data['days']:
        post_val_error['errors']['days'] = "Coffee roasting schedule is required."

    if len(post_val_error["errors"]) > 0:
        return jsonify(post_val_error), 400

   

    # print("ERRORS", validation_errors_to_error_messages(form.errors))
    # print("POSTVALERROR", post_val_error)
    if form.validate_on_submit():
        # print("  >>>>>> IM GETTING HIT")
        brand = check_brand.first().to_dict()

        coffee = Coffee(
            curator_id=user_id,
            name=form.data['name'],
            origin=form.data['origin'],
            roast=form.data['roast'].lower(),
            # process=form.data['wash'],
            inventory=form.data['inventory'],
            brand_id=brand['id'],
            price=form.data['price'],
            description=form.data['description'],
            # img_url=form.data['img_url'],
            img_url=url,
            notes=note_list,
            days=day_list
        )

        # print(">>>>>>BACKEND COFFEE", coffee)
        db.session.add(coffee)
        db.session.commit()

        coffee_res = coffee.to_dict()
        coffee_res['Brand'] = brand
        return coffee_res
    # print(">>>>>", validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# EDIT coffee INVENTORY


@coffee_routes.route('/inventory/<string:opt>/<int:id>', methods=["PUT"])
@login_required
def edit_one_coffee_inventory(id, opt):
    # print("   >>>>>> ID OPT", id, opt)
    # print("   >>>>>> OPT", opt == 'plus')
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    if opt == 'minus':
        # print("   >>>>>> MINUS BEING HIT")
        current_cart_coffee = Cart.query.get(id)
    # checking if cart exist
        if not current_cart_coffee:
            return jsonify({
                "message": "Cart couldn't be found",
                "status_code": 404
            })
        # checking if user added this cart item
        if current_cart_coffee.to_dict()['user_id'] != user_id:
            return {"message": "Forbidden", "status_code": 403}, 403

        if current_cart_coffee.to_dict()['user_id'] == user_id:
            coffee = Coffee.query.get(
                current_cart_coffee.to_dict()['coffee_id'])

            current_inventory = coffee.to_dict()['inventory']
            new_inventory = +current_inventory - + \
                current_cart_coffee.to_dict()['quantity']

            coffee.inventory = new_inventory

            db.session.commit()

            coffee_res = coffee.to_dict()
            brand = Brand.query.get(coffee_res['brand_id']).to_dict()
            coffee_res['Brand'] = brand

        return coffee_res
    elif opt == 'plus':
        # print("   >>>>>> PLUS BEING HIT", id)
        current_order_coffee = Order.query.get(id)
        # print("   >>>>>> CURRENT ORDER COFFEE", current_order_coffee)
    # checking if order exist
        if not current_order_coffee:
            return jsonify({
                "message": "Order couldn't be found",
                "status_code": 404
            })
        # checking if user added this order item
        if current_order_coffee.to_dict()['user_id'] != user_id:
            return {"message": "Forbidden", "status_code": 403}, 403

        # print("   >>>>>> CURRENT ORDER COFFEE", current_order_coffee.to_dict())
        if current_order_coffee.to_dict()['user_id'] == user_id:
            coffee = Coffee.query.get(
                current_order_coffee.to_dict()['coffee_id'])

            current_inventory = coffee.to_dict()['inventory']
            # print(" >>>>>> CURRENT INVENTORY", current_inventory)
            new_inventory = +current_inventory + + \
                current_order_coffee.to_dict()['quantity']
            # print(" >>>>>> NEW INVENTORY", new_inventory)

            coffee.inventory = new_inventory

            db.session.commit()

            coffee_res = coffee.to_dict()
            brand = Brand.query.get(coffee_res['brand_id']).to_dict()
            coffee_res['Brand'] = brand
            # print(" >>>>>> COFFEE RES", coffee_res)

            return coffee_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT one coffee


@coffee_routes.route('/<int:coffee_id>', methods=["PUT"])
@login_required
def edit_one_coffee(coffee_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to edit curations", "status_code": 403}, 403
    user_id = user['id']
    current_coffee = Coffee.query.get(coffee_id)
    # checking if coffee exist
    if not current_coffee:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })
    # checking if user curated this coffee
    if current_coffee.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddCoffeeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }
    url = ''
    print("FORM.DATA", form.data)
    if "image" not in request.files:
        url = form.data['img_url']
    else:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            # if the dictionary doesn't have a url key
            # it means that there was an error when we tried to upload
            # so we send back that error message
            return upload, 400

        url = upload["url"]

    if current_coffee.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            note_list = [Note(note=note) for note in form.data['notes'].split(',')]
            # print(" >>>>>> note_list", note_list)
            day_list = [Day(day=day) for day in form.data['days'].split(',')]
            if not form.data['name']:
                post_val_error['errors']['name'] = "Coffee name is required."
            if not form.data['origin']:
                post_val_error['errors']['origin'] = "Coffee origin is required."
            if not form.data['roast']:
                post_val_error['errors']['roast'] = "Coffee roast level is required."
            if not form.data['brand']:
                post_val_error['errors']['brand'] = "Coffee brand is required."
            check_brand = Brand.query.filter_by(name=form.data['brand'])
            if not check_brand:
                post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
            if not form.data['price']:
                post_val_error['errors']['price'] = "Coffee price/lb is required."
            if not form.data['description']:
                post_val_error['errors']['description'] = "Coffee description is required."
            # if not form.data['img_url']:
            #     post_val_error['errors']['img_url'] = "Coffee preview image is required."
            if not form.data['notes']:
                post_val_error['errors']['notes'] = "Coffee tasting notes are required."
            if not form.data['days']:
                post_val_error['errors']['days'] = "Coffee roasting schedule is required."

            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            brand = check_brand.first().to_dict()

            current_coffee.curator_id = user_id
            current_coffee.name = form.data['name']
            current_coffee.origin = form.data['origin']
            current_coffee.roast = form.data['roast'].lower()
            current_coffee.inventory = form.data['inventory']
            current_coffee.brand_id = brand['id']
            current_coffee.price = form.data['price']
            current_coffee.description = form.data['description']
            # current_coffee.img_url = form.data['img_url']
            current_coffee.img_url = url
            current_coffee.notes = note_list
            current_coffee.days = day_list

            db.session.commit()

            coffee_res = current_coffee.to_dict()
            coffee_res['Brand'] = brand
            return coffee_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE one coffee
@coffee_routes.route('/<int:coffee_id>', methods=["DELETE"])
@login_required
def delete_one_coffee(coffee_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to delete curations", "status_code": 403}, 403
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_coffee = Coffee.query.get(coffee_id)
    # checking if coffee exists
    if not current_coffee:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })
    # checking if user curated this coffee
    if current_coffee.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_coffee.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_coffee)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# <--------------------------- REVIEWS -------------------------->

# GET all reviews for one coffee
@coffee_routes.route('/<int:coffee_id>/reviews')
def get_one_coffee_reviews(coffee_id):

    current_coffee = Coffee.query.get(coffee_id)
    # checking if coffee exist
    if not current_coffee:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })

    _reviews = Review.query.filter_by(coffee_id=current_coffee.to_dict()['id'])
    if not _reviews:
        return "No reviews exist for this coffee"
    reviews = [review.to_dict() for review in _reviews]
    for review in reviews:
        user = User.query.get(review['user_id']).to_dict()
        review['User'] = user

    return {"Reviews": reviews}

# POST review for one coffee
@coffee_routes.route('/<int:coffee_id>/reviews', methods=["POST"])
@login_required
def create_one_coffee_review(coffee_id):
    user = current_user.to_dict()

    user_id = user['id']

    current_coffee = Coffee.query.get(coffee_id)
    # checking if coffee exist
    if not current_coffee:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })

    # checking if user already has reviewed
    _reviews = Review.query.filter_by(coffee_id=current_coffee.to_dict()['id'])
    for review in _reviews:
        if review and review.to_dict()['user_id'] == user_id:
            return {"message": "User already has a review for this coffee", "status_code": 403}, 403

    form = AddReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if form.validate_on_submit():
        if not form.data['rating']:
            post_val_error['errors']['rating'] = "Rating is required."
        if not form.data['review_body']:
            post_val_error['errors']['review_body'] = "Review is required."

        if len(post_val_error["errors"]) > 0:
            return jsonify(post_val_error), 400

        review = Review(
            user_id=user_id,
            coffee_id=coffee_id,
            rating=form.data['rating'],
            review_body=form.data['review_body']
        )

        db.session.add(review)
        db.session.commit()

        review_res = review.to_dict()
        user = User.query.get(user_id).to_dict()
        review_res['User'] = user
        return review_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# # <--------------------------- SEARCH/FILTER -------------------------->
# @coffee_routes.route('/')
# def get_all_coffee_filtered():
#     origin = request.args.get('origin')
#     coffees = Coffee.query.all()
#     coffee_list = [coffee.to_dict() for coffee in coffees]
#     for coffee in coffee_list:
#         brand = Brand.query.get(coffee['brand_id']).to_dict()
#         coffee['Brand'] = brand
#     return {'Coffees': coffee_list}
