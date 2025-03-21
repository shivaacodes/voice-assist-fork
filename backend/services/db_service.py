import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_API_KEY")


def get_supabase_client():
    """
    Creates and returns a Supabase client.
    """
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise ValueError(
            "Supabase URL or API key is missing in environment variables.")

    return create_client(SUPABASE_URL, SUPABASE_KEY)
