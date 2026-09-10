from flask import Flask, render_template, request, jsonify
import smtplib
import os
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

app = Flask(__name__)

CONFIG_FILE = os.path.join(os.path.dirname(__file__), "email_config.json")


def load_config():
    if os.path.exists(CONFIG_FILE):
        with open(CONFIG_FILE, encoding="utf-8") as f:
            return json.load(f)
    return {
        "gmail_user": "vexxor815@gmail.com",
        "gmail_password": "",
        "to_email": "vexxor815@gmail.com",
    }


def send_email(name, message):
    cfg = load_config()
    if not cfg.get("gmail_password"):
        return False

    subject = f"New message from {name} on the patchup site!"
    body = f"""A new message was sent on the patchup website.

From: {name}
Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Message:
{message}

---
Sent with love from the bhonduuu website
"""
    msg = MIMEMultipart()
    msg["From"] = cfg["gmail_user"]
    msg["To"] = cfg["to_email"]
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(cfg["gmail_user"], cfg["gmail_password"])
            server.send_message(msg)
        return True
    except Exception as e:
        print("Email send error:", e)
        return False


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/send-message", methods=["POST"])
def send_message():
    data = request.get_json()
    name = data.get("name", "")
    message = data.get("message", "")

    if not name or not message:
        return jsonify({"status": "error", "msg": "Please fill in all fields."}), 400

    with open("messages.txt", "a", encoding="utf-8") as f:
        f.write(f"From: {name}\nMessage: {message}\n---\n")

    emailed = send_email(name, message)

    if emailed:
        return jsonify({"status": "success", "msg": "Message sent! I'll get it by email ♥"})
    return jsonify({"status": "success", "msg": "Message saved!"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)