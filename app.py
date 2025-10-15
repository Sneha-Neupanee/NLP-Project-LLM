from flask import Flask, request, jsonify, render_template
from transformers import pipeline

app = Flask(__name__)

# Serve HTML
@app.route('/')
def home():
    return render_template('index.html')

# Load the sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis")

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data.get('text', '')
    result = sentiment_pipeline(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
