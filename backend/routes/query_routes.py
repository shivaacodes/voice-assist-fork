from flask import Blueprint, request, jsonify, send_file
from services.db_service import get_supabase_client
from services.tts_service import generate_tts
import re
import os
import base64

query_bp = Blueprint("query", __name__)
supabase = get_supabase_client()


def preprocess_text(text):
    """Preprocess text: lowercase, remove punctuation"""
    return re.sub(r"[^\w\s]", "", text.lower().strip())


@query_bp.route("/query", methods=["POST"])
def handle_query():
    """Handle query and return answer with audio as JSON"""
    data = request.json
    user_query = data.get("query", "").strip()

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    print(f"Received query: {user_query}")

    try:
        # Preprocess the user query
        processed_query = preprocess_text(user_query)

        # Search for a match in Supabase
        match_response = (
            supabase.table("faq2")
            .select("answer")
            .ilike("query", f"%{processed_query}%")
            .execute()
        )

        # Determine the answer
        if match_response.data:
            answer = match_response.data[0]["answer"]
            print(f"Matched answer: {answer}")
        else:
            answer = "I'm sorry, I don't understand. Can you rephrase?"

        # Generate TTS audio
        audio_path = generate_tts(answer)
        if not os.path.exists(audio_path):
            return jsonify({"error": "Failed to generate audio"}), 500

        # Read the audio file and encode it to base64
        with open(audio_path, "rb") as audio_file:
            audio_data = base64.b64encode(audio_file.read()).decode("utf-8")

        # Return JSON with text and audio
        response = {
            "response": answer,
            "audio": f"data:audio/wav;base64,{audio_data}"
        }

        return jsonify(response)

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500
