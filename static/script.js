document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('encoder-form');
    const errorMessage = document.getElementById('error-message');
    const outputContainer = document.getElementById('output-container');
    const outputText = document.getElementById('output-text');

    outputContainer.style.display = 'none';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        errorMessage.textContent = '';
        outputText.textContent = '';

        const formData = new FormData(form);
        const inputText = formData.get('text').trim(); // Get input text and remove leading/trailing spaces

        if (!inputText) {
            errorMessage.textContent = 'Please enter valid text to encode or decode.';
            return; // Stop further processing if input text is empty or only spaces
        }

        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (data.success) {
                outputContainer.style.display = 'block';
                if (data.encoded_text) {
                    outputText.innerHTML = `<strong>Encoded Text:</strong> ${data.encoded_text}`;
                } else if (data.decoded_text) {
                    outputText.innerHTML = `<strong>Decoded Text:</strong> ${data.decoded_text}`;
                }
            } else {
                errorMessage.textContent = data.error;
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred. Please try again later.';
            console.error('Error:', error);
        });
    });

    // Add event listener for the option select element to update form action URL
    const optionSelect = document.getElementById('option');
    optionSelect.addEventListener('change', function() {
        if (optionSelect.value === 'encode') {
            form.setAttribute('action', '/');
        } else if (optionSelect.value === 'decode') {
            form.setAttribute('action', '/decode');
        }
    });
});
