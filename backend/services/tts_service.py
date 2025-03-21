import requests
import os
import uuid
from config import HUME_API_KEY, TTS_OUTPUT_FOLDER

# Hume API endpoint
HUME_TTS_URL = "https://api.hume.ai/v0/tts"

# Ensure the output folder exists
os.makedirs(TTS_OUTPUT_FOLDER, exist_ok=True)


def generate_tts(text):
    """
    Convert text to speech using Hume API and save as an MP3 file.
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
            # Generate a unique filename to prevent overwriting
            output_filename = f"{uuid.uuid4()}.mp3"
            output_path = os.path.join(TTS_OUTPUT_FOLDER, output_filename)

            # Save the MP3 file
            with open(output_path, "wb") as f:
                f.write(response.content)

            return output_path
        else:
            return f"Error: {response.json().get('message', 'Unknown error')}"

    except requests.exceptions.RequestException as e:
        return f"Exception: {str(e)}"
