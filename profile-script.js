// Profile Page Script

// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        window.location.href = 'login.html';
        return null;
    }
    return JSON.parse(userData);
}

const currentUser = checkAuth();

// Load user profile
function loadProfile() {
    if (!currentUser) return;
    
    document.getElementById('userName').textContent = currentUser.name || 'User';
    document.getElementById('userEmail').textContent = currentUser.email || '';
    document.getElementById('userRole').textContent = currentUser.role || 'Student';
    
    if (currentUser.branch) {
        document.getElementById('userBranch').textContent = currentUser.branch;
    }
    
    if (currentUser.year) {
        document.getElementById('userYear').textContent = currentUser.year;
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadProfile);
