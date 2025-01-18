from flask import Flask, send_from_directory
from market import app  # Import the app instance from __init__.py
import os

# Serve the frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# Check the connection
@app.route('/api/check', methods=['GET'])
def check_connection():
    return {'status': 'connected'}