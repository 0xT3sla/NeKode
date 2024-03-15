from flask import Flask, render_template, request, jsonify
from enc_dec import encode_to_binary, decode_from_binary

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        text = request.form['text']
        option = request.form['option']

        if option == 'encode':
            encoded_text = encode_to_binary(text)
            return jsonify({'success': True, 'encoded_text': encoded_text})
        elif option == 'decode':
            decoded_text = decode_from_binary(text)
            return jsonify({'success': True, 'decoded_text': decoded_text})

        return jsonify({'success': False, 'error': 'Invalid option'})

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
