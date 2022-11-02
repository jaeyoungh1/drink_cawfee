from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Cart, Note, Day, Brand, Review, User, db
from app.forms.add_cart_form import AddCartForm
from app.forms.add_review_form import AddReviewForm
from app.forms.delete_form import DeleteForm

cart_routes = Blueprint('carts', __name__)


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
#     return val if len(val) > 1 else val[0]de
def normalize_query(params):
    init_params = params.to_dict(flat=False)
    return {key: val for key, val in init_params.items()}


# GET all carts
@cart_routes.route('/')
def get_all_cart():
    # search and filter>>>>>>
    search_params = normalize_query(request.args)
    query = Cart.query
    for param in search_params:
        # print(">>>>>>>>>> PARAM", param, search_params[param][0])
        if param == 'origin' and search_params[param] != ["singleOrigin"] and search_params[param] != ['Various (blend)']:
            query = query.filter(Cart.origin.in_(search_params[param]))
        elif search_params[param] == ["singleOrigin"]:
            query = query.filter(Cart.origin != 'Various (Blend)')
        elif search_params[param][0] == 'Various (blend)':
            query = query.filter(Cart.origin == 'Various (Blend)')
        if param == 'roast':
            query = query.filter(Cart.roast.in_(search_params[param]))
        if param == 'note':
            query = query.filter(Cart.notes.any(
                Note.note.in_(search_params[param])))
        if param == 'roaster':
            query = query.join(Brand).filter(
                Brand.name.in_(search_params[param]))
    res = query.all()

    if search_params:
        # print(">>>>>>>>>>  SEARCH AND FILTER ACTIVATED!<3")
        cart_list = [cart.to_dict() for cart in res]
        for cart in cart_list:
            brand = Brand.query.get(cart['brand_id']).to_dict()
            cart['Brand'] = brand
        return {'Carts': cart_list}
    # end search and filter<<<<<<<<<<<''

    else:
        carts = Cart.query.all()
        cart_list = [cart.to_dict() for cart in carts]
        for cart in cart_list:
            brand = Brand.query.get(cart['brand_id']).to_dict()
            cart['Brand'] = brand
        return {'Carts': cart_list}


# GET one cart
@cart_routes.route('/<int:cart_id>')
def get_one_cart_details(cart_id):
    current_cart = Cart.query.get(cart_id)
    if not current_cart:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })
    cart = current_cart.to_dict()
    brand = Brand.query.get(cart['brand_id']).to_dict()
    # cart = cart.to_dict()
    cart['Brand'] = brand
    return cart

# GET current user's curated carts


@cart_routes.route('/current')
@login_required
def get_current_user_carts():
    user = current_user.to_dict()
    user_id = user['id']
    carts = [cart.to_dict()
             for cart in Cart.query.filter_by(curator_id=user_id)]
    for cart in carts:
        brand = Brand.query.get(cart['brand_id']).to_dict()
        cart['Brand'] = brand
    return {"Carts": carts}


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

# POST one cart


@cart_routes.route('/', methods=["POST"])
@login_required
def add_one_cart():
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to curate", "status_code": 403}, 403
    user_id = user['id']

    form = AddCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    print("FORM.DATA", form.data)

    note_list = [Note(note=note) for note in form.data['notes']]
    day_list = [Day(day=day) for day in form.data['days']]
    if not form.data['name']:
        post_val_error['errors']['name'] = "Cart name is required."
    if not form.data['origin']:
        post_val_error['errors']['origin'] = "Cart origin is required."
    if not form.data['roast']:
        post_val_error['errors']['roast'] = "Cart roast level is required."
    if not form.data['brand']:
        post_val_error['errors']['brand'] = "Cart brand is required."
    check_brand = Brand.query.filter_by(name=form.data['brand'])
    if not check_brand:
        post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
    if not form.data['price']:
        post_val_error['errors']['price'] = "Cart price is required."
    if not form.data['description']:
        post_val_error['errors']['description'] = "Cart description is required."
    if not form.data['img_url']:
        post_val_error['errors']['img_url'] = "Cart preview image is required."
    if not form.data['notes']:
        post_val_error['errors']['notes'] = "Cart tasting notes are required."
    if not form.data['days']:
        post_val_error['errors']['days'] = "Cart roasting schedule is required."

    if len(post_val_error["errors"]) > 0:
        return jsonify(post_val_error), 400

    # print("ERRORS", validation_errors_to_error_messages(form.errors))
    print("POSTVALERROR", post_val_error)
    if form.validate_on_submit():
        brand = check_brand.first().to_dict()

        cart = Cart(
            curator_id=user_id,
            name=form.data['name'],
            origin=form.data['origin'],
            roast=form.data['roast'].lower(),
            # process=form.data['wash'],
            inventory=form.data['inventory'],
            brand_id=brand['id'],
            price=form.data['price'],
            description=form.data['description'],
            img_url=form.data['img_url'],
            notes=note_list,
            days=day_list
        )

        print(">>>>>>BACKEND COFFEE", cart)
        db.session.add(cart)
        db.session.commit()

        cart_res = cart.to_dict()
        cart_res['Brand'] = brand
        return cart_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT one cart


@cart_routes.route('/<int:cart_id>', methods=["PUT"])
@login_required
def edit_one_cart(cart_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to edit curations", "status_code": 403}, 403
    user_id = user['id']
    current_cart = Cart.query.get(cart_id)
    # checking if cart exist
    if not current_cart:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })
    # checking if user curated this cart
    if current_cart.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if current_cart.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            note_list = [Note(note=note) for note in form.data['notes']]
            day_list = [Day(day=day) for day in form.data['days']]
            if not form.data['name']:
                post_val_error['errors']['name'] = "Cart name is required."
            if not form.data['origin']:
                post_val_error['errors']['origin'] = "Cart origin is required."
            if not form.data['roast']:
                post_val_error['errors']['roast'] = "Cart roast level is required."
            if not form.data['brand']:
                post_val_error['errors']['brand'] = "Cart brand is required."
            check_brand = Brand.query.filter_by(name=form.data['brand'])
            if not check_brand:
                post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
            if not form.data['price']:
                post_val_error['errors']['price'] = "Cart price/lb is required."
            if not form.data['description']:
                post_val_error['errors']['description'] = "Cart description is required."
            if not form.data['img_url']:
                post_val_error['errors']['img_url'] = "Cart preview image is required."
            if not form.data['notes']:
                post_val_error['errors']['notes'] = "Cart tasting notes are required."
            if not form.data['days']:
                post_val_error['errors']['days'] = "Cart roasting schedule is required."

            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            brand = check_brand.first().to_dict()

            current_cart.curator_id = user_id
            current_cart.name = form.data['name']
            current_cart.origin = form.data['origin']
            current_cart.roast = form.data['roast'].lower()
            current_cart.inventory = form.data['inventory']
            current_cart.brand_id = brand['id']
            current_cart.price = form.data['price']
            current_cart.description = form.data['description']
            current_cart.img_url = form.data['img_url']
            current_cart.notes = note_list
            current_cart.days = day_list

            db.session.commit()

            cart_res = current_cart.to_dict()
            cart_res['Brand'] = brand
            return cart_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE one cart


@cart_routes.route('/<int:cart_id>', methods=["DELETE"])
@login_required
def delete_one_cart(cart_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to delete curations", "status_code": 403}, 403
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_cart = Cart.query.get(cart_id)
    # checking if cart exists
    if not current_cart:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })
    # checking if user curated this cart
    if current_cart.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_cart.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_cart)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# <--------------------------- REVIEWS -------------------------->

# GET all reviews for one cart
@cart_routes.route('/<int:cart_id>/reviews')
def get_one_cart_reviews(cart_id):

    current_cart = Cart.query.get(cart_id)
    # checking if cart exist
    if not current_cart:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })

    _reviews = Review.query.filter_by(cart_id=current_cart.to_dict()['id'])
    if not _reviews:
        return "No reviews exist for this cart"
    reviews = [review.to_dict() for review in _reviews]
    for review in reviews:
        user = User.query.get(review['user_id']).to_dict()
        review['User'] = user

    return {"Reviews": reviews}

# POST review for one cart


@cart_routes.route('/<int:cart_id>/reviews', methods=["POST"])
@login_required
def create_one_cart_review(cart_id):
    user = current_user.to_dict()

    user_id = user['id']

    current_cart = Cart.query.get(cart_id)
    # checking if cart exist
    if not current_cart:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })

    # checking if user already has reviewed
    _reviews = Review.query.filter_by(cart_id=current_cart.to_dict()['id'])
    for review in _reviews:
        if review and review.to_dict()['user_id'] == user_id:
            return {"message": "User already has a review for this cart", "status_code": 403}, 403

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
            cart_id=cart_id,
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
# @cart_routes.route('/')
# def get_all_cart_filtered():
#     origin = request.args.get('origin')
#     carts = Cart.query.all()
#     cart_list = [cart.to_dict() for cart in carts]
#     for cart in cart_list:
#         brand = Brand.query.get(cart['brand_id']).to_dict()
#         cart['Brand'] = brand
#     return {'Carts': cart_list}
