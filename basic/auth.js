document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Handle Signup Form
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            // Get the selected role from the radio buttons
            const role = document.querySelector('input[name="role"]:checked').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            if (users.find(user => user.username === username)) {
                alert('Username already exists!');
                return;
            }

            // Save the user with their role
            users.push({ username, password, role });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Account created successfully! Please log in.');
            window.location.href = 'login.html';
        });
    }

    // Handle Login Form
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', user.username);
                
                switch (user.role) {
                    case 'donor':
                        window.location.href = 'index.html';
                        break;
                    case 'volunteer':
                        window.location.href = 'index.html';
                        break;
                    case 'recipient':
                        window.location.href = 'index.html';
                        break;
                    default:
                        window.location.href = 'index.html'; // Fallback to homepage
                }
            } else {
                alert('Invalid username or password.');
            }
        });
    }
});