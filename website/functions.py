from .models import *
import random

def is_picture(filename):
    if filename.split('.',1)[1].lower() in ['jpg','jpeg','png']:
        return 1
    else:
        return 0

def generate_img_name(filename, user, key):
    print(user)
    extension = filename.split('.',1)[1].lower()
    which_note = len(user.notes)+1
    return f'{user.username}-{which_note}-{key}.{extension}'

def generate_img_key():
    return random.randint(1000,9999)