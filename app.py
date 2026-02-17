from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

# 🔑 Paste your API key here
openai.api_key = "AIzaSyCeMt8BYKcKlp7OluvBwkTvO4nC0_ceWTA"

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate_description():
    data = request.json
    product = data.get("product")

    prompt = f"""
    Write a persuasive and SEO optimized ecommerce product description.
    Product details: {product}

    Include:
    - Catchy title
    - Short paragraph
    - Bullet features
    """

    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=200
    )

    result = response["choices"][0]["message"]["content"]
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
