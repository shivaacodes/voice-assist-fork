from flask import Blueprint, request, jsonify, send_file, Response  # Added Response import
from services.db_service import get_supabase_client
from services.tts_service import generate_tts
import re
import io
import base64



tts_bp = Blueprint('tts', __name__)


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

        print("Supabase Response:", match_response.data)

        if match_response.data:
            answer = match_response.data[0]["answer"]
            print(f"Matched answer: {answer}")

            # Generate TTS audio (assuming it returns raw audio data)
            audio_data = generate_tts(answer)
            
            # Encode the audio data to base64 to send as JSON
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')

            # Send both the text and the audio as base64 in the JSON response
            response_obj = {
                "response": answer,
                "audio": audio_base64
            }
            print("Sending response to client:", response_obj)

            return jsonify(response_obj)

        # No match found response
        response_obj = {
            "response": "I'm sorry, I don't understand. Can you rephrase?"
        }
        print("Sending response to client (no match):", response_obj)
        return jsonify(response_obj)

    except Exception as e:
        error_response = {"error": f"Database error: {str(e)}"}
        print("Error response:", error_response)
        return jsonify(error_response), 500