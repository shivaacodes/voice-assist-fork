from flask import Blueprint, request, jsonify
from services.db_service import get_supabase_client
import re

query_bp = Blueprint("query", __name__)
supabase = get_supabase_client()

# Preprocess text: lowercase, remove punctuation


def preprocess_text(text):
    return re.sub(r"[^\w\s]", "", text.lower().strip())


@query_bp.route("/query", methods=["POST"])
def handle_query():
    data = request.json
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    print(f"Received query: {user_query}")  # Debugging print

    try:
        # Fetch all queries from the database
        response = supabase.table("faq").select("query, answer").execute()
        # Debugging: Check what queries are in the DB
        stored_queries = [q["query"] for q in response.data]
        print("Stored Queries in DB:", stored_queries)

        if not response.data:
            print("No data found in the faq table. Response:", response)
            return jsonify({"response": "No FAQs found in the database."})

        # Preprocess the user query
        processed_query = preprocess_text(user_query)
        print(f"Processed query: {processed_query}")

        # Search for a match
        match_response = (
            supabase.table("faq")
            .select("answer")
            .ilike("query", f"%{processed_query}%")
            .execute()
        )

        # Debugging: Print the response from Supabase
        print("Supabase Response:", match_response.data)

        if match_response.data:
            answer = match_response.data[0]["answer"]
            # Print the answer to the command line
            print(f"Matched answer: {answer}")

            # Create the response object to log and return
            response_obj = {"response": answer}
            print("Sending response to client:", response_obj)
            return jsonify(response_obj)

        # No match found response
        response_obj = {
            "response": "I'm sorry, I don't understand. Can you rephrase?"}
        print("Sending response to client (no match):", response_obj)
        return jsonify(response_obj)

    except Exception as e:
        error_response = {"error": f"Database error: {str(e)}"}
        print("Error response:", error_response)
        return jsonify(error_response), 500
