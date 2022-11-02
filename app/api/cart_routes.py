from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Cart, Coffee, User, db
from app.forms.add_to_cart_form import AddToCartForm
# from app.forms.add_cart_form import AddCartForm
# from app.forms.add_review_form import AddReviewForm
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


# GET user's cart
@cart_routes.route('/')
@login_required
def get_user_cart():
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    else: 
        # print("     >>>>>> USER", user['id'])
        carts = Cart.query.filter_by(user_id=user['id'])
        cart_list = [cart.to_dict() for cart in carts]
        for cart in cart_list:
            coffee = Coffee.query.get(cart['coffee_id']).to_dict()
            cart['Coffee'] = coffee
        return {'Cart': cart_list}


# POST one cart
@cart_routes.route('/<int:coffee_id>', methods=["POST"])
@login_required
def add_one_to_cart(coffee_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    form = AddToCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }
    # need to CHECK if coffee already exists in users cart?<<<<<<<

    if not form.data['quantity']:
        post_val_error['errors']['quantity'] = "Quantity is required."
    
    if len(post_val_error["errors"]) > 0:
        return jsonify(post_val_error), 400

    print("POSTVALERROR", post_val_error)
    if form.validate_on_submit():

        cart = Cart(
            user_id=user_id,
            coffee_id=coffee_id,
            quantity=form.data['quantity']
        )

        db.session.add(cart)
        db.session.commit()

        cart_res = cart.to_dict()

        coffee = Coffee.query.get(cart_res['coffee_id']).to_dict()
        
        cart_res['Coffee'] = coffee

        return cart_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# UPDATE CART ITEM QUANTITY
@cart_routes.route('/<int:cart_id>', methods=["PUT"])
@login_required
def edit_one_cart(cart_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    current_cart_coffee = Cart.query.get(cart_id)
    # checking if cart exist
    if not current_cart_coffee:
        return jsonify({
            "message": "Cart couldn't be found",
            "status_code": 404
        })
    # checking if user added this cart item
    if current_cart_coffee.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddToCartForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if current_cart_coffee.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():

            if not form.data['quantity']:
                post_val_error['errors']['quantity'] = "Quantity is required."
            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            current_cart_coffee.quantity = form.data['quantity']

            db.session.commit()

            cart_res = current_cart_coffee.to_dict()
            coffee = Coffee.query.get(cart_res['coffee_id']).to_dict()

            cart_res['Coffee'] = coffee
            
            return cart_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE one cart item
@cart_routes.route('/<int:cart_id>', methods=["DELETE"])
@login_required
def delete_one_cart(cart_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_cart_coffee = Cart.query.get(cart_id)
    # checking if cart exists
    if not current_cart_coffee:
        return jsonify({
            "message": "Cart coffee couldn't be found",
            "status_code": 404
        })
    # checking if user added to this cart
    if current_cart_coffee.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_cart_coffee.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_cart_coffee)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
