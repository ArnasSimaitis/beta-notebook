from urllib import request
from flask import Flask, Blueprint, render_template, request, flash, jsonify, redirect, url_for, send_from_directory
from flask_login import login_required, current_user
from .models import User, Pictures, Notes, Category
from . import db
import os
from .functions import upload_img


views = Blueprint('views', __name__)

@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if current_user.username == 'guest':
        return redirect(url_for('views.guest'))
    if len(current_user.notes) == 0:
        return redirect(url_for('creator.category'))
    return render_template("base.html", user=current_user)

@views.route('/categories', methods=['GET', 'POST'])
@login_required
def categories():
    if current_user.username == 'guest':
        return redirect(url_for('views.guest'))
    if request.method == 'GET':
        if 'cat' in request.values:
            category = Category.query.filter_by(id = request.values['cat']).first()
            if category.user == current_user.id:
                return render_template("categories.html", user = current_user, category = category)
            else:
                return redirect(url_for('creator.category'))
        else:
            return redirect(url_for('creator.category'))

@views.route('/note', methods=['GET', 'POST'])
@login_required
def notes():
    if current_user.username == 'guest':
        return redirect(url_for('views.guest'))
    if request.method == 'GET':
        if 'note' in request.values:
            note = Notes.query.filter_by(id=request.values['note']).first()
            category = Category.query.filter_by(id=note.category).first()
            if note.user == current_user.id:
                return render_template("notes.html", user=current_user, note=note, category=category)
    
    return redirect(url_for('views.home'))

@views.route('/guest', methods=['POST', 'GET'])
@login_required
def guest():
    if current_user.username != 'guest':
        return redirect(url_for('views.home'))
    note = 10

    if request.method == 'GET' and 'note' in request.values:
        if int(request.values['note']) < 10 and int(request.values['note']) >= 0: 
            return render_template("guest.html", user=current_user, note=request.values['note'])

    return render_template("guest.html", user=current_user, note=note)

@views.route('/images/<path:filename>')
@login_required
def get_image(filename):
    app = Flask(__name__)
    return send_from_directory(f"{app.root_path}/img",filename, as_attachment=True)