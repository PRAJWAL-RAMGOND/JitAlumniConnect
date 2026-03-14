// Theme Management
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');

    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');

    if (savedTheme === 'dark') {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    }
});


// Form Switching
function showRegister() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
}

function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
}


// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('regPassword').value;

    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };

    const metCount = Object.values(requirements).filter(Boolean).length;

    return metCount;
}



//////////////////////////////////////////////////////////////////
// LOGIN HANDLER (CONNECTED TO BACKEND)
//////////////////////////////////////////////////////////////////

async function handleLogin(event) {

    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {

        const response = await fetch(
            "https://jitconnect-api.onrender.com/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        // Save token
        localStorage.setItem("token", data.token);

        // Save user data
        localStorage.setItem("userData", JSON.stringify(data.user));

        alert("Login successful");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error(error);
        alert("Server error");

    }

}



//////////////////////////////////////////////////////////////////
// REGISTER HANDLER (CONNECTED TO BACKEND)
//////////////////////////////////////////////////////////////////

async function handleRegister(event) {

    event.preventDefault();

    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;

    if (!name || !email || !password || !role) {
        alert("Fill all fields");
        return;
    }

    try {

        const response = await fetch(
            "https://jitconnect-api.onrender.com/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        alert("Account created. Please login.");

        showLogin();

    } catch (error) {

        console.error(error);
        alert("Server error");

    }

}



//////////////////////////////////////////////////////////////////
// PAGE LOAD
//////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {

    const userData = localStorage.getItem("userData");

    if (userData) {

        const user = JSON.parse(userData);

        if (user && user.email) {

            window.location.href = "dashboard.html";

        }

    }

});