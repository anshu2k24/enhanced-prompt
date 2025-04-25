import tiktoken
from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

encoder = tiktoken.get_encoding("gpt2")


def calculate_tokens(text):
    return len(encoder.encode(text))

def calculate_carbon_savings(saved_tokens):
    CO2_per_token = 0.00028 
    return saved_tokens * CO2_per_token

@app.route('/tokenize', methods=['POST'])
def tokenize():
    data = request.get_json()
    original_prompt = data.get("originalPrompt")
    enhanced_prompt = data.get("enhancedPrompt")

    original_tokens = calculate_tokens(original_prompt)
    enhanced_tokens = calculate_tokens(enhanced_prompt)

    saved_tokens = original_tokens - enhanced_tokens
    savings_percentage = (saved_tokens / original_tokens) * 100 if original_tokens > 0 else 0
    carbon_saved = calculate_carbon_savings(saved_tokens)

    return jsonify({
        "savedTokens": saved_tokens,
        "savingsPercentage": savings_percentage,
        "carbonSaved": carbon_saved
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)
