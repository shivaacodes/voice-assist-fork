from flask import Blueprint, request, jsonify, send_file
from services.tts_service import generate_tts
import os

tts_bp = Blueprint('tts', __name__)


@tts_bp.route('/tts', methods=['POST'])
def text_to_speech():
    """
    Convert user-provided text to speech and return the WAV file.
    """
    data = request.json
    text = data.get("text")

    if not text:
        return jsonify({"error": "Text input is required"}), 400

    try:
        # Generate the audio file and get its path
        output_file = generate_tts(text)

        # Ensure the file was generated successfully
        if not os.path.exists(output_file):
            return jsonify({"error": "Failed to generate speech"}), 500

        # Send the file as a downloadable attachment
        return send_file(
            output_file,
            as_attachment=True,
            download_name="output.wav",
            mimetype="audio/wav"
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500
