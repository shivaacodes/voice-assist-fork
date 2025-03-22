from flask import Blueprint, request, jsonify, send_file
from services.gemini_service import generate_questions, get_next_question
from services.tts_service import generate_tts
import os
import base64
import uuid
from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

application_bp = Blueprint("application", __name__)

# Temporary in-memory storage for user answers
temp_storage = {}

# Labels for the application form fields (corresponding to the questions)
FIELD_LABELS = [
    "Full Name",
    "Email Address",
    "Phone Number",
    "Date of Birth",
    "Residential Address",
    "Purpose of Application"
]

# Intro and outro messages
INTRO_MESSAGE = "Welcome! Let's begin your application. Please answer the following questions one by one.What is your full name?"
OUTRO_MESSAGE = "Thank you! Your application is complete. Generating your final document now!"


@application_bp.route("/start-application", methods=["POST"])
def start_application():
    """Start the application process by sending the intro message, then the first question."""
    try:
        session_id = str(uuid.uuid4())
        questions = generate_questions()
        temp_storage[session_id] = {"questions": questions, "answers": {}}

        # Send the intro message first
        intro_audio_path = generate_tts(INTRO_MESSAGE)
        with open(intro_audio_path, "rb") as audio_file:
            intro_audio_data = base64.b64encode(
                audio_file.read()).decode("utf-8")

        return jsonify({
            "session_id": session_id,
            "message": {"sender": "Zuhi", "text": INTRO_MESSAGE, "position": "left"},
            "audio": f"data:audio/wav;base64,{intro_audio_data}",
            "step": 0,  # Step 0 for intro
            "total_steps": len(questions) + 1  # +1 for outro
        })
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500


@application_bp.route("/submit-answer", methods=["POST"])
def submit_answer():
    """Submit an answer and get the next question or signal completion."""
    data = request.json
    session_id = data.get("session_id")
    answer = data.get("answer", "").strip()

    if not session_id or session_id not in temp_storage:
        return jsonify({"error": "Invalid session"}), 400
    if not answer:
        return jsonify({"error": "No answer provided"}), 400

    session_data = temp_storage[session_id]
    step = len(session_data["answers"]) + 1
    session_data["answers"][f"question_{step}"] = answer

    messages = [
        {"sender": "You", "text": answer, "position": "right"}
    ]

    next_question = get_next_question(
        session_data["answers"], session_data["questions"])
    if next_question:
        audio_path = generate_tts(next_question)
        with open(audio_path, "rb") as audio_file:
            audio_data = base64.b64encode(audio_file.read()).decode("utf-8")

        messages.append(
            {"sender": "Zuhi", "text": next_question, "position": "left"})
        return jsonify({
            "session_id": session_id,
            "messages": messages,
            "audio": f"data:audio/wav;base64,{audio_data}",
            "step": step,
            "total_steps": len(session_data["questions"]) + 1
        })
    else:
        outro_audio_path = generate_tts(OUTRO_MESSAGE)
        with open(outro_audio_path, "rb") as audio_file:
            outro_audio_data = base64.b64encode(
                audio_file.read()).decode("utf-8")

        messages.append(
            {"sender": "Zuhi", "text": OUTRO_MESSAGE, "position": "left"})
        return jsonify({
            "session_id": session_id,
            "messages": messages,
            "audio": f"data:audio/wav;base64,{outro_audio_data}",
            "step": step,
            "total_steps": len(session_data["questions"]) + 1,
            "completed": True
        })


@application_bp.route("/generate-application-pdf", methods=["POST"])
def generate_pdf():
    """Generate a PDF from the collected answers in an application form format."""
    data = request.json
    session_id = data.get("session_id")

    if not session_id or session_id not in temp_storage:
        return jsonify({"error": "Invalid session"}), 400

    session_data = temp_storage[session_id]
    answers = session_data["answers"]

    # Generate PDF in memory
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    y = 750
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, y, "Application Form")
    y -= 40

    c.setFont("Helvetica", 12)
    for i in range(len(FIELD_LABELS)):
        label = FIELD_LABELS[i]
        answer = answers.get(f"question_{i+1}", "Not provided")
        c.drawString(100, y, f"{label}: {answer}")
        y -= 30

    c.save()
    buffer.seek(0)

    # Clean up session
    del temp_storage[session_id]

    # Send the PDF as a downloadable file
    return send_file(
        buffer,
        as_attachment=True,
        download_name=f"application_{session_id}.pdf",
        mimetype="application/pdf"
    )
