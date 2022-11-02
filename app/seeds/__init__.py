from flask.cli import AppGroup
from .users import seed_users, undo_users
from .brands import seed_brands, undo_brands
from .coffees import seed_coffee_day_note, undo_coffee_day_note
from .reviews import seed_reviews, undo_reviews
from .carts import seed_cart, undo_cart

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_brands()
    seed_coffee_day_note()
    seed_reviews()
    seed_cart()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_brands()
    undo_coffee_day_note()
    undo_reviews()
    undo_cart()
    # Add other undo functions here
