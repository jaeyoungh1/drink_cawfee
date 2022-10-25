from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Coffee, Review, Brand, db
from app.forms.delete_form import DeleteForm

review_routes = Blueprint('reviews', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

# GET current user's reviews
@review_routes.route('/current')
@login_required
def get_user_reviews():
    user = current_user.to_dict()
    user_id = user['id']

    reviews = [review.to_dict() for review in Review.query.filter_by(user_id=user_id)]
    for review in reviews:
        if (review):
            _coffee = Coffee.query.get(review['coffee_id'])
            coffee = ''
            if _coffee:
                coffee = _coffee.to_dict()
                brand = Brand.query.get(coffee['brand_id']).to_dict()
                coffee['Brand'] = brand 
            review["Coffee"] = coffee
        
    return {"Reviews": reviews}


# GET current user's curated reviews


@review_routes.route('/current')
@login_required
def get_current_user_reviews():
    user = current_user.to_dict()
    user_id = user['id']
    reviews = [review.to_dict()
               for review in review.query.filter_by(curator_id=user_id)]
    for review in reviews:
        brand = Brand.query.get(review['brand_id']).to_dict()
        review['Brand'] = brand
    return {"reviews": reviews}


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

# POST one review


@review_routes.route('/', methods=["POST"])
@login_required
def add_one_review():
    user = current_user.to_dict()
    user_id = user['id']

    form = AddreviewForm()
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
            post_val_error['errors']['name'] = "review name is required."
        if not form.data['origin']:
            post_val_error['errors']['origin'] = "review origin is required."
        if not form.data['roast']:
            post_val_error['errors']['roast'] = "review roast level is required."
        if not form.data['brand']:
            post_val_error['errors']['brand'] = "review brand is required."
        check_brand = Brand.query.filter_by(name=form.data['brand'])
        if not check_brand:
            post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
        if not form.data['price']:
            post_val_error['errors']['price'] = "review price/lb is required."
        if not form.data['description']:
            post_val_error['errors']['description'] = "review description is required."
        if not form.data['img_url']:
            post_val_error['errors']['img_url'] = "review preview image is required."
        if not form.data['notes']:
            post_val_error['errors']['notes'] = "review tasting notes are required."
        if not form.data['days']:
            post_val_error['errors']['days'] = "review roasting schedule is required."

        if len(post_val_error["errors"]) > 0:
            return jsonify(post_val_error), 400

        brand = check_brand.first().to_dict()

        review = review(
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

        db.session.add(review)
        db.session.commit()

        review_res = review.to_dict()
        review_res['Brand'] = brand
        return review_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT one review


@review_routes.route('/<int:review_id>', methods=["PUT"])
@login_required
def edit_one_review(review_id):
    user = current_user.to_dict()
    user_id = user['id']
    current_review = review.query.get(review_id)
    # checking if review exist
    if not current_review:
        return jsonify({
            "message": "Business couldn't be found",
            "status_code": 404
        })
    # checking if user curated this review
    if current_review.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddreviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if current_review.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            note_list = [Note(note=note) for note in form.data['notes']]
            day_list = [Day(day=day) for day in form.data['days']]
            if not form.data['name']:
                post_val_error['errors']['name'] = "review name is required."
            if not form.data['origin']:
                post_val_error['errors']['origin'] = "review origin is required."
            if not form.data['roast']:
                post_val_error['errors']['roast'] = "review roast level is required."
            if not form.data['brand']:
                post_val_error['errors']['brand'] = "review brand is required."
            check_brand = Brand.query.filter_by(name=form.data['brand'])
            if not check_brand:
                post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
            if not form.data['price']:
                post_val_error['errors']['price'] = "review price/lb is required."
            if not form.data['description']:
                post_val_error['errors']['description'] = "review description is required."
            if not form.data['img_url']:
                post_val_error['errors']['img_url'] = "review preview image is required."
            if not form.data['notes']:
                post_val_error['errors']['notes'] = "review tasting notes are required."
            if not form.data['days']:
                post_val_error['errors']['days'] = "review roasting schedule is required."

            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            brand = check_brand.first().to_dict()

            current_review.curator_id = user_id
            current_review.name = form.data['name']
            current_review.origin = form.data['origin']
            current_review.roast = form.data['roast']
            current_review.process = form.data['wash']
            current_review.inventory = form.data['inventory']
            current_review.brand_id = brand['id']
            current_review.price = form.data['price']
            current_review.description = form.data['description']
            current_review.img_url = form.data['img_url']
            current_review.notes = note_list
            current_review.days = day_list

            db.session.commit()

            review_res = current_review.to_dict()
            review_res['Brand'] = brand
            return review_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE one review


@review_routes.route('/<int:review_id>', methods=["DELETE"])
@login_required
def delete_one_review(review_id):
    user = current_user.to_dict()
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_review = review.query.get(review_id)
    # checking if review exists
    if not current_review:
        return jsonify({
            "message": "Business couldn't be found",
            "status_code": 404
        })
    # checking if user curated this review
    if current_review.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_review.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_review)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
