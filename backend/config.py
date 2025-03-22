import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Hume API key
HUME_API_KEY = os.getenv("HUME_API_KEY")

# Folder to store TTS output files
TTS_OUTPUT_FOLDER = os.getenv("TTS_OUTPUT_FOLDER", "static/audio")
