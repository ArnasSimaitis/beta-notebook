from urllib import request
from flask import Flask, Blueprint, render_template, request, flash, jsonify, redirect, url_for
from flask_login import login_required, current_user
from .models import User, Pictures, Notes
from . import db
import os
from .functions import is_picture, generate_img_name, generate_img_key


views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if len(current_user.notes) == 0:
        return redirect(url_for('views.category'))
    return render_template("base.html", user=current_user)

@views.route('/category', methods=['GET','POST'])
@login_required
def category():
    if request.method == 'POST':
        req = request.values['request']
        if req == 'createNote':
            name = request.values['name']
            note = request.values['note']
            if name == '' or note == '':
                return jsonify({'response':'Užpildykite reikiamus laukelius.'})
            new_note = Notes(name = name, note = note, category=1, user=current_user.id)
            db.session.add(new_note)
            db.session.commit()

            if 'img' in request.files:
                uploaded_files = request.files.getlist("img")
                for file in uploaded_files:
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

                    new_picture = Pictures(key = key, name = new_filename, note = new_note.id)
                    db.session.add(new_picture)
                    db.session.commit()
            
            return jsonify({'response':1})

    return render_template("create_category.html", user=current_user)
