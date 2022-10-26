from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Coffee, Brand, User, db
from app.forms.delete_form import DeleteForm

brand_routes = Blueprint('brands', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

# GET all brands
@brand_routes.route('/')
def get_all_brands():

    brands = [brand.to_dict() for brand in Brand.query.all()]
    # return "RETURNED"
    return {"Brands": brands}


# # EDIT a brand
# @brand_routes.route('/<int:brand_id>', methods=["PUT"])
# @login_required
# def edit_current_user_brands(brand_id):
#     user = current_user.to_dict()
#     user_id = user['id']
#     user_brand = brand.query.get(brand_id)
#     if not user_brand:
#         return jsonify({
#             "message": "Coffee couldn't be found",
#             "status_code": 404
#         })

#     if user_brand.to_dict()['user_id'] != user_id:
#         return {"message": "Forbidden", "status_code": 403}, 403

#     form = AddbrandForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     post_val_error = {
#         "message": "Validation error",
#         "status_code": 400,
#         "errors": {}
#     }

#     if user_brand.to_dict()['user_id'] == user_id:
#         if form.validate_on_submit():
#             if not form.data['rating']:
#                 post_val_error['errors']['rating'] = "Rating is required."
#             if not form.data['brand_body']:
#                 post_val_error['errors']['brand_body'] = "brand is required."

#             if len(post_val_error["errors"]) > 0:
#                 return jsonify(post_val_error), 400

#             user_brand.rating = form.data['rating']
#             user_brand.brand_body = form.data['brand_body']

#             db.session.commit()

#             brand_res = user_brand.to_dict()
#             user = User.query.get(user_id).to_dict()
#             brand_res['User'] = user

#             return brand_res
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# # DELETE one brand


# @brand_routes.route('/<int:brand_id>', methods=["DELETE"])
# @login_required
# def delete_one_brand(brand_id):
#     user = current_user.to_dict()
#     user_id = user['id']

#     form = DeleteForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     current_brand = brand.query.get(brand_id)
#     # checking if brand exists
#     if not current_brand:
#         return jsonify({
#             "message": "brand couldn't be found",
#             "status_code": 404
#         })
#     # checking if user curated this brand
#     if current_brand.to_dict()['user_id'] != user_id:
#         return {"message": "Forbidden", "status_code": 403}, 403

#     elif current_brand.to_dict()['user_id'] == user_id:
#         if form.validate_on_submit():

#             db.session.delete(current_brand)
#             db.session.commit()

#             return {"message": "Successfully deleted", "status_code": 200}
#     return {'errors': validation_errors_to_error_messages(form.errors)}, 401
