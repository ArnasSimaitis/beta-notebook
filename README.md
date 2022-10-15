# beta-notebook

For full description visit http://www.asimaitis.lt/?app=beta

View app: http://www.asimaitis.lt/beta

Description:

A website for creating, sorting and storing notes.

Features:

Categorize notes
You can assign notes to categories
Accessibility options
If you're having trouble reading - in notes view there's a possibility to invert colors for better readability. Just click on the notes' text.
Attach pictures to your note
You're free to attach any number of pictures to any given note. After that you can download them anytime from the website.
Guest mode
You're not commited to creating an account for using this app. You can start your experience as a guest user. This way the content is stored in the local storage of your browser. Anyway, in guest mode there's no categories and pictures.

Files' tree:

./main.py - main script, used for launching application
./db_settings.py - use this file to set your database's credentials
./create_db.py - script for creating a database if one doesn't exist
./website/__init__.py - script for initializing Flask application
./website/models.py - used for creating SQLAlchemy models
./website/auth.py - script for receiving requests and sending responses for registration/login
./website/views.py - script for rendering Flask pages
./website/creator.py - script for handling HTTP requests
./website/functions.py - file for storing Python functions
./website/img/ - folder for storing user's images
./website/static/ - folder for front-end files as CSS for styling and JS scripts
./website/templates/ - folder for templates for rendering HTML pages
