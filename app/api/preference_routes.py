from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Preference, db
from app.forms.update_address_form import UpdateAddressForm
from app.forms.update_user import UpdateUserForm


preference_routes = Blueprint('preferences', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return errorMessages


# GET user's preferences
@preference_routes.route('/current')
@login_required
def get_current_user_preferences():
    user = current_user.to_dict()
    user_id = user['id']
    preferences = [preference.to_dict()
               for preference in Preference.query.filter_by(curator_id=user_id)]
    for preference in preferences:
        brand = Brand.query.get(preference['brand_id']).to_dict()
        preference['Brand'] = brand
    return {"Preferences": preferences}


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

# POST one preference


@preference_routes.route('/', methods=["POST"])
@login_required
def add_one_preference():
    # print(">>>>> IM BEING PINGED")
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to curate", "status_code": 403}, 403
    user_id = user['id']

    # image = request.files["image"]

    # print(">>>>> request", request.files)

    form = AddPreferenceForm()
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
        post_val_error['errors']['name'] = "Preference name is required."
    if not form.data['origin']:
        post_val_error['errors']['origin'] = "Preference origin is required."
    if not form.data['roast']:
        post_val_error['errors']['roast'] = "Preference roast level is required."
    if not form.data['brand']:
        post_val_error['errors']['brand'] = "Preference brand is required."
    check_brand = Brand.query.filter_by(name=form.data['brand'])
    if not check_brand:
        post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
    if not form.data['price']:
        post_val_error['errors']['price'] = "Preference price is required."
    if not form.data['description']:
        post_val_error['errors']['description'] = "Preference description is required."
    # if not form.data['img_url']:
    #     post_val_error['errors']['img_url'] = "Preference preview image is required."
    if not form.data['notes']:
        post_val_error['errors']['notes'] = "Preference tasting notes are required."
    if not form.data['days']:
        post_val_error['errors']['days'] = "Preference roasting schedule is required."

    if len(post_val_error["errors"]) > 0:
        return jsonify(post_val_error), 400

    # print("ERRORS", validation_errors_to_error_messages(form.errors))
    # print("POSTVALERROR", post_val_error)
    if form.validate_on_submit():
        # print("  >>>>>> IM GETTING HIT")
        brand = check_brand.first().to_dict()

        preference = Preference(
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

        # print(">>>>>>BACKEND COFFEE", preference)
        db.session.add(preference)
        db.session.commit()

        preference_res = preference.to_dict()
        preference_res['Brand'] = brand
        return preference_res
    # print(">>>>>", validation_errors_to_error_messages(form.errors))
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# EDIT preference INVENTORY


@preference_routes.route('/inventory/<string:opt>/<int:id>', methods=["PUT"])
@login_required
def edit_one_preference_inventory(id, opt):
    # print("   >>>>>> ID OPT", id, opt)
    # print("   >>>>>> OPT", opt == 'plus')
    user = current_user.to_dict()
    if not user:
        return {"message": "Forbidden", "status_code": 403}, 403
    user_id = user['id']

    if opt == 'minus':
        # print("   >>>>>> MINUS BEING HIT")
        current_cart_preference = Cart.query.get(id)
    # checking if cart exist
        if not current_cart_preference:
            return jsonify({
                "message": "Cart couldn't be found",
                "status_code": 404
            })
        # checking if user added this cart item
        if current_cart_preference.to_dict()['user_id'] != user_id:
            return {"message": "Forbidden", "status_code": 403}, 403

        if current_cart_preference.to_dict()['user_id'] == user_id:
            preference = Preference.query.get(
                current_cart_preference.to_dict()['preference_id'])

            current_inventory = preference.to_dict()['inventory']
            new_inventory = +current_inventory - + \
                current_cart_preference.to_dict()['quantity']

            preference.inventory = new_inventory

            db.session.commit()

            preference_res = preference.to_dict()
            brand = Brand.query.get(preference_res['brand_id']).to_dict()
            preference_res['Brand'] = brand

        return preference_res
    elif opt == 'plus':
        # print("   >>>>>> PLUS BEING HIT", id)
        current_order_preference = Order.query.get(id)
        # print("   >>>>>> CURRENT ORDER COFFEE", current_order_preference)
    # checking if order exist
        if not current_order_preference:
            return jsonify({
                "message": "Order couldn't be found",
                "status_code": 404
            })
        # checking if user added this order item
        if current_order_preference.to_dict()['user_id'] != user_id:
            return {"message": "Forbidden", "status_code": 403}, 403

        # print("   >>>>>> CURRENT ORDER COFFEE", current_order_preference.to_dict())
        if current_order_preference.to_dict()['user_id'] == user_id:
            preference = Preference.query.get(
                current_order_preference.to_dict()['preference_id'])

            current_inventory = preference.to_dict()['inventory']
            # print(" >>>>>> CURRENT INVENTORY", current_inventory)
            new_inventory = +current_inventory + + \
                current_order_preference.to_dict()['quantity']
            # print(" >>>>>> NEW INVENTORY", new_inventory)

            preference.inventory = new_inventory

            db.session.commit()

            preference_res = preference.to_dict()
            brand = Brand.query.get(preference_res['brand_id']).to_dict()
            preference_res['Brand'] = brand
            # print(" >>>>>> COFFEE RES", preference_res)

            return preference_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT one preference


@preference_routes.route('/<int:preference_id>', methods=["PUT"])
@login_required
def edit_one_preference(preference_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to edit curations", "status_code": 403}, 403
    user_id = user['id']
    current_preference = Preference.query.get(preference_id)
    # checking if preference exist
    if not current_preference:
        return jsonify({
            "message": "Preference couldn't be found",
            "status_code": 404
        })
    # checking if user curated this preference
    if current_preference.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    form = AddPreferenceForm()
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

    if current_preference.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            note_list = [Note(note=note)
                         for note in form.data['notes'].split(',')]
            # print(" >>>>>> note_list", note_list)
            day_list = [Day(day=day) for day in form.data['days'].split(',')]
            if not form.data['name']:
                post_val_error['errors']['name'] = "Preference name is required."
            if not form.data['origin']:
                post_val_error['errors']['origin'] = "Preference origin is required."
            if not form.data['roast']:
                post_val_error['errors']['roast'] = "Preference roast level is required."
            if not form.data['brand']:
                post_val_error['errors']['brand'] = "Preference brand is required."
            check_brand = Brand.query.filter_by(name=form.data['brand'])
            if not check_brand:
                post_val_error['errors']['brand'] = "Current Brand is not available to purchase through Cawfee"
            if not form.data['price']:
                post_val_error['errors']['price'] = "Preference price/lb is required."
            if not form.data['description']:
                post_val_error['errors']['description'] = "Preference description is required."
            # if not form.data['img_url']:
            #     post_val_error['errors']['img_url'] = "Preference preview image is required."
            if not form.data['notes']:
                post_val_error['errors']['notes'] = "Preference tasting notes are required."
            if not form.data['days']:
                post_val_error['errors']['days'] = "Preference roasting schedule is required."

            if len(post_val_error["errors"]) > 0:
                return jsonify(post_val_error), 400

            brand = check_brand.first().to_dict()

            current_preference.curator_id = user_id
            current_preference.name = form.data['name']
            current_preference.origin = form.data['origin']
            current_preference.roast = form.data['roast'].lower()
            current_preference.inventory = form.data['inventory']
            current_preference.brand_id = brand['id']
            current_preference.price = form.data['price']
            current_preference.description = form.data['description']
            # current_preference.img_url = form.data['img_url']
            current_preference.img_url = url
            current_preference.notes = note_list
            current_preference.days = day_list

            db.session.commit()

            preference_res = current_preference.to_dict()
            preference_res['Brand'] = brand
            return preference_res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# DELETE one preference


@preference_routes.route('/<int:preference_id>', methods=["DELETE"])
@login_required
def delete_one_preference(preference_id):
    user = current_user.to_dict()
    if user['curator'] != True:
        return {"message": "User does not have permission to delete curations", "status_code": 403}, 403
    user_id = user['id']

    form = DeleteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_preference = Preference.query.get(preference_id)
    # checking if preference exists
    if not current_preference:
        return jsonify({
            "message": "Preference couldn't be found",
            "status_code": 404
        })
    # checking if user curated this preference
    if current_preference.to_dict()['curator_id'] != user_id:
        return {"message": "Forbidden", "status_code": 403}, 403

    elif current_preference.to_dict()['curator_id'] == user_id:
        if form.validate_on_submit():

            db.session.delete(current_preference)
            db.session.commit()

            return {"message": "Successfully deleted", "status_code": 200}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# <--------------------------- REVIEWS -------------------------->

# GET all reviews for one preference
@preference_routes.route('/<int:preference_id>/reviews')
def get_one_preference_reviews(preference_id):

    current_preference = Preference.query.get(preference_id)
    # checking if preference exist
    if not current_preference:
        return jsonify({
            "message": "Preference couldn't be found",
            "status_code": 404
        })

    _reviews = Review.query.filter_by(preference_id=current_preference.to_dict()['id'])
    if not _reviews:
        return "No reviews exist for this preference"
    reviews = [review.to_dict() for review in _reviews]
    for review in reviews:
        user = User.query.get(review['user_id']).to_dict()
        review['User'] = user

    return {"Reviews": reviews}

# POST review for one preference


@preference_routes.route('/<int:preference_id>/reviews', methods=["POST"])
@login_required
def create_one_preference_review(preference_id):
    user = current_user.to_dict()

    user_id = user['id']

    current_preference = Preference.query.get(preference_id)
    # checking if preference exist
    if not current_preference:
        return jsonify({
            "message": "Preference couldn't be found",
            "status_code": 404
        })

    # checking if user already has reviewed
    _reviews = Review.query.filter_by(preference_id=current_preference.to_dict()['id'])
    for review in _reviews:
        if review and review.to_dict()['user_id'] == user_id:
            return {"message": "User already has a review for this preference", "status_code": 403}, 403

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
            preference_id=preference_id,
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
# @preference_routes.route('/')
# def get_all_preference_filtered():
#     origin = request.args.get('origin')
#     preferences = Preference.query.all()
#     preference_list = [preference.to_dict() for preference in preferences]
#     for preference in preference_list:
#         brand = Brand.query.get(preference['brand_id']).to_dict()
#         preference['Brand'] = brand
#     return {'Preferences': preference_list}
