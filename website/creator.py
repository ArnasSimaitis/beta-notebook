from urllib import request
from flask import Blueprint, render_template, request, jsonify, redirect, url_for, send_from_directory
from flask_login import login_required, current_user
from .models import Notes, Category
from . import db
from .functions import upload_img

creator = Blueprint('handler', __name__)

@creator.route('/category', methods=['GET','POST'])
@login_required
def category():
    if current_user.username == 'guest':
        return redirect(url_for('views.guest'))

    if request.method == 'GET':
        for x in current_user.notes:
            if x.is_temp == 1:
                db.session.delete(x)
                db.session.commit()
                break

    if request.method == 'POST':
        req = request.values['request']

        if req == 'createNote':
            name = request.values['name']
            note = request.values['note']
            if name == '' or note == '':
                return jsonify({'response':'Užpildykite reikiamus laukelius.'})
            
            category = 1
            for x in current_user.notes:
                print(x,x.is_temp,x.category)
                if x.is_temp == 1:
                    category = x.category
                    db.session.delete(x)
                    db.session.commit()

            if 'category' in request.values:
                category = request.values['category']

            new_note = Notes(name = name, note = note, category=category, user=current_user.id, is_temp = 0)
            db.session.add(new_note)
            db.session.commit()

            if 'img' in request.files:
                uploaded_files = request.files.getlist("img")
                for file in uploaded_files:
                    upload_img(file, new_note.id)
            
            return jsonify({'response':1})

        if req == 'changeCategory':
            changing_note = request.values['note']
            changing_category = request.values['new-cat']
            note = Notes.query.filter_by(id=changing_note).first()
            note.category = changing_category
            db.session.commit()
            return jsonify({'response':1})

        if req == 'createCategory':
            print(request.values)
            name = request.values['name']

            if len(name) > 30:
                return jsonify({'response':'Pavadinimas negali būti ilgesnis nei 30 simbolių.'})

            new_category = Category(name = name, user = current_user.id)
            db.session.add(new_category)
            db.session.commit()
            
            if 'notes' in request.values:
                notes = request.values.getlist('notes')
                if len(notes) > 0:
                    for x in notes:
                        print(x)
                        note = Notes.query.filter_by(id=x).first()
                        note.category = new_category.id
                        db.session.commit()
            
            if 'new-note' in request.values:
                temp_note = Notes(name = request.values['new-note'], is_temp = 1, category=new_category.id, user=current_user.id)
                db.session.add(temp_note)
                db.session.commit()

            return jsonify({"response":1})

        if req == 'uploadPicture':
            if 'img' in request.files:
                img = request.files['img']
                note = request.values['note']
                upload_img(img, note)
                return jsonify({'response':1})
            return jsonify({'response':'Nerastas failas.'})

        if req == 'updateNote':
            changing_note = request.values['note']
            text = request.values['text']
            name = request.values['name']

            note = Notes.query.filter_by(id=changing_note).first()

            note.name = name
            note.note = text
            db.session.commit()

            return jsonify({'response':1})

        if req == 'deleteNote':
            note = Notes.query.filter_by(id=int(request.values['note'])).first()
            if note:
                for x in note.pictures:
                    db.session.delete(x)
                    db.session.commit()
                db.session.delete(note)
                db.session.commit()
            else:
                return jsonify({'response':'Užrašas nerastas'})
            return jsonify({'response':1})


    return render_template("create_category.html", user=current_user)