// Check Admin Authentication
function checkAdminAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        alert('Please login to access Admin Panel');
        window.location.href = 'login.html';
        return null;
    }
    
    const user = JSON.parse(userData);
    
    // Check if user has admin role
    if (user.role !== 'admin') {
        alert('Access Denied!\n\nAdmin privileges required to access this page.');
        window.location.href = 'dashboard.html';
        return null;
    }
    
    return user;
}

const currentAdmin = checkAdminAuth();

// Mock Data
const mockUsers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@jit.ac.in', role: 'student', branch: 'CSE', status: 'active' },
    { id: 2, name: 'Dr. Priya Sharma', email: 'priya@jit.ac.in', role: 'faculty', branch: 'ISE', status: 'active' },
    { id: 3, name: 'Arun Patel', email: 'arun@alumni.jit.ac.in', role: 'alumni', branch: 'CSE', status: 'active' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@jit.ac.in', role: 'student', branch: 'ECE', status: 'pending' },
    { id: 5, name: 'CSE Department', email: 'cse@jit.ac.in', role: 'department', branch: 'CSE', status: 'active' },
];

const mockActivity = [
    { icon: '👤', text: 'New user registration: Karthik Menon', time: '5 minutes ago' },
    { icon: '📝', text: 'New post published by Divya Iyer', time: '15 minutes ago' },
    { icon: '💼', text: 'New job posted: Software Engineer at Google', time: '1 hour ago' },
    { icon: '⚠️', text: 'Content reported by user', time: '2 hours ago' },
    { icon: '✅', text: 'User approved: Vikram Singh', time: '3 hours ago' },
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadUsers();
    loadPosts();
    loadJobs();
    loadReports();
});

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Update active menu item
    document.querySelectorAll('.admin-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Load Dashboard
function loadDashboard() {
    // Update stats
    document.getElementById('totalUsers').textContent = mockUsers.length;
    document.getElementById('totalPosts').textContent = '45';
    document.getElementById('totalJobs').textContent = '10';
    document.getElementById('pendingReports').textContent = '3';
    
    // Load recent activity
    const activityContainer = document.getElementById('recentActivity');
    activityContainer.innerHTML = mockActivity.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

// Load Users
function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = mockUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td>${user.branch}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <div class="table-actions">
                    ${user.status === 'pending' ? 
                        `<button class="table-action-btn approve" onclick="approveUser(${user.id})">Approve</button>` : 
                        `<button class="table-action-btn edit" onclick="editUser(${user.id})">Edit</button>`
                    }
                    <button class="table-action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Search Users
function searchUsers() {
    const query = document.getElementById('userSearch').value.toLowerCase();
    const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td>${user.branch}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <div class="table-actions">
                    ${user.status === 'pending' ? 
                        `<button class="table-action-btn approve" onclick="approveUser(${user.id})">Approve</button>` : 
                        `<button class="table-action-btn edit" onclick="editUser(${user.id})">Edit</button>`
                    }
                    <button class="table-action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter Users
function filterUsers() {
    const role = document.getElementById('userRoleFilter').value;
    const filtered = role === 'all' ? mockUsers : mockUsers.filter(user => user.role === role);
    
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td>${user.branch}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>
                <div class="table-actions">
                    ${user.status === 'pending' ? 
                        `<button class="table-action-btn approve" onclick="approveUser(${user.id})">Approve</button>` : 
                        `<button class="table-action-btn edit" onclick="editUser(${user.id})">Edit</button>`
                    }
                    <button class="table-action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// User Actions
function approveUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (confirm(`Approve user: ${user.name}?`)) {
        user.status = 'active';
        loadUsers();
        alert('User approved successfully!');
    }
}

function editUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    alert(`Edit user: ${user.name}\n\nThis would open an edit modal in production.`);
}

function deleteUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (confirm(`Delete user: ${user.name}?\n\nThis action cannot be undone.`)) {
        const index = mockUsers.findIndex(u => u.id === userId);
        mockUsers.splice(index, 1);
        loadUsers();
        alert('User deleted successfully!');
    }
}

function showAddUserModal() {
    alert('Add User Modal\n\nThis would open a form to add new users in production.');
}

// Load Posts
function loadPosts() {
    const container = document.getElementById('postsContainer');
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    if (savedPosts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #6b7280;">
                <p>No posts to moderate</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = savedPosts.map(post => `
        <div class="admin-card" style="margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                <div>
                    <h4 style="margin: 0 0 4px 0;">${post.author}</h4>
                    <p style="margin: 0; font-size: 12px; color: #6b7280;">${post.timestamp}</p>
                </div>
                <div class="table-actions">
                    <button class="table-action-btn approve" onclick="approvePost(${post.id})">Approve</button>
                    <button class="table-action-btn delete" onclick="deletePost(${post.id})">Delete</button>
                </div>
            </div>
            <p style="color: #4b5563; margin: 0;">${post.content}</p>
        </div>
    `).join('');
}

function searchPosts() {
    alert('Search posts functionality');
}

function filterPosts() {
    alert('Filter posts functionality');
}

function approvePost(postId) {
    alert(`Post ${postId} approved!`);
}

function deletePost(postId) {
    if (confirm('Delete this post?')) {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const filtered = posts.filter(p => p.id !== postId);
        localStorage.setItem('posts', JSON.stringify(filtered));
        loadPosts();
        alert('Post deleted!');
    }
}

// Load Jobs
function loadJobs() {
    const container = document.getElementById('jobsManagementContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <p style="color: #6b7280; margin-bottom: 20px;">10 active job postings</p>
            <button class="btn-primary" onclick="showAddJobModal()">Post New Job</button>
        </div>
    `;
}

function showAddJobModal() {
    alert('Add Job Modal\n\nThis would open a form to post new jobs in production.');
}

// Load Reports
function loadReports() {
    const container = document.getElementById('reportsContainer');
    container.innerHTML = `
        <div class="activity-item" style="border-left-color: #ef4444;">
            <div class="activity-icon" style="background: #ef4444;">⚠️</div>
            <div class="activity-content">
                <p>Inappropriate content reported by Rajesh Kumar</p>
                <span class="activity-time">2 hours ago</span>
            </div>
            <div class="table-actions">
                <button class="table-action-btn approve" onclick="resolveReport(1)">Resolve</button>
                <button class="table-action-btn delete" onclick="deleteReportedContent(1)">Delete Content</button>
            </div>
        </div>
        <div class="activity-item" style="border-left-color: #f59e0b;">
            <div class="activity-icon" style="background: #f59e0b;">⚠️</div>
            <div class="activity-content">
                <p>Spam post reported by Priya Sharma</p>
                <span class="activity-time">5 hours ago</span>
            </div>
            <div class="table-actions">
                <button class="table-action-btn approve" onclick="resolveReport(2)">Resolve</button>
                <button class="table-action-btn delete" onclick="deleteReportedContent(2)">Delete Content</button>
            </div>
        </div>
        <div class="activity-item" style="border-left-color: #10b981;">
            <div class="activity-icon" style="background: #10b981;">✅</div>
            <div class="activity-content">
                <p>Report resolved: False alarm</p>
                <span class="activity-time">1 day ago</span>
            </div>
        </div>
    `;
}

function resolveReport(reportId) {
    if (confirm('Mark this report as resolved?')) {
        alert('Report resolved!');
        loadReports();
    }
}

function deleteReportedContent(reportId) {
    if (confirm('Delete the reported content?\n\nThis action cannot be undone.')) {
        alert('Content deleted!');
        loadReports();
    }
}

// Admin Logout
function adminLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}
