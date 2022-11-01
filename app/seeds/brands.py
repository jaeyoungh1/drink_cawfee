from app.models import db, Brand


# Adds a demo Brand, you can add other Brands here if you want
def seed_brands():

    brand1 = Brand(name="Mother Tongue",
                   brand_story="After roasting for coffee’s biggest names and winning the US Cup Tasters Championship, Jen Apodaca set out to launch Mother Tongue Coffee in 2019. With an equal emphasis on how coffee tastes and how it makes you feel, the Oakland, California-based roaster builds relationships based on mutual values of creating sustainable communities near and far, paying better-than-fair prices to producers and connecting with the Bay Area through its work with public radio and local food banks.",
                   city="Oakland",
                   state="CA",
                   brand_img="https://images.ctfassets.net/o88ugk6hewlf/RZ2lUQYS8kbxXrKQVrjtz/24d4eca886315001cb97ecbe3f7deb3c/MotherTongue_Update_WhiteVersion_2x.png?q=75&fm=webp&w=1000"
                   )
    brand2 = Brand(name="Bird Rock Coffee Roasters",
                   brand_story="Roast Magazine’s 2012 Micro Roaster of the Year, Bird Rock is truly farm-to-cup. Since 2006, this San Diego roaster not only sources from top-tier growers, but takes pride in fostering true collaboration, building long-term relationships, and showcasing its partners.",
                   city="San Diego",
                   state="CA",
                   brand_img="https://images.ctfassets.net/o88ugk6hewlf/tdHjA0afDwuGcauGU2w0S/6808aa45b9d793ffad79b126b2d4e140/BRC__2x.png?q=75&fm=webp&w=1000"
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
