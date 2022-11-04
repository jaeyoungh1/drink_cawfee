from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Cart, User, db
from app.forms.update_address_form import UpdateAddressForm


user_routes = Blueprint('users', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/update', methods=["PUT"])
@login_required
def users_update():
    # pass
    _user = current_user.to_dict()
    if not _user:
        return {"message": "Forbidden", "status_code": 403}, 403

    user = User.query.get(_user['id'])
    if not user:
        return jsonify({
            "message": "User couldn't be found",
            "status_code": 404
        })
    form = UpdateAddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print("   >>>> FORM ERRORS", validation_errors_to_error_messages(form.errors))
    print("   >>>> FORM DATA", form.data)

    if form.validate_on_submit():
        current_user.shipping_address = form.data['address']
        current_user.zipcode = form.data['zipcode']
        current_user.city = form.data['city']
        current_user.state = form.data['state']

        db.session.commit()

        return current_user.to_dict()
    
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
