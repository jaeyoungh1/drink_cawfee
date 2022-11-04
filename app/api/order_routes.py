from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import Order, Coffee, Cart, User, db
from app.forms.add_to_order_form import AddToOrderForm
# from app.forms.add_order_form import AddOrderForm
# from app.forms.add_review_form import AddReviewForm
from app.forms.delete_form import DeleteForm
from random import choice

order_routes = Blueprint('orders', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages

# GET user's orders
@order_routes.route('/')
@login_required
def get_user_order():
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    else:
        orders = Order.query.filter_by(user_id=user['id'])
        order_list = [order.to_dict() for order in orders]
        for order in order_list:
            coffee = Coffee.query.get(order['coffee_id']).to_dict()
            order['Coffee'] = coffee
        return {'Order': order_list}


# POST one order (move coffee from cart to users's orders)
@order_routes.route('/<int:cart_id>', methods=["POST"])
@login_required
def add_one_to_order(cart_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    cart = {}
    _cart = Cart.query.get(cart_id)
    if not _cart:
        return ({
            "message": "Cart Item couldn't be found",
            "status_code": 404
        })
    else:
        cart = _cart.to_dict()

    # form = AddToOrderForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }
    if not cart['quantity']:
        post_val_error['errors']['quantity'] = "Quantity is required."
    # if not form.data['order_number']:
    #     post_val_error['errors']['order_number'] = "Order Number is required."

    if len(post_val_error["errors"]) > 0:
        return jsonify(post_val_error), 400

    # if form.validate_on_submit():
        
    s = slice(10)
    coffee_id = cart['coffee_id']
    quantity = cart['quantity']

    order = Order(
        user_id=user_id,
        coffee_id=coffee_id,
        quantity=quantity
                )

    # print("    >>>> CART", order)

    db.session.add(order)
    db.session.commit()

    order_res = order.to_dict()

    coffee = Coffee.query.get(order_res['coffee_id']).to_dict()

    order_res['Coffee'] = coffee

    return order_res
        # return "Being pinged"
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# UPDATE CART ITEM QUANTITY
@order_routes.route('/<int:order_id>', methods=["PUT"])
@login_required
def edit_one_order(order_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    current_order_coffee = Order.query.get(order_id)
    # checking if order exist
    if not current_order_coffee:
        return jsonify({
            "message": "Order couldn't be found",
            "status_code": 404
        })
    # checking if user added this order item
    if current_order_coffee.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddToOrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    post_val_error = {
        "message": "Validation error",
        "status_code": 400,
        "errors": {}
    }

    if current_order_coffee.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():

            if not form.data['quantity']:
                post_val_error['errors']['quantity'] = "Quantity is required."
            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            current_order_coffee.quantity = form.data['quantity']

            db.session.commit()

            order_res = current_order_coffee.to_dict()
            coffee = Coffee.query.get(order_res['coffee_id']).to_dict()

            order_res['Coffee'] = coffee

            return order_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# DELETE one order item
@order_routes.route('/<int:order_id>', methods=["DELETE"])
@login_required
def delete_one_order(order_id):
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_order_coffee = Order.query.get(order_id)
    # checking if order exists
    if not current_order_coffee:
        return jsonify({
            "message": "Order coffee couldn't be found",
            "status_code": 404
        })
    # checking if user added to this order
    if current_order_coffee.to_dict()['user_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_order_coffee.to_dict()['user_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_order_coffee)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
