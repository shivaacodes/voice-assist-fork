import os
from dotenv import load_dotenv
import google.generativeai as genai
import re

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise EnvironmentError("GEMINI_API_KEY not found in environment variables")

genai.configure(api_key=GEMINI_API_KEY)


def clean_question(question: str) -> str:
    """Remove numbers, stars, and titles from the question."""
    # Remove leading numbers (e.g., "1.", "1)") and stars (**), with optional whitespace
    cleaned = re.sub(r"^\s*\d+\.\s*|\*\*\s*", "", question)
    # Remove titles like "Full Name:", "Email Address:", etc., with a colon
    cleaned = re.sub(r"^[A-Za-z\s]+:\s*", "", cleaned)
    return cleaned.strip()


def generate_questions():
    """Return a predefined list of questions for the application form."""
    # Predefined questions (excluding intro and outro)
    raw_questions = [
        "What is your full legal name?",
        "What is your email address for communication?",
        "What is your phone number?",
        "What is your date of birth (DD/MM/YYYY)?",
        "What is your current residential address?",
        "Briefly describe why you are applying."
    ]

    # Clean each question to remove any unwanted formatting
    return [clean_question(q.strip()) for q in raw_questions if q.strip()]


def get_next_question(current_answers: dict, questions: list) -> str | None:
    """Get the next question based on the number of answers provided."""
    if len(current_answers) < len(questions):
        return questions[len(current_answers)]
    return None


# Example usage to test the fix
if __name__ == "__main__":
    questions = generate_questions()
    current_answers = {}  # Simulate no answers yet
    for _ in range(len(questions)):
        next_q = get_next_question(current_answers, questions)
        if next_q:
            print(next_q)
            current_answers[str(len(current_answers))] = "Sample answer"
