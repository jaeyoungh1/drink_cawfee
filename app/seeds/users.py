from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Chelsea',
        last_name='The Curating Coffee Cat',
        email='chelseacat@user.io',
        password='password',
        shipping_address='123 Cat St',
        city="Riverside",
        state="CA",
        curator=True
    )

    owner1 = User(
        email="davidrogers@user.io",
        password="password",
        shipping_address="123 Street Ln",
        city="San Francisco",
        state="CA",
        curator=False,
        first_name="David",
        last_name="Rogers"
    )

    owner2 = User(first_name='Adam',
                  last_name='Selki',
                  email='adamselki@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False)

    owner3 = User(first_name='Aijia',
                  last_name='Wang',
                  email='aijiawang@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner4 = User(first_name='Alexander',
                  last_name='Klivecka',
                  email='alexanderklivecka@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner5 = User(first_name='Andrea',
                  last_name='Wu',
                  email='andreawu@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner6 = User(first_name='Brandon',
                  last_name='Tasaki',
                  email='brandontasaki@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner7 = User(first_name='Christopher',
                  last_name='Pannella',
                  email='christopherpannella@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner8 = User(first_name='Jacob',
                  last_name='Lamar',
                  email='jacoblamar@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False)
    owner9 = User(first_name='Jae',
                  last_name='Hwang',
                  email='jaehwang@user.io',
                  password='password',
                  shipping_address="123 Street Ln",
                  city="San Francisco",
                  state="CA",
                  curator=False
                  )
    owner10 = User(first_name='Jake',
                   last_name='Matillano',
                   email='jakematillano@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner11 = User(first_name='James',
                   last_name='Lee',
                   email='jameslee@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner12 = User(first_name='Jason',
                   last_name='Kong',
                   email='jasonkong@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner13 = User(first_name='Jason',
                   last_name='Arnold',
                   email='jasonarnold@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner14 = User(first_name='Jessie',
                   last_name='Baron',
                   email='jessiebaron@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner15 = User(first_name='Joanna',
                   last_name='Gilbert',
                   email='joannagilbert@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner16 = User(first_name='John',
                   last_name='Carrera',
                   email='johncarrera@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner17 = User(first_name='Logan',
                   last_name='Seals',
                   email='loganseals@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner18 = User(first_name='Keerthana',
                   last_name='Yellapragada',
                   email='keerthanayellapragada@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner19 = User(first_name='Kyle',
                   last_name='Kassen',
                   email='kylekassen@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner20 = User(first_name='Michael',
                   last_name='Jung',
                   email='michaeljung@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner21 = User(first_name='Na',
                   last_name='Chen',
                   email='nachen@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner22 = User(first_name='Samuel',
                   last_name='Suh',
                   email='samuelsuh@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner23 = User(first_name='Schaeffer',
                   last_name='Ahn',
                   email='schaefferahn@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner24 = User(first_name='Sean',
                   last_name='Kennedy',
                   email='seankennedy@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner25 = User(first_name='Amanda',
                   last_name='Vien',
                   email='amandavien@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner26 = User(first_name='Yasha',
                   last_name='Yang',
                   email='yashayang@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )
    owner27 = User(first_name='Yibo',
                   last_name='Guo',
                   email='yiboguo@user.io',
                   password='password',
                   shipping_address="123 Street Ln",
                   city="San Francisco",
                   state="CA",
                   curator=False
                   )

    db.session.add(demo)
    db.session.add(owner1)
    db.session.add(owner2)
    db.session.add(owner3)
    db.session.add(owner4)
    db.session.add(owner5)
    db.session.add(owner6)
    db.session.add(owner7)
    db.session.add(owner8)
    db.session.add(owner9)
    db.session.add(owner10)
    db.session.add(owner11)
    db.session.add(owner12)
    db.session.add(owner13)
    db.session.add(owner14)
    db.session.add(owner15)
    db.session.add(owner16)
    db.session.add(owner17)
    db.session.add(owner18)
    db.session.add(owner19)
    db.session.add(owner20)
    db.session.add(owner21)
    db.session.add(owner22)
    db.session.add(owner23)
    db.session.add(owner24)
    db.session.add(owner25)
    db.session.add(owner26)
    db.session.add(owner27)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
