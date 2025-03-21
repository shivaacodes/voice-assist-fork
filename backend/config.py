import os
from dotenv import load_dotenv

load_dotenv()

HUME_API_KEY = os.getenv("HUME_API_KEY")
TTS_OUTPUT_FOLDER = os.getenv("TTS_OUTPUT_FOLDER")
