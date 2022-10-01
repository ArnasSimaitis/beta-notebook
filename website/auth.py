from urllib import request
from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__)

@auth.route('/welcome', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('views.home'))
    if request.method == 'POST':
        req = request.get_json()
        if req['request'] == 'login':
            # Jeigu svečias #
            if req['username'] == 'guest' and req['password'] == 'guest':
                user = User.query.filter_by(username='guest').first()
                login_user(user,remember=False)
                return jsonify({'response':1})
            user = User.query.filter_by(username=req['username']).first()
            if user:
                if check_password_hash(user.password, req['password']):
                    login_user(user,remember=True)
                    return jsonify({'response':1})
                else:
                    return jsonify({"response":'Vartotojas nerastas. Patikrinkite įvestus duomenis arba užsiregistruokite.'})
            else:
                return jsonify({'response':"Vartotojas nerastas."})
        elif req['request'] == 'register':
            # Tikrinam
            if req['email'] == '' or req['password'] == '' or req['username'] == '' or req['confirm'] == '':
                return jsonify({'response':'Užpildykite visus laukus'})
            check_email = User.query.filter_by(email = req['email']).first()
            if check_email:
                return jsonify({'response':'Elektroninio pašto adresas užimtas.'})
            check_username = User.query.filter_by(username = req['username']).first()
            if check_username:
                return jsonify({'response':"Vartotojo vardas užimtas."})
            if req['password'] != req['confirm']:
                return jsonify({'response':'Slaptažodžiai nesutampa.'})
            if len(req['password']) > 150:
                return jsonify({'response':'Per ilgas slaptažodis. Daugiausiai 150 simbolių.'})
            if len(req['username']) > 150:
                return jsonify({'response':'Per ilgas vartotojo vardas. Daugiausiai 150 simbolių.'})

            # Registruojam
            user = User(email=req['email'],
                username=req['username'],
                password = generate_password_hash(req['password'], method='sha256'))
            db.session.add(user)
            db.session.commit()
            login_user(user, remember=True)
            return jsonify({'response':1})       

    return render_template("login.html", user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
