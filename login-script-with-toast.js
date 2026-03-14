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
    
    if (loginForm && registerForm) {
        loginForm.style.display = 'none';
        loginForm.classList.add('hidden');
        registerForm.style.display = 'block';
        registerForm.classList.remove('hidden');
    }
}

function showLogin() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && registerForm) {
        registerForm.style.display = 'none';
        registerForm.classList.add('hidden');
        loginForm.style.display = 'block';
        loginForm.classList.remove('hidden');
    }
}

// Role-based Fields
function handleRoleChange() {
    const role = document.getElementById('regRole').value;
    
    // Hide all role fields
    const roleFields = document.querySelectorAll('.role-fields');
    roleFields.forEach(field => {
        field.style.display = 'none';
        field.classList.add('hidden');
    });
    
    // Show selected role fields
    let targetField = null;
    if (role === 'student') {
        targetField = document.getElementById('studentFields');
    } else if (role === 'faculty') {
        targetField = document.getElementById('facultyFields');
    } else if (role === 'alumni') {
        targetField = document.getElementById('alumniFields');
    } else if (role === 'department') {
        targetField = document.getElementById('departmentFields');
    }
    
    if (targetField) {
        targetField.style.display = 'block';
        targetField.classList.remove('hidden');
    }
}

// Password Strength Checker
function checkPasswordStrength() {
    const password = document.getElementById('regPassword').value;
    const strengthBar = document.getElementById('passwordStrengthFill');
    const strengthText = document.getElementById('passwordStrengthText');
    
    // Requirements
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    // Update requirement indicators
    document.getElementById('req-length').classList.toggle('met', requirements.length);
    document.getElementById('req-uppercase').classList.toggle('met', requirements.uppercase);
    document.getElementById('req-lowercase').classList.toggle('met', requirements.lowercase);
    document.getElementById('req-number').classList.toggle('met', requirements.number);
    document.getElementById('req-special').classList.toggle('met', requirements.special);
    
    // Calculate strength
    const metCount = Object.values(requirements).filter(Boolean).length;
    let strength = 'weak';
    let strengthLabel = 'Weak';
    
    if (metCount === 5) {
        strength = 'strong';
        strengthLabel = '💪 Strong Password';
    } else if (metCount >= 4) {
        strength = 'good';
        strengthLabel = '👍 Good Password';
    } else if (metCount >= 3) {
        strength = 'fair';
        strengthLabel = '⚠️ Fair Password';
    } else {
        strength = 'weak';
        strengthLabel = '❌ Weak Password';
    }
    
    // Update UI
    strengthBar.className = 'password-strength-fill ' + strength;
    strengthText.className = 'password-strength-text ' + strength;
    strengthText.textContent = strengthLabel;
    
    return { strength, requirements, metCount };
}

// Login Handler
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    console.log('Login attempt:', email);
    
    // Check for admin credentials
    if (email === 'admin@jit.ac.in' && password === 'admin123') {
        console.log('Admin credentials matched!');
        
        const userData = {
            email: email,
            name: 'Admin User',
            role: 'admin',
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Redirecting to admin-new.html');
        
        showSuccessToast('Welcome Admin!', 'Redirecting to admin panel...', { duration: 2000 });
        
        setTimeout(() => {
            window.location.href = 'admin-new.html';
        }, 1000);
        return;
    }
    
    console.log('Checking registered users');
    
    // Check if user exists in registered users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
        console.log('Registered user found:', existingUser.name);
        
        // Store complete user data
        const userData = {
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
            branch: existingUser.branch,
            year: existingUser.year,
            usn: existingUser.usn,
            department: existingUser.department,
            designation: existingUser.designation,
            experience: existingUser.experience,
            batch: existingUser.batch,
            company: existingUser.company,
            deptName: existingUser.deptName,
            description: existingUser.description,
            isLoggedIn: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showSuccessToast('Welcome back!', `Logged in as ${existingUser.name}`, { duration: 2000 });
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        return;
    }
    
    console.log('No registered user found, using demo data');
    
    // Demo user login (for testing without registration)
    const userData = {
        email: email,
        name: 'Demo Student',
        role: 'student',
        branch: 'Computer Science',
        year: '3rd Year',
        usn: 'JIT20CS001',
        isLoggedIn: true
    };
    
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showSuccessToast('Welcome!', 'Logged in successfully', { duration: 2000 });
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Register Handler
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const role = document.getElementById('regRole').value;
    
    // Validate inputs
    if (!name || !email || !password || !role) {
        showErrorToast('Missing Information', 'Please fill in all required fields');
        return;
    }
    
    // Validate email domain
    if (!email.includes('@jit.ac.in') && !email.includes('@jyothyit.ac.in')) {
        showErrorToast('Invalid Email', 'Please use a valid JIT email address (@jit.ac.in or @jyothyit.ac.in)');
        return;
    }
    
    // Simple password validation - just minimum length
    if (password.length < 8) {
        showErrorToast('Weak Password', 'Password must be at least 8 characters long');
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showWarningToast('Account Exists', 'An account with this email already exists. Please login instead.');
        setTimeout(() => showLogin(), 2000);
        return;
    }
    
    let additionalData = {};
    
    // Collect role-specific data
    if (role === 'student') {
        const usn = document.getElementById('usn');
        const branch = document.getElementById('branch');
        const year = document.getElementById('year');
        
        additionalData = {
            usn: usn ? usn.value : '',
            branch: branch ? branch.value : '',
            year: year ? year.value : ''
        };
    } else if (role === 'faculty') {
        const department = document.getElementById('department');
        const designation = document.getElementById('designation');
        const experience = document.getElementById('experience');
        
        additionalData = {
            department: department ? department.value : '',
            designation: designation ? designation.value : '',
            experience: experience ? experience.value : ''
        };
    } else if (role === 'alumni') {
        const batch = document.getElementById('batch');
        const alumniBranch = document.getElementById('alumniBranch');
        const company = document.getElementById('company');
        const alumniDesignation = document.getElementById('alumniDesignation');
        
        additionalData = {
            batch: batch ? batch.value : '',
            branch: alumniBranch ? alumniBranch.value : '',
            company: company ? company.value : '',
            designation: alumniDesignation ? alumniDesignation.value : ''
        };
    } else if (role === 'department') {
        const deptName = document.getElementById('deptName');
        const deptDescription = document.getElementById('deptDescription');
        
        additionalData = {
            deptName: deptName ? deptName.value : '',
            description: deptDescription ? deptDescription.value : ''
        };
    }
    
    const userData = {
        name,
        email,
        password, // In production, this should be hashed
        role,
        ...additionalData,
        isLoggedIn: true,
        registeredAt: new Date().toISOString()
    };
    
    try {
        // Save to users list for future logins
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set as current user
        localStorage.setItem('userData', JSON.stringify(userData));
        
        showSuccessToast('Account Created!', 'Redirecting to dashboard...', { duration: 2000 });
        
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        console.error('Registration error:', error);
        showErrorToast('Registration Failed', 'Please try again later');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Login page loaded');
    
    // Ensure forms are in correct state
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.style.display = 'block';
        console.log('Login form initialized');
    }
    
    if (registerForm) {
        registerForm.style.display = 'none';
        console.log('Register form hidden');
    }
    
    // Check if already logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            if (user.isLoggedIn) {
                console.log('User already logged in, redirecting...');
                if (user.role === 'admin') {
                    window.location.href = 'admin-new.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            }
        } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('userData');
        }
    }
});

// Add event listeners for better UX
window.addEventListener('load', function() {
    // Add click handlers to links
    const signupLinks = document.querySelectorAll('a[onclick*="showRegister"]');
    signupLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showRegister();
        });
    });
    
    const loginLinks = document.querySelectorAll('a[onclick*="showLogin"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showLogin();
        });
    });
});
