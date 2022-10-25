from app.models import db, Brand


# Adds a demo Brand, you can add other Brands here if you want
def seed_brands():

    brand1 = Brand(name="Barefoot Coffee Roasters",
                   brand_story="Considered one of the pioneers of direct trade coffee sourcing over a decade ago, Barefoot believes in sustainable farm fresh beans, small batch roasting to order and wildly intense flavors. Serious coffee and happy people, cant beat that.",
                   city="Santa Clara",
                   state="CA",
                   brand_img="https://storage.googleapis.com/mistobox/roaster_logos/BFC-logo-small.png"
                   )
    brand2 = Brand(name="Bird Rock Coffee Roasters",
                   brand_story="Roast Magazine’s 2012 Micro Roaster of the Year, Bird Rock is truly farm-to-cup. Since 2006, this San Diego roaster not only sources from top-tier growers, but takes pride in fostering true collaboration, building long-term relationships, and showcasing its partners.",
                   city="San Diego",
                   state="CA",
                   brand_img="https://storage.googleapis.com/mistobox/roaster_logos/BIRD-logo-small.png"
                   )
    brand3 = Brand(name="Cat & Cloud",
                   brand_story="Cat & Cloud is a values-based business with the mission of leaving people feeling happier than they were before. They believe in a standard of business that puts people and values above all else, and because of that, they do a few things differently.",
                   city="Santa Cruz",
                   state="CA",
                   brand_img="https://830ca76cf8c4a2f78647-f915a34c6ea40d34f065fa108e75f9dc.ssl.cf5.rackcdn.com/CAT-full-color.png"
                   )
    brand4 = Brand(name="Equator",
                   brand_story="In 1995, when partners Brooke McDonnell, Maureen McHugh, and Helen Russell began roasting coffee from a garage, they set out to build a high-impact company focused on quality, sustainability, and social responsibility.",
                   city="San Rafael",
                   state="CA",
                   brand_img="https://storage.googleapis.com/mistobox/roaster_logos/EQT-logo-small.png"
                   )
    brand5 = Brand(name="Verve",
                   brand_story="Named for an enthusiasm for making art, or in this case coffee, Verve was founded in 2007. Don’t be fooled by the laidback vibes of Colby Barr and Ryan O'Donovan’s West Coast base, this crew is serious about coffee.",
                   city="Santa Cruz",
                   state="CA",
                   brand_img="https://www.mistobox.com/skin/frontend/default/sns_korion/images/mbox/roaster_logos/Verve.jpg"
                   )
  

    db.session.add(brand1)
    db.session.add(brand2)
    db.session.add(brand3)
    db.session.add(brand4)
    db.session.add(brand5)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Brands table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_brands():
    db.session.execute('TRUNCATE brands RESTART IDENTITY CASCADE;')
    db.session.commit()
