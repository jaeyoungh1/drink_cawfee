from app.models import db, Review
from random import choice


# Adds a demo review, you can add other reviews here if you want
def seed_reviews():

    reviews = [
        {
            "rating": 4,
            "review_body": "So freakin' good. This is an amazing dark roast, it's just the right amount of smokey, not too acidic, robust, flavorful. Awesome."
        },
        {
            "rating": 2,
            "review_body": "It fell a little flat, I was a bit disappointed. It was not smooth and way too bitter, I tried coarse and fine grinding."
        },
        {
            "rating": 3,
            "review_body": "This coffee was just OK. It worked best using a drip machine, but was too acidic when I used the Chemex for brewing. "
        },
        {
            "rating": 4,
            "review_body": "Good coffee, not as dark, “full bodied” as described, or robust as I like."
        },
        {
            "rating": 5,
            "review_body": "Really tasty, balanced, and smooth!"
        },
        {
            "rating": 5,
            "review_body": "Very good. Strong and rich"
        },
        {
            "rating": 4,
            "review_body": "Not bad, not as good as it used to be but good. Better than the French Roast"
        },
        {
            "rating": 2,
            "review_body": "Too light"
        },
        {
            "rating": 1,
            "review_body": "This was not roasted, at all. No flavor whatsoever, completely bland."
        },
        {
            "rating": 5,
            "review_body": "We really enjoyed this coffee - it is true to the description of tasting notes."
        },
        {
            "rating": 3,
            "review_body": "It's a good coffee, but nothing about it blows my mind."
        },
        {
            "rating": 4,
            "review_body": "Quite nice. Did better in the pour over than in the French press. Made for some delicious iced coffee, which really brought out the sweeter notes in it."
        },
        {
            "rating": 5,
            "review_body": "Smooth, not a trace of bitterness. Update: Made an excellent cold brew"
        },
        {
            "rating": 3,
            "review_body": "Only okay. The best part about this coffee was that it tasted largely the same no matter if I took a lot of care in brewing it, or if I just threw it together because I was hungover and running late to work."
        },
        {
            "rating": 5,
            "review_body": "Rich and flavorful. Great cup of coffee"
        },
        {
            "rating": 5,
            "review_body": "Favorite coffee for hot drip"
        },
        {
            "rating": 5,
            "review_body": "Nice, rich coffee with good balance. I like the flavors."
        },
        {
            "rating": 4,
            "review_body": "Really good! Aeropress is the way to go for this coffee."
        },
        {
            "rating": 4,
            "review_body": "This one was good but definitely not my favorite so far."
        },
        {
            "rating": 4,
            "review_body": "A great morning cup of coffee. Not as flavorful as I like but definitely good for a hectic morning, that enticing smell inviting you to slow it down a bit."
        },
        {
            "rating": 4,
            "review_body": "this will appeal to a wide audience simply because it is a very neutral coffee. there is nothing particularly great or poor about this coffee"
        },
        {
            "rating": 4,
            "review_body": "Best packaging I'd seen so far - high quality bag, good design, nice details."
        },
        {
            "rating": 5,
            "review_body": "This is a nice coffee that goes well with desserts and sweets."
        },
        {
            "rating": 4,
            "review_body": "It's very well balanced and smooth"
        },
        {
            "rating": 4,
            "review_body": "Overall, was really good and not bitter, just a little darker than ideal."
        },
        {
            "rating": 3,
            "review_body": "Just OK for me"
        },
        {
            "rating": 2,
            "review_body": "This selection was just okay."
        }
    ]

    for review in reviews:
        user_id = choice([2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12,
                          13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                          24, 25, 26, 27])
        coffee_id = choice([1])
        reviewRow = Review(user_id=user_id,
                           coffee_id=coffee_id,
                           rating=review['rating'],
                           review_body=review['review_body']
                           )
        db.session.add(reviewRow)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
