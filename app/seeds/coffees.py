from app.models import db, Coffee, Day, Note
import random

# Adds a demo Coffee, you can add other Coffees here if you want
def seed_coffee_day_note():
    days_dict = {}
    days = ['Monday', 'Tuesday', 'Wednesday',
            'Thursday', 'Friday', 'Saturday', 'Sunday']
    for day in days:
        dayRow = Day(day=day)
        days_dict[day] = dayRow
        db.session.add(dayRow)

    notes_dict = {}
    notes = [
        "Berry Fruit",
        "Stone Fruit",
        "Citrus",
        "Florals",
        "Vanilla",
        "Earthy",
        "Brown Sugar",
        "Milk Chocolate",
        "Nutty",
        "Spices",
        "Roastiness",
        "Tropical Fruit"
    ]
    for note in notes:
        noteRow = Note(note=note)
        notes_dict[note] = noteRow
        db.session.add(noteRow)

    # print("NOTES DICT>>>>", notes_dict)

    # brand1Coffee = [
    #     {
    #         "curator_id": 1,
    #         "brand_id": 1,
    #         "name": "Nebula",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 24,
    #         "description": "Super honey-sweet and full-bodied, this comforting cup's rich chocolaty notes and hint of roast will satisfy any sweet tooth.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660154134/solidus/pdw7hgglym6y0yxqzknk.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Vanilla"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 1,
    #         "brand_id": 1,
    #         "name": "Santa Marta - GUATEMALA",
    #         "origin": "Guatemala",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 25,
    #         "description": "Nutty almond sweetness and a buttery body combine with notes of cocoa and hints of cherry lingering in the background.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660252705/solidus/tb1cpa7qmhluctvqexmx.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 1,
    #         "brand_id": 1,
    #         "name": "Ubuto - KARUZI, BURUNDI",
    #         "origin": "Burundi",
    #         "roast": "medium",
    #         "inventory": 90,
    #         "price": 26,
    #         "description": 'This coffee is called "Ubuto" ("young" in Kirundi) after the younger coffee trees that produce a cup with fresh grapefruit and cherry acidity in addition to floral notes of black tea and hints of spice.',
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1664463923/solidus/gnel1kem8ontpywowwdz.png",
    #         "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Spices"]],
    #         "days": [days_dict['Tuesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 1,
    #         "brand_id": 1,
    #         "name": "Yummy Decaf",
    #         "origin": "Nicaragua",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 26,
    #         "description": "This decaf's pleasant brown sugar sweetness is the perfect accompaniment to juicy orange acidity and notes of fresh stone fruit.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663337374/solidus/gz8m05ncvndaaby9xbjm.png",
    #         "notes": [notes_dict['Citrus'], notes_dict["Spices"], notes_dict["Berry Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 1,
    #         "name": "Bunum Wo Estate Peaberry",
    #         "origin": "Peru",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 24,
    #         "description": "Deliciously sweet and unique, this Indonesian coffee features sweet tobacco aromatics with hints of toasted hazelnuts and a touch of juicy cherry notes.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249039/solidus/kz7votvc4o0xbnb3g0jw.png",
    #         "notes": [notes_dict['Berry Fruit'], notes_dict["Spices"], notes_dict["Nutty"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     }
    # ]
    # brand2Coffee = [
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Chirinos Peru",
    #         "origin": "Peru",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 17,
    #         "description": "This lot features aromas of vanilla and stone fruits, with flavors of apricot and plum found in your first sips. As the cup cools, dried fruits like prune and raisin come to the forefront, with cane sugar sweetness leading to Swiss chocolate. A round body and plum-like acidity carry into a butterscotch aftertaste.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1662048366/solidus/ppe84tu9pich4kh7p4go.png",
    #         "notes": [notes_dict['Berry Fruit'], notes_dict["Citrus"], notes_dict["Nutty"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "French Roast",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 21,
    #         "description": "While this is a more developed roast profile compared to our lighter roasted offerings, we end up with something that actually tastes like coffee not burnt wood and you wont notice a ton of oil on the beans' surface. And, we use damn good coffee beans.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837084/solidus/zaiywtudefiylogt6ozc.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Berry Fruit"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Boru Batak",
    #         "origin": "Sumatra",
    #         "roast": "medium",
    #         "inventory": 80,
    #         "price": 24,
    #         "description": "Clean and tart grape acidity mingles with bright notes of lemon and a slightly earthy tobacco sweetness. In Sumatra women are the backbone of the coffee business and make all of the quality and buying decisions. Boru means the link to the maternal line of the family and we thought that we should pay homage to them with naming this coffee Boru Batak.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837004/solidus/itmip3ncncm9afcq5fzb.png",
    #         "notes": [notes_dict['Stone Fruit'], notes_dict["Spices"], notes_dict["Citrus"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Cafe de Sol",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "Our cold brew blend brings together incredible sweetness and dynamic flavors that are sure to be a delight for any coffee drinker. While drinking, delicate fruit dances across the palate eventually lingering and leaving its honey-like sweetness on the tongue.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837031/solidus/eyqbetp8nf8xmrmvkuvw.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Brown Sugar"], notes_dict["Berry Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Monkey Bite Espresso",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 24,
    #         "description": "Named for the harrowing monkey attack that our founder Chuck suffered through in Kenya, this espresso is a top seller at the cafes and on-line. Our seasonal blend is carefully crafted and tested to be pulled as delicious straight espresso while it also works well in a traditional milk-based drink like a Cortado. This is the same fantastic blend we use in all our six retail cafes in San Diego, CA. Works as a brewed cup of coffee as well!",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837018/solidus/hj7nuaccl6329qmjijmx.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Vanilla"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Bird Rock Blend",
    #         "origin": "Various (Blend)",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "Easy-drinking and perfect for the traditionalist, this crowd-pleasing blend is an easy introduction to our coffee at BRCR. Many of our other lots and blends will tend more towards the \"3rd wave\" style that lets acidity and complexity shine, but this blend uses seasonal ingredients in a way that is more appealing to a wider range of coffee lovers.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837101/solidus/tsztoftjwtld7pvgvbhn.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     }
    # ]
    # brand3Coffee = [
    #     {
    #         "curator_id": 2,
    #         "brand_id": 3,
    #         "name": "Darkroom",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "This dark roast features a rich, velvety body with a pleasantly balanced roastiness and bittersweet honeycomb aftertaste.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660255519/solidus/vxjztjguoljmtsff5dcl.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Vanilla"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 3,
    #         "name": "Wata Dara - Ethiopia",
    #         "origin": "Ethiopia",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 24,
    #         "description": "This washed Ethiopian coffee features tons of sugary sweetness in addition to juicy stone fruit and fresh floral notes. There is a sweet, citric acidity that reminded us of limeade and an overall floral character that reminded us of rose. This is a delicate but delicious coffee.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1661464716/solidus/nmsjwwhwbecqy2gcn87m.png",
    #         "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Florals"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 3,
    #         "name": "Conscientious Objector",
    #         "origin": "Various (Blend)",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "Blended to offer full flavor and body to your cup. You can expect a classic sweet earthiness up front with a creamy milk chocolate bar finish. Hearty, smooth and Free to be Bold.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660246118/solidus/lkpjonsy23ndn0rpa5ej.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Citrus"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 3,
    #         "name": "Bauhaus",
    #         "origin": "Various (Blend)",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "A sticky body and the tell-tale tolls of a big ol' dark roast are front and center in this blend that's not just for goths and art students. This remains a favorite among fans of sweet, mellow full bodied cups that only a skillful roast can provide. Bauhaus is taken deep enough to bring you the bittersweet chocolate cookie flavors of a full roast without the smokiness.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249800/solidus/ygqarv9xiiz1plzpo7j9.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Vanilla"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 3,
    #         "name": "After Hours Decaf",
    #         "origin": "Honduras",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 22,
    #         "description": "With a level of brightness higher than most decafs, After Hours provides an actually exciting caffeine-free drinking experience.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660262909/solidus/yjdzexy39hykmdb3yxm0.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    # ]
    # brand4Coffee = [
    #     {
    #         "curator_id": 2,
    #         "brand_id": 4,
    #         "name": "Suke Quto Organic",
    #         "origin": "Ethiopia",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 26,
    #         "description": "Delicate flavors of vanilla wafer, dried pineapple, lavender, and brown sugar. Juicy blood orange acidity, lavender florals, and a splash of tropical fruit all combine in this fun and beautiful Ethiopian cup.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663337584/solidus/bp9q2iw1mlj3kpddsuku.png",
    #         "notes": [notes_dict['Citrus'], notes_dict["Florals"], notes_dict["Tropical Fruit"]],
    #         "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 4,
    #         "name": "Nicaragua Sacaclí",
    #         "origin": "Nicaragua",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 26,
    #         "description": "This Nicaraguan coffee is the first one to receive a regenerative agriculture certification and is perfect for fall with its toasted nutty sweetness in addition to notes of cooked apples and baking spice.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663954591/solidus/nsnxd1u12rs1o1bfjqp8.png",
    #         "notes": [notes_dict['Citrus'], notes_dict["Nutty"], notes_dict["Stone Fruit"]],
    #         "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 4,
    #         "name": "Sumatra Queen Ketiara",
    #         "origin": "Sumatra",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "Earthy-sweet tobacco notes draw from a deep, dark chocolaty sweetness, made extra cozy by its subtle clove spiciness.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660251371/solidus/ps3x9h5xfydstfzriyp2.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 4,
    #         "name": "Las Margaritas Yellow Bourbon",
    #         "origin": "Colombia",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 29,
    #         "description": "Syrupy tart cherry notes and juicy tropical sweetness combine with complex citrus and green apple acidity in this dynamic cup.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249302/solidus/ehuiq2eu9inlb1efvmsc.png",
    #         "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Tropical Fruit"]],
    #         "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
    #     }
    # ]
    # brand5Coffee = [
    #     {
    #         "curator_id": 2,
    #         "brand_id": 5,
    #         "name": "El Salvador Metapan",
    #         "origin": "El Salvador",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 25,
    #         "description": "Medium-roasted but with an incredibly rich body, this coffee also features rich cocoa sweetness and notes of juicy green apple.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1662048240/solidus/kgphbwgwf33se7j8n5jx.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Stone Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday'], days_dict['Sunday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 5,
    #         "name": "Sermon",
    #         "origin": "Brazil",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 25,
    #         "description": "We can testify to this new take on classically brewed coffee: sweet, but substantial; playful but rich. Preach.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604244/solidus/cbzflfpbnhruwbggrzd6.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 5,
    #         "name": "Vancouver Decaf",
    #         "origin": "Brazil",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "Mellow out with an impressively complex coffee that sacrifices caffeine without abandoning flavor—rich, but sweet. A coffee lover’s decaf.",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604287/solidus/aq6ejsxgxefbrf5wycwi.png",
    #         "notes": [notes_dict['Citrus'], notes_dict["Nutty"], notes_dict["Vanilla"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 5,
    #         "name": "Streetlevel",
    #         "origin": "Various (Blend)",
    #         "roast": "medium",
    #         "inventory": 100,
    #         "price": 23,
    #         "description": "This dynamic blend takes Verve’s roaster ethos to the streets with an accessible espresso-citrus balance that feels essentially democratic (coffee for all).",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604186/solidus/rxjvbxkucaeefgogssjx.png",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
    #     },
    #     {
    #         "curator_id": 2,
    #         "brand_id": 5,
    #         "name": "Pulcal",
    #         "origin": "Guatemala",
    #         "roast": "light",
    #         "inventory": 100,
    #         "price": 25,
    #         "description": "Tons of rich, caramelly sweetness and juicy plum are brightened up by an intriguing note of syrupy, sparkly cola. Another fan favorite from Antigua, Guatemala, this year’s Pulcal encompasses all of the delicate and exciting flavors we love about Guatemalan coffee. ",
    #         "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665606671/solidus/fmdoazhk5zzfhpuqbccj.png",
    #         "notes": [notes_dict['Spices'], notes_dict["Stone Fruit"], notes_dict["Vanilla"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday'], days_dict['Sunday']]
    #     },
    # ]

    # brandCoffee = [
    #     {
    #         "curator_id": 2,
    #         "brand_id": 2,
    #         "name": "Cerberus",
    #         "origin": "Honduras",
    #         "roast": "dark",
    #         "inventory": 100,
    #         "price": 17,
    #         "description": "",
    #         "img_url": "",
    #         "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
    #         "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday'], days_dict['Sunday']]
    #     },
    # ]

    all_coffee = [
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Nebula",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 24,
            "description": "Super honey-sweet and full-bodied, this comforting cup's rich chocolaty notes and hint of roast will satisfy any sweet tooth.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660154134/solidus/pdw7hgglym6y0yxqzknk.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Vanilla"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 4,
            "name": "Las Margaritas Yellow Bourbon",
            "origin": "Colombia",
            "roast": "light",
            "inventory": 100,
            "price": 29,
            "description": "Syrupy tart cherry notes and juicy tropical sweetness combine with complex citrus and green apple acidity in this dynamic cup.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249302/solidus/ehuiq2eu9inlb1efvmsc.png",
            "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Tropical Fruit"]],
            "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Santa Marta - GUATEMALA",
            "origin": "Guatemala",
            "roast": "light",
            "inventory": 100,
            "price": 25,
            "description": "Nutty almond sweetness and a buttery body combine with notes of cocoa and hints of cherry lingering in the background.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660252705/solidus/tb1cpa7qmhluctvqexmx.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 3,
            "name": "Conscientious Objector",
            "origin": "Various (Blend)",
            "roast": "medium",
            "inventory": 100,
            "price": 23,
            "description": "Blended to offer full flavor and body to your cup. You can expect a classic sweet earthiness up front with a creamy milk chocolate bar finish. Hearty, smooth and Free to be Bold.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660246118/solidus/lkpjonsy23ndn0rpa5ej.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Citrus"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Yummy Decaf",
            "origin": "Nicaragua",
            "roast": "medium",
            "inventory": 100,
            "price": 26,
            "description": "This decaf's pleasant brown sugar sweetness is the perfect accompaniment to juicy orange acidity and notes of fresh stone fruit.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663337374/solidus/gz8m05ncvndaaby9xbjm.png",
            "notes": [notes_dict['Citrus'], notes_dict["Spices"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 4,
            "name": "Suke Quto Organic",
            "origin": "Ethiopia",
            "roast": "light",
            "inventory": 100,
            "price": 26,
            "description": "Delicate flavors of vanilla wafer, dried pineapple, lavender, and brown sugar. Juicy blood orange acidity, lavender florals, and a splash of tropical fruit all combine in this fun and beautiful Ethiopian cup.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663337584/solidus/bp9q2iw1mlj3kpddsuku.png",
            "notes": [notes_dict['Citrus'], notes_dict["Florals"], notes_dict["Tropical Fruit"]],
            "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Chirinos Peru",
            "origin": "Peru",
            "roast": "light",
            "inventory": 100,
            "price": 17,
            "description": "This lot features aromas of vanilla and stone fruits, with flavors of apricot and plum found in your first sips. As the cup cools, dried fruits like prune and raisin come to the forefront, with cane sugar sweetness leading to Swiss chocolate. A round body and plum-like acidity carry into a butterscotch aftertaste.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1662048366/solidus/ppe84tu9pich4kh7p4go.png",
            "notes": [notes_dict['Berry Fruit'], notes_dict["Citrus"], notes_dict["Nutty"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Cafe de Sol",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 23,
            "description": "Our cold brew blend brings together incredible sweetness and dynamic flavors that are sure to be a delight for any coffee drinker. While drinking, delicate fruit dances across the palate eventually lingering and leaving its honey-like sweetness on the tongue.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837031/solidus/eyqbetp8nf8xmrmvkuvw.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Brown Sugar"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Monkey Bite Espresso",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 24,
            "description": "Named for the harrowing monkey attack that our founder Chuck suffered through in Kenya, this espresso is a top seller at the cafes and on-line. Our seasonal blend is carefully crafted and tested to be pulled as delicious straight espresso while it also works well in a traditional milk-based drink like a Cortado. This is the same fantastic blend we use in all our six retail cafes in San Diego, CA. Works as a brewed cup of coffee as well!",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837018/solidus/hj7nuaccl6329qmjijmx.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Vanilla"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Bird Rock Blend",
            "origin": "Various (Blend)",
            "roast": "medium",
            "inventory": 100,
            "price": 23,
            "description": "Easy-drinking and perfect for the traditionalist, this crowd-pleasing blend is an easy introduction to our coffee at BRCR. Many of our other lots and blends will tend more towards the \"3rd wave\" style that lets acidity and complexity shine, but this blend uses seasonal ingredients in a way that is more appealing to a wider range of coffee lovers.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837101/solidus/tsztoftjwtld7pvgvbhn.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 3,
            "name": "Darkroom",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 23,
            "description": "This dark roast features a rich, velvety body with a pleasantly balanced roastiness and bittersweet honeycomb aftertaste.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660255519/solidus/vxjztjguoljmtsff5dcl.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Vanilla"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 3,
            "name": "Wata Dara - Ethiopia",
            "origin": "Ethiopia",
            "roast": "medium",
            "inventory": 100,
            "price": 24,
            "description": "This washed Ethiopian coffee features tons of sugary sweetness in addition to juicy stone fruit and fresh floral notes. There is a sweet, citric acidity that reminded us of limeade and an overall floral character that reminded us of rose. This is a delicate but delicious coffee.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1661464716/solidus/nmsjwwhwbecqy2gcn87m.png",
            "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Florals"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 1,
            "name": "Bunum Wo Estate Peaberry",
            "origin": "Peru",
            "roast": "medium",
            "inventory": 100,
            "price": 24,
            "description": "Deliciously sweet and unique, this Indonesian coffee features sweet tobacco aromatics with hints of toasted hazelnuts and a touch of juicy cherry notes.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249039/solidus/kz7votvc4o0xbnb3g0jw.png",
            "notes": [notes_dict['Berry Fruit'], notes_dict["Spices"], notes_dict["Nutty"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 5,
            "name": "Pulcal",
            "origin": "Guatemala",
            "roast": "light",
            "inventory": 100,
            "price": 25,
            "description": "Tons of rich, caramelly sweetness and juicy plum are brightened up by an intriguing note of syrupy, sparkly cola. Another fan favorite from Antigua, Guatemala, this year’s Pulcal encompasses all of the delicate and exciting flavors we love about Guatemalan coffee. ",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665606671/solidus/fmdoazhk5zzfhpuqbccj.png",
            "notes": [notes_dict['Spices'], notes_dict["Stone Fruit"], notes_dict["Vanilla"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday'], days_dict['Sunday']]
        },
        {
            "curator_id": 2,
            "brand_id": 3,
            "name": "Bauhaus",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 23,
            "description": "A sticky body and the tell-tale tolls of a big ol' dark roast are front and center in this blend that's not just for goths and art students. This remains a favorite among fans of sweet, mellow full bodied cups that only a skillful roast can provide. Bauhaus is taken deep enough to bring you the bittersweet chocolate cookie flavors of a full roast without the smokiness.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660249800/solidus/ygqarv9xiiz1plzpo7j9.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Vanilla"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 4,
            "name": "Nicaragua Sacaclí",
            "origin": "Nicaragua",
            "roast": "medium",
            "inventory": 100,
            "price": 26,
            "description": "This Nicaraguan coffee is the first one to receive a regenerative agriculture certification and is perfect for fall with its toasted nutty sweetness in addition to notes of cooked apples and baking spice.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1663954591/solidus/nsnxd1u12rs1o1bfjqp8.png",
            "notes": [notes_dict['Citrus'], notes_dict["Nutty"], notes_dict["Stone Fruit"]],
            "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 1,
            "brand_id": 1,
            "name": "Ubuto - KARUZI, BURUNDI",
            "origin": "Burundi",
            "roast": "medium",
            "inventory": 90,
            "price": 26,
            "description": 'This coffee is called "Ubuto" ("young" in Kirundi) after the younger coffee trees that produce a cup with fresh grapefruit and cherry acidity in addition to floral notes of black tea and hints of spice.',
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1664463923/solidus/gnel1kem8ontpywowwdz.png",
            "notes": [notes_dict['Stone Fruit'], notes_dict["Citrus"], notes_dict["Spices"]],
            "days": [days_dict['Tuesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 4,
            "name": "Sumatra Queen Ketiara",
            "origin": "Sumatra",
            "roast": "light",
            "inventory": 100,
            "price": 23,
            "description": "Earthy-sweet tobacco notes draw from a deep, dark chocolaty sweetness, made extra cozy by its subtle clove spiciness.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660251371/solidus/ps3x9h5xfydstfzriyp2.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "Boru Batak",
            "origin": "Sumatra",
            "roast": "medium",
            "inventory": 80,
            "price": 24,
            "description": "Clean and tart grape acidity mingles with bright notes of lemon and a slightly earthy tobacco sweetness. In Sumatra women are the backbone of the coffee business and make all of the quality and buying decisions. Boru means the link to the maternal line of the family and we thought that we should pay homage to them with naming this coffee Boru Batak.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837004/solidus/itmip3ncncm9afcq5fzb.png",
            "notes": [notes_dict['Stone Fruit'], notes_dict["Spices"], notes_dict["Citrus"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 5,
            "name": "El Salvador Metapan",
            "origin": "El Salvador",
            "roast": "light",
            "inventory": 100,
            "price": 25,
            "description": "Medium-roasted but with an incredibly rich body, this coffee also features rich cocoa sweetness and notes of juicy green apple.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1662048240/solidus/kgphbwgwf33se7j8n5jx.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Stone Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday'], days_dict['Saturday'], days_dict['Sunday']]
        },
        {
            "curator_id": 2,
            "brand_id": 5,
            "name": "Sermon",
            "origin": "Brazil",
            "roast": "light",
            "inventory": 100,
            "price": 25,
            "description": "We can testify to this new take on classically brewed coffee: sweet, but substantial; playful but rich. Preach.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604244/solidus/cbzflfpbnhruwbggrzd6.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Berry Fruit"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 3,
            "name": "After Hours Decaf",
            "origin": "Honduras",
            "roast": "light",
            "inventory": 100,
            "price": 22,
            "description": "With a level of brightness higher than most decafs, After Hours provides an actually exciting caffeine-free drinking experience.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660262909/solidus/yjdzexy39hykmdb3yxm0.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday'], days_dict['Friday']]
        },
        {
            "curator_id": 2,
            "brand_id": 5,
            "name": "Vancouver Decaf",
            "origin": "Brazil",
            "roast": "medium",
            "inventory": 100,
            "price": 23,
            "description": "Mellow out with an impressively complex coffee that sacrifices caffeine without abandoning flavor—rich, but sweet. A coffee lover’s decaf.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604287/solidus/aq6ejsxgxefbrf5wycwi.png",
            "notes": [notes_dict['Citrus'], notes_dict["Nutty"], notes_dict["Vanilla"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 5,
            "name": "Streetlevel",
            "origin": "Various (Blend)",
            "roast": "medium",
            "inventory": 100,
            "price": 23,
            "description": "This dynamic blend takes Verve’s roaster ethos to the streets with an accessible espresso-citrus balance that feels essentially democratic (coffee for all).",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1665604186/solidus/rxjvbxkucaeefgogssjx.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Nutty"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
        {
            "curator_id": 2,
            "brand_id": 2,
            "name": "French Roast",
            "origin": "Various (Blend)",
            "roast": "dark",
            "inventory": 100,
            "price": 21,
            "description": "While this is a more developed roast profile compared to our lighter roasted offerings, we end up with something that actually tastes like coffee not burnt wood and you wont notice a ton of oil on the beans' surface. And, we use damn good coffee beans.",
            "img_url": "https://res.cloudinary.com/roastcollective/image/upload/h_1000,w_1000,f_auto,fl_progressive:steep,q_auto:good/v1660837084/solidus/zaiywtudefiylogt6ozc.png",
            "notes": [notes_dict['Milk Chocolate'], notes_dict["Berry Fruit"], notes_dict["Roastiness"]],
            "days": [days_dict['Monday'], days_dict['Tuesday'], days_dict['Wednesday'], days_dict['Thursday']]
        },
    ]

    for coffee in all_coffee: 
        coffeeRow = Coffee(
            curator_id=coffee['curator_id'],
            brand_id=coffee['brand_id'],
            name=coffee['name'],
            origin=coffee['origin'],
            roast=coffee['roast'],
            inventory=coffee['inventory'],
            price=coffee['price'],
            description=coffee['description'],
            img_url=coffee['img_url'],
            notes=coffee['notes'],
            days=coffee['days'],
        )
        db.session.add(coffeeRow)

    # for coffee in brand1Coffee:
    #     coffeeRow = Coffee(
    #         curator_id=coffee['curator_id'],
    #         brand_id=coffee['brand_id'],
    #         name=coffee['name'],
    #         origin=coffee['origin'],
    #         roast=coffee['roast'],
    #         inventory=coffee['inventory'],
    #         price=coffee['price'],
    #         description=coffee['description'],
    #         img_url=coffee['img_url'],
    #         notes=coffee['notes'],
    #         days=coffee['days'],
    #     )
    #     db.session.add(coffeeRow)
    # for coffee in brand2Coffee:
    #     coffeeRow = Coffee(
    #         curator_id=coffee['curator_id'],
    #         brand_id=coffee['brand_id'],
    #         name=coffee['name'],
    #         origin=coffee['origin'],
    #         roast=coffee['roast'],
    #         inventory=coffee['inventory'],
    #         price=coffee['price'],
    #         description=coffee['description'],
    #         img_url=coffee['img_url'],
    #         notes=coffee['notes'],
    #         days=coffee['days'],
    #     )
    #     db.session.add(coffeeRow)
    # for coffee in brand3Coffee:
    #     coffeeRow = Coffee(
    #         curator_id=coffee['curator_id'],
    #         brand_id=coffee['brand_id'],
    #         name=coffee['name'],
    #         origin=coffee['origin'],
    #         roast=coffee['roast'],
    #         inventory=coffee['inventory'],
    #         price=coffee['price'],
    #         description=coffee['description'],
    #         img_url=coffee['img_url'],
    #         notes=coffee['notes'],
    #         days=coffee['days'],
    #     )
    #     db.session.add(coffeeRow)
    
    # for coffee in brand4Coffee:
    #     coffeeRow = Coffee(
    #         curator_id=coffee['curator_id'],
    #         brand_id=coffee['brand_id'],
    #         name=coffee['name'],
    #         origin=coffee['origin'],
    #         roast=coffee['roast'],
    #         inventory=coffee['inventory'],
    #         price=coffee['price'],
    #         description=coffee['description'],
    #         img_url=coffee['img_url'],
    #         notes=coffee['notes'],
    #         days=coffee['days'],
    #     )
    #     db.session.add(coffeeRow)
    
    # for coffee in brand5Coffee:
    #     coffeeRow = Coffee(
    #         curator_id=coffee['curator_id'],
    #         brand_id=coffee['brand_id'],
    #         name=coffee['name'],
    #         origin=coffee['origin'],
    #         roast=coffee['roast'],
    #         inventory=coffee['inventory'],
    #         price=coffee['price'],
    #         description=coffee['description'],
    #         img_url=coffee['img_url'],
    #         notes=coffee['notes'],
    #         days=coffee['days'],
    #     )
    #     db.session.add(coffeeRow)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the Coffees table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_coffee_day_note():
    db.session.execute('TRUNCATE coffees RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE days RESTART IDENTITY CASCADE;')
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()
