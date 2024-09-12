document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const messageDiv = document.getElementById('message');
    const loginButton = document.getElementById('loginButton');
    const loadingSpinner = document.getElementById('loadingSpinner');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous error messages
        usernameError.textContent = '';
        passwordError.textContent = '';
        messageDiv.textContent = '';
        
        // Validate form fields
        let isValid = true;

        if (!usernameInput.value || !/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(usernameInput.value)) {
            usernameError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!passwordInput.value || passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        if (!isValid) return;

        // Show loading spinner
        loginButton.disabled = true;
        loadingSpinner.style.display = 'block';

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = 'Login successful!';
                messageDiv.style.color = 'green';
            } else {
                messageDiv.textContent = 'Login failed. Please try again.';
                messageDiv.style.color = 'red';
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again later.';
            messageDiv.style.color = 'red';
        } finally {
            // Hide loading spinner
            loginButton.disabled = false;
            loadingSpinner.style.display = 'none';
        }
    });
});
