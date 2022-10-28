from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Coffee, Review, Brand, User, db
from app.forms.delete_form import DeleteForm
from app.forms.add_review_form import AddReviewForm

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

# GET one reviews <<<<<<<<<<<<<<<<< TEST IN POSTMAN!!!!
@review_routes.route('/<int:review_id>')
@login_required
def get_one_reviews(review_id):
    user = current_user.to_dict()
    user_id = user['id']

    review = Review.query.get(review_id)
    if not review:
        return jsonify({
            "message": "Review couldn't be found",
            "status_code": 404
        })
    else:
        if (review):
            _coffee = Coffee.query.get(review['coffee_id'])
            coffee = ''
            if _coffee:
                coffee = _coffee.to_dict()
                brand = Brand.query.get(coffee['brand_id']).to_dict()
                coffee['Brand'] = brand
            review["Coffee"] = coffee

    return {"Reviews": review}

# EDIT current user's review
@review_routes.route('/<int:review_id>', methods=["PUT"])
@login_required
def edit_current_user_reviews(review_id):
    user = current_user.to_dict()
    user_id = user['id']
    user_review = Review.query.get(review_id)
    if not user_review:
        return jsonify({
            "message": "Coffee couldn't be found",
            "status_code": 404
        })
    
    if user_review.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if user_review.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():
            if not form.data['rating']:
                post_val_error['errors']['rating'] = "Rating is required."
            if not form.data['review_body']:
                post_val_error['errors']['review_body'] = "Review is required."

            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400


            user_review.rating = form.data['rating']
            user_review.review_body = form.data['review_body']
           
            db.session.commit()

            review_res = user_review.to_dict()
            user = User.query.get(user_id).to_dict()
            review_res['User'] = user

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

    current_review = Review.query.get(review_id)
    # checking if review exists
    if not current_review:
        return jsonify({
            "message": "Review couldn't be found",
            "status_code": 404
        })
    # checking if user curated this review
    if current_review.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_review.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_review)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
