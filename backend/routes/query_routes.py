from flask import Blueprint, request, jsonify
from services.db_service import get_supabase_client
from fuzzywuzzy import process
import re

query_bp = Blueprint('query', __name__)
supabase = get_supabase_client()

# Preprocess text: lowercase, remove punctuation


def preprocess_text(text):
    return re.sub(r'[^\w\s]', '', text.lower())


@query_bp.route('/query', methods=['POST'])
def handle_query():
    data = request.json
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"error": "No query provided"}), 400
    print(f"Received query: {user_query}")  
    processed_query = preprocess_text(user_query)

    try:
        # Fetch stored queries from Supabase
        response = supabase.table("faq").select("query, answer").execute()

        if not response.data:
            return jsonify({"response": "No FAQs found in the database."})

        # Create a list of queries and answers
        queries = [preprocess_text(f["query"]) for f in response.data]
        answers = {preprocess_text(f["query"]): f["answer"]
                   for f in response.data}

        # Find the best match using fuzzy matching
        best_match, similarity_score = process.extractOne(
            processed_query, queries)

        if similarity_score >= 80:
            return jsonify({"response": answers[best_match]})

        return jsonify({"response": "I'm sorry, I don't understand. Can you rephrase?"})

    except Exception as e:
        return jsonify({"error": f"Database error: {str(e)}"}), 500
