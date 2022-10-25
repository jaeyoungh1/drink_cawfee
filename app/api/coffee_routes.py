from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Coffee, Note, Day, Brand, Review, User, db
from app.forms.add_coffee_form import AddCoffeeForm
from app.forms.delete_form import DeleteForm

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

# GET all coffees
@coffee_routes.route('/')
def get_all_coffee():
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
    user = current_user.to_dict()
    user_id = user['id']

    form = AddCoffeeForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if form.validate_on_submit():

        note_list = [Note(note=note) for note in form.data['notes']]
        day_list = [Day(day=day) for day in form.data['days']]
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
        if not form.data['img_url']:
            post_val_error['errors']['img_url'] = "Coffee preview image is required."
        if not form.data['notes']:
            post_val_error['errors']['notes'] = "Coffee tasting notes are required."
        if not form.data['days']:
            post_val_error['errors']['days'] = "Coffee roasting schedule is required."

        if len(post_val_error["errors"]) > 0:
            return jsonify(post_val_error), 400

        brand = check_brand.first().to_dict()

        coffee = Coffee(
            curator_id=user_id,
            name=form.data['name'],
            origin=form.data['origin'],
            roast=form.data['roast'],
            process=form.data['wash'],
            inventory=form.data['inventory'],
            brand_id=brand['id'],
            price=form.data['price'],
            description=form.data['description'],
            img_url=form.data['img_url'],
            notes=note_list,
            days=day_list
        )

        db.session.add(coffee)
        db.session.commit()

        coffee_res = coffee.to_dict()
        coffee_res['Brand'] = brand
        return coffee_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT one coffee
@coffee_routes.route('/<int:coffee_id>', methods=["PUT"])
@login_required
def edit_one_coffee(coffee_id):
    user = current_user.to_dict()
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

    if current_coffee.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            note_list = [Note(note=note) for note in form.data['notes']]
            day_list = [Day(day=day) for day in form.data['days']]
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
            if not form.data['img_url']:
                post_val_error['errors']['img_url'] = "Coffee preview image is required."
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
            current_coffee.roast = form.data['roast']
            current_coffee.process = form.data['wash']
            current_coffee.inventory = form.data['inventory']
            current_coffee.brand_id = brand['id']
            current_coffee.price = form.data['price']
            current_coffee.description = form.data['description']
            current_coffee.img_url = form.data['img_url']
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
