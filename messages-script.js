// Messages Page Script

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

// Mock messages data
const mockMessages = [
    {
        id: 1,
        sender: 'Rajesh Kumar',
        message: 'Hey! How are you?',
        time: '10:30 AM',
        unread: true
    },
    {
        id: 2,
        sender: 'Dr. Priya Sharma',
        message: 'Please submit your assignment',
        time: 'Yesterday',
        unread: false
    }
];

// Load messages
function loadMessages() {
    console.log('Messages loaded');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', loadMessages);
