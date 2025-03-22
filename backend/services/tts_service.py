import requests
import os
import uuid
from config import HUME_API_KEY, TTS_OUTPUT_FOLDER

# Hume API endpoint
HUME_TTS_URL = "https://api.hume.ai/v0/tts"

# Ensure the output folder exists

def generate_tts(text):
    """
    Convert text to speech using Hume API and return audio data as bytes.
    """
    headers = {
        "Authorization": f"Bearer {HUME_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "text": text,
        "voice": "female-executive",  # Professional female voice
        "sample_rate": 24000  # High-quality audio
    }

    try:
        response = requests.post(HUME_TTS_URL, json=data, headers=headers)

        if response.status_code == 200:
            # Return audio data directly in bytes
            return response.content
        else:
            # Return error message as bytes for logging
            return f"Error: {response.json().get('message', 'Unknown error')}".encode()

    except requests.exceptions.RequestException as e:
        # Return exception message as bytes for logging
        return f"Exception: {str(e)}".encode()
