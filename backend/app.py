# app.py
from flask import Flask
from flask_cors import CORS
from routes.tts_routes import tts_bp
from routes.query_routes import query_bp
from routes.application_routes import application_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(tts_bp, url_prefix='/api')
app.register_blueprint(query_bp, url_prefix='/api')
app.register_blueprint(application_bp, url_prefix='/api')

if __name__ == "__main__":
    app.run(debug=True)
