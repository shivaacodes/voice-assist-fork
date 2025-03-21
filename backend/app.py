from flask import Flask
from routes.query_routes import query_bp

app = Flask(__name__)

# Register routes
app.register_blueprint(query_bp, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True)
