import requests
import os
from config import HUME_API_KEY, TTS_OUTPUT_FOLDER

# Hume API endpoint
HUME_TTS_URL = "https://api.hume.ai/v0/tts"


def generate_tts(text, output_filename="output.mp3"):
    """
    Convert text to speech using Hume API and save as an MP3 file.
    """
    headers = {
        "Authorization": f"Bearer {HUME_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "text": text,
        "voice": "nova",  # Change this based on available voices
        "emotion": "neutral"
    }

    try:
        response = requests.post(HUME_TTS_URL, json=data, headers=headers)

        if response.status_code == 200:
            # Save the MP3 file
            output_path = os.path.join(TTS_OUTPUT_FOLDER, output_filename)
            with open(output_path, "wb") as f:
                f.write(response.content)
            return output_path
        else:
            return f"Error: {response.json()}"

    except Exception as e:
        return f"Exception: {str(e)}"
