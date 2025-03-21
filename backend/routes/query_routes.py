from flask import Blueprint, request, jsonify
from supabase import create_client
from fuzzywuzzy import process
import re
import os
from dotenv import load_dotenv

load_dotenv()

query_bp = Blueprint('query', __name__)

# Supabase connection
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Preprocess text: lowercase, remove punctuation


def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)  # Remove special characters
    return text


@query_bp.route('/query', methods=['POST'])
def handle_query():
    data = request.json
    user_query = data.get("query", "")

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    processed_query = preprocess_text(user_query)

    # Fetch stored queries from Supabase
    response = supabase.table("faq").select("query, answer").execute()
    faq_data = response.data

    # Create a list of queries and answers
    queries = [preprocess_text(f["query"]) for f in faq_data]
    answers = {preprocess_text(f["query"]): f["answer"] for f in faq_data}

    # Find the best match using fuzzy matching
    best_match, similarity_score = process.extractOne(processed_query, queries)

    # If similarity score is above 80, return the answer
    if similarity_score >= 80:
        return jsonify({"response": answers[best_match]})

    return jsonify({"response": "I'm sorry, I don't understand. Can you rephrase?"})
