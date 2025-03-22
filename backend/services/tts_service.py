import atexit
import os
import asyncio
import base64
from pathlib import Path
from hume import AsyncHumeClient
from hume.tts import PostedUtterance
from dotenv import load_dotenv

load_dotenv()

# Initialize Hume client
HUME_API_KEY = os.getenv("HUME_API_KEY")
if not HUME_API_KEY:
    raise EnvironmentError("HUME_API_KEY not found in environment variables")
hume = AsyncHumeClient(api_key=HUME_API_KEY)

# Output directory configuration
TTS_OUTPUT_FOLDER = Path("static/tts_output")
TTS_OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

# Create a single event loop that persists
loop = asyncio.get_event_loop()
if loop.is_closed():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)


async def generate_tts_async(text: str) -> str:
    """Generates TTS audio from text and returns the file path"""
    try:
        # Generate speech with a female assistant-like voice
        speech = await hume.tts.synthesize_json(
            utterances=[
                PostedUtterance(
                    description="A calm, professional female assistant",  # Updated voice description
                    text=text,
                )
            ],
            num_generations=1,
        )

        # Save the audio
        audio_data = speech.generations[0].audio
        audio_filename = f"tts_{int(os.times().elapsed)}.wav"
        audio_path = TTS_OUTPUT_FOLDER / audio_filename

        with open(audio_path, "wb") as f:
            f.write(base64.b64decode(audio_data))

        return str(audio_path)

    except Exception as e:
        raise Exception(f"TTS generation error: {str(e)}")


def generate_tts(text: str) -> str:
    """Synchronous wrapper for async TTS generation"""
    if not text:
        raise ValueError("Text input is required")

    # Use the existing event loop
    try:
        return loop.run_until_complete(generate_tts_async(text))
    except Exception as e:
        raise e

# Cleanup function to close the loop when the application exits


def cleanup():
    if not loop.is_closed():
        loop.close()


# Register cleanup when the application exits
atexit.register(cleanup)
