from .models import *
import random
from flask import jsonify, Flask
from flask_login import current_user
import os

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

def upload_img(file,note_id):
    filename = file.filename
    if is_picture(filename) == 0:
        return jsonify({'response':'Tinka tik .png, .jpg, .jpeg formato nuotraukos. Jas galėsite pridėti vėliau.'})
    
    # Sukuriam unikalų pavadinimą
    user = User.query.filter_by(id=current_user.id).first()
    for x in user.notes:
        print(x)
    key = generate_img_key()
    new_filename = generate_img_name(filename, user, key)

    # Išsaugom nuotrauką
    path = os.path.join('/img', new_filename)
    app = Flask(__name__)
    full_path = f"{app.root_path}/{path}"
    file.save(full_path)

    # Tikrinam nuotraukos dydį
    if os.stat(full_path).st_size > 10000000*10:
        os.remove(full_path)
        return jsonify({'response':'Nuotraukos negali būti didesnės nei 10MB. Jas galėsite pridėti vėliau.'})

    new_picture = Pictures(key = key, name = new_filename, note = note_id)
    db.session.add(new_picture)
    db.session.commit()