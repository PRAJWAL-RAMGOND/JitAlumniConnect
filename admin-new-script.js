// Mock Data
const mockUsers = [
    { id: 1, name: 'Rajesh Kumar', email: 'rajesh@jit.ac.in', role: 'student', branch: 'CSE', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Dr. Priya Sharma', email: 'priya@jit.ac.in', role: 'faculty', branch: 'ISE', status: 'active', joined: '2023-08-20' },
    { id: 3, name: 'Arun Patel', email: 'arun@alumni.jit.ac.in', role: 'alumni', branch: 'CSE', status: 'active', joined: '2023-12-10' },
    { id: 4, name: 'Sneha Reddy', email: 'sneha@jit.ac.in', role: 'student', branch: 'ECE', status: 'pending', joined: '2024-03-01' },
    { id: 5, name: 'Karthik Menon', email: 'karthik@jit.ac.in', role: 'student', branch: 'CSE', status: 'pending', joined: '2024-03-05' },
    { id: 6, name: 'Divya Iyer', email: 'divya@jit.ac.in', role: 'student', branch: 'ISE', status: 'suspended', joined: '2024-02-14' },
    { id: 7, name: 'Vikram Singh', email: 'vikram@jit.ac.in', role: 'student', branch: 'CSE', status: 'active', joined: '2024-01-20' },
    { id: 8, name: 'CSE Department', email: 'cse@jit.ac.in', role: 'department', branch: 'CSE', status: 'active', joined: '2023-06-01' },
];

const mockActivity = [
    { icon: '👤', text: 'New user registration: Karthik Menon', time: '5 minutes ago', type: 'user' },
    { icon: '📝', text: 'New post published by Divya Iyer', time: '15 minutes ago', type: 'post' },
    { icon: '💼', text: 'New job posted: Software Engineer at Google', time: '1 hour ago', type: 'job' },
    { icon: '⚠️', text: 'Content reported by Rajesh Kumar', time: '2 hours ago', type: 'report' },
    { icon: '✅', text: 'User approved: Vikram Singh', time: '3 hours ago', type: 'approval' },
    { icon: '🚫', text: 'User suspended: Divya Iyer', time: '4 hours ago', type: 'moderation' },
];

const mockAnnouncements = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
    loadUsers();
    loadAnnouncements();
});

// Show Section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');
    
    // Load section-specific data
    switch(sectionName) {
        case 'users':
            loadUsers();
            break;
        case 'posts':
            loadPosts();
            break;
        case 'reports':
            loadReports();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
    }
}

// Load Dashboard
function loadDashboard() {
    // Update stats
    document.getElementById('totalUsers').textContent = mockUsers.length;
    document.getElementById('totalPosts').textContent = '45';
    document.getElementById('pendingReports').textContent = '3';
    
    // Load recent activity
    const activityContainer = document.getElementById('recentActivity');
    if (activityContainer) {
        activityContainer.innerHTML = mockActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-icon-small">${activity.icon}</div>
                <div class="activity-details">
                    <p>${activity.text}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            </div>
        `).join('');
    }
}

// Refresh Dashboard
function refreshDashboard() {
    loadDashboard();
    showNotification('Dashboard refreshed!', 'success');
}

// Load Users
function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    const userCount = document.getElementById('userCount');
    if (userCount) {
        userCount.textContent = `${mockUsers.length} users`;
    }
    
    tbody.innerHTML = mockUsers.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" data-user-id="${user.id}"></td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${user.name.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600;">${user.name}</div>
                        <div style="font-size: 12px; color: #64748b;">${user.role}</div>
                    </div>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td>${user.branch}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>${user.joined}</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    ${user.status === 'pending' ? 
                        `<button class="action-btn approve" onclick="approveUser(${user.id})" title="Approve">✓</button>` : 
                        ''
                    }
                    ${user.status !== 'banned' ? 
                        `<button class="action-btn ban" onclick="banUser(${user.id})" title="Ban">🚫</button>` : 
                        ''
                    }
                    ${user.status === 'active' ? 
                        `<button class="action-btn suspend" onclick="suspendUser(${user.id})" title="Suspend">⏸️</button>` : 
                        ''
                    }
                    <button class="action-btn flag" onclick="flagUser(${user.id})" title="Flag">🚩</button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// User Actions
function approveUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (confirm(`✅ Approve user: ${user.name}?`)) {
        user.status = 'active';
        loadUsers();
        showNotification(`User ${user.name} approved successfully!`, 'success');
    }
}

function banUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    const reason = prompt(`🚫 Ban user: ${user.name}\n\nEnter reason for ban:`);
    if (reason) {
        user.status = 'banned';
        loadUsers();
        showNotification(`User ${user.name} has been banned. Reason: ${reason}`, 'error');
    }
}

function suspendUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    const duration = prompt(`⏸️ Suspend user: ${user.name}\n\nEnter suspension duration (e.g., "7 days", "1 month"):`);
    if (duration) {
        user.status = 'suspended';
        loadUsers();
        showNotification(`User ${user.name} suspended for ${duration}`, 'warning');
    }
}

function flagUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    const reason = prompt(`🚩 Flag user: ${user.name}\n\nEnter reason for flagging:`);
    if (reason) {
        showNotification(`User ${user.name} flagged for review. Reason: ${reason}`, 'warning');
    }
}

function deleteUser(userId) {
    const user = mockUsers.find(u => u.id === userId);
    if (confirm(`🗑️ Delete user: ${user.name}?\n\n⚠️ This action cannot be undone!`)) {
        const index = mockUsers.findIndex(u => u.id === userId);
        mockUsers.splice(index, 1);
        loadUsers();
        showNotification(`User ${user.name} deleted permanently`, 'error');
    }
}

// Search Users
function searchUsers() {
    const query = document.getElementById('userSearch').value.toLowerCase();
    const filtered = mockUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
    displayFilteredUsers(filtered);
}

// Filter Users
function filterUsers() {
    const roleFilter = document.getElementById('userRoleFilter').value;
    const statusFilter = document.getElementById('userStatusFilter').value;
    
    let filtered = mockUsers;
    
    if (roleFilter !== 'all') {
        filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    if (statusFilter !== 'all') {
        filtered = filtered.filter(user => user.status === statusFilter);
    }
    
    displayFilteredUsers(filtered);
}

function displayFilteredUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    const userCount = document.getElementById('userCount');
    
    if (userCount) {
        userCount.textContent = `${users.length} users`;
    }
    
    // Use same rendering logic as loadUsers but with filtered data
    tbody.innerHTML = users.map(user => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" data-user-id="${user.id}"></td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700;">
                        ${user.name.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600;">${user.name}</div>
                        <div style="font-size: 12px; color: #64748b;">${user.role}</div>
                    </div>
                </div>
            </td>
            <td>${user.email}</td>
            <td><span class="role-badge ${user.role}">${user.role}</span></td>
            <td>${user.branch}</td>
            <td><span class="status-badge ${user.status}">${user.status}</span></td>
            <td>${user.joined}</td>
            <td>
                <div style="display: flex; gap: 8px;">
                    ${user.status === 'pending' ? 
                        `<button class="action-btn approve" onclick="approveUser(${user.id})" title="Approve">✓</button>` : 
                        ''
                    }
                    ${user.status !== 'banned' ? 
                        `<button class="action-btn ban" onclick="banUser(${user.id})" title="Ban">🚫</button>` : 
                        ''
                    }
                    ${user.status === 'active' ? 
                        `<button class="action-btn suspend" onclick="suspendUser(${user.id})" title="Suspend">⏸️</button>` : 
                        ''
                    }
                    <button class="action-btn flag" onclick="flagUser(${user.id})" title="Flag">🚩</button>
                    <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete">🗑️</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Announcements
function showAnnouncementModal() {
    const form = document.getElementById('announcementForm');
    if (form) {
        form.style.display = 'block';
    }
}

function hideAnnouncementForm() {
    const form = document.getElementById('announcementForm');
    if (form) {
        form.style.display = 'none';
    }
}

function postAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const message = document.getElementById('announcementMessage').value;
    const target = document.getElementById('announcementTarget').value;
    const priority = document.getElementById('announcementPriority').value;
    
    if (!title || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    const announcement = {
        id: Date.now(),
        title,
        message,
        target,
        priority,
        author: 'Admin',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    mockAnnouncements.unshift(announcement);
    
    // Clear form
    document.getElementById('announcementTitle').value = '';
    document.getElementById('announcementMessage').value = '';
    hideAnnouncementForm();
    
    loadAnnouncements();
    showNotification('📢 Announcement posted successfully!', 'success');
}

function loadAnnouncements() {
    const container = document.getElementById('announcementsList');
    if (!container) return;
    
    if (mockAnnouncements.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #64748b;">
                <div style="font-size: 48px; margin-bottom: 16px;">📢</div>
                <h3 style="margin-bottom: 8px;">No announcements yet</h3>
                <p>Click "Create Announcement" to post your first announcement</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = mockAnnouncements.map(ann => `
        <div class="announcement-card ${ann.priority}">
            <div class="announcement-header">
                <div>
                    <h3>${ann.title}</h3>
                    <div class="announcement-meta">
                        <span>👤 ${ann.author}</span>
                        <span>📅 ${ann.date} ${ann.time}</span>
                        <span>🎯 ${ann.target}</span>
                        <span class="priority-badge ${ann.priority}">${ann.priority}</span>
                    </div>
                </div>
                <button class="action-btn delete" onclick="deleteAnnouncement(${ann.id})">🗑️</button>
            </div>
            <p class="announcement-message">${ann.message}</p>
        </div>
    `).join('');
}

function deleteAnnouncement(id) {
    if (confirm('Delete this announcement?')) {
        const index = mockAnnouncements.findIndex(a => a.id === id);
        mockAnnouncements.splice(index, 1);
        loadAnnouncements();
        showNotification('Announcement deleted', 'success');
    }
}

// Load Posts
function loadPosts() {
    const container = document.getElementById('postsModeration');
    if (!container) return;
    
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    if (savedPosts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #64748b;">
                <p>No posts to moderate</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = savedPosts.map(post => `
        <div class="post-moderation-card">
            <div class="post-mod-header">
                <div>
                    <h4>${post.author}</h4>
                    <span class="post-time">${post.timestamp}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="action-btn approve" onclick="approvePost(${post.id})">✓</button>
                    <button class="action-btn flag" onclick="flagPost(${post.id})">🚩</button>
                    <button class="action-btn delete" onclick="deletePost(${post.id})">🗑️</button>
                </div>
            </div>
            <p>${post.content}</p>
        </div>
    `).join('');
}

function approvePost(postId) {
    showNotification('Post approved', 'success');
}

function flagPost(postId) {
    const reason = prompt('Enter reason for flagging:');
    if (reason) {
        showNotification(`Post flagged: ${reason}`, 'warning');
    }
}

function deletePost(postId) {
    if (confirm('Delete this post?')) {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        const filtered = posts.filter(p => p.id !== postId);
        localStorage.setItem('posts', JSON.stringify(filtered));
        loadPosts();
        showNotification('Post deleted', 'error');
    }
}

// Load Reports
function loadReports() {
    const container = document.getElementById('reportsContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="report-card urgent">
            <div class="report-header">
                <span class="report-badge urgent">URGENT</span>
                <span class="report-time">2 hours ago</span>
            </div>
            <h4>Inappropriate Content</h4>
            <p>Reported by: Rajesh Kumar</p>
            <p>Reason: Offensive language in post</p>
            <div class="report-actions">
                <button class="btn-secondary" onclick="viewReportedContent(1)">View Content</button>
                <button class="btn-primary" onclick="resolveReport(1)">Resolve</button>
                <button class="action-btn delete" onclick="deleteReportedContent(1)">Delete Content</button>
            </div>
        </div>
        <div class="report-card warning">
            <div class="report-header">
                <span class="report-badge warning">WARNING</span>
                <span class="report-time">5 hours ago</span>
            </div>
            <h4>Spam Post</h4>
            <p>Reported by: Priya Sharma</p>
            <p>Reason: Repeated promotional content</p>
            <div class="report-actions">
                <button class="btn-secondary" onclick="viewReportedContent(2)">View Content</button>
                <button class="btn-primary" onclick="resolveReport(2)">Resolve</button>
                <button class="action-btn delete" onclick="deleteReportedContent(2)">Delete Content</button>
            </div>
        </div>
    `;
}

function resolveReport(reportId) {
    if (confirm('Mark this report as resolved?')) {
        showNotification('Report resolved', 'success');
        loadReports();
    }
}

function deleteReportedContent(reportId) {
    if (confirm('Delete the reported content?\n\n⚠️ This action cannot be undone!')) {
        showNotification('Content deleted', 'error');
        loadReports();
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Simple alert for now - can be enhanced with toast notifications
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
    alert(`${icon} ${message}`);
}

function showNotifications() {
    alert('🔔 Notifications\n\n• 3 new reports\n• 5 pending users\n• 2 flagged posts');
}

function showQuickActions() {
    alert('⚡ Quick Actions\n\n• Post Announcement\n• Approve Users\n• Review Reports');
}

function showAdminProfile() {
    alert('👤 Admin Profile\n\nName: Admin User\nEmail: admin@jit.ac.in\nRole: Administrator');
}

function globalSearch() {
    const query = document.getElementById('globalSearch').value;
    if (query.length > 2) {
        console.log('Searching for:', query);
    }
}

function selectAllUsers(checkbox) {
    const checkboxes = document.querySelectorAll('.user-checkbox');
    checkboxes.forEach(cb => cb.checked = checkbox.checked);
}

function exportUsers() {
    showNotification('User data exported successfully!', 'success');
}

function showAddUserModal() {
    alert('➕ Add User\n\nThis would open a form to add new users manually.');
}

function autoModerate() {
    showNotification('🤖 Auto-moderation started...', 'info');
}

function markAllResolved() {
    if (confirm('Mark all reports as resolved?')) {
        showNotification('All reports marked as resolved', 'success');
    }
}

function showAddJobModal() {
    alert('➕ Post New Job\n\nThis would open a form to create job postings.');
}

function filterPosts(filter) {
    console.log('Filtering posts by:', filter);
    // Update active filter chip
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Admin Logout
function adminLogout() {
    if (confirm('🚪 Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('userActionModal');
    if (modal) {
        modal.style.display = 'none';
    }
}


// Analytics Data
const analyticsData = {
    userGrowth: [120, 145, 167, 189, 210, 234, 267],
    engagement: [78, 82, 85, 83, 87, 89, 91],
    jobs: [23, 34, 45, 56, 67, 78, 89],
    connections: [456, 567, 678, 789, 890, 1001, 1123]
};

// Activity Logs Data
const activityLogs = [
    {
        id: 1,
        type: 'user',
        icon: '👤',
        title: 'New User Registration',
        description: 'Karthik Menon registered as a student',
        time: '2 minutes ago',
        user: 'Karthik Menon',
        action: 'Registration',
        status: 'success'
    },
    {
        id: 2,
        type: 'post',
        icon: '📝',
        title: 'New Post Published',
        description: 'Divya Iyer published "Campus Placement Drive 2024"',
        time: '15 minutes ago',
        user: 'Divya Iyer',
        action: 'Post Created',
        status: 'success'
    },
    {
        id: 3,
        type: 'job',
        icon: '💼',
        title: 'Job Posted',
        description: 'New job listing: Software Engineer at Google',
        time: '1 hour ago',
        user: 'Admin',
        action: 'Job Posted',
        status: 'success'
    },
    {
        id: 4,
        type: 'report',
        icon: '⚠️',
        title: 'Content Reported',
        description: 'Rajesh Kumar reported inappropriate content',
        time: '2 hours ago',
        user: 'Rajesh Kumar',
        action: 'Report Submitted',
        status: 'warning'
    },
    {
        id: 5,
        type: 'admin',
        icon: '🛡️',
        title: 'User Suspended',
        description: 'Admin suspended user account: Divya Iyer',
        time: '3 hours ago',
        user: 'Admin',
        action: 'User Suspended',
        status: 'warning'
    },
    {
        id: 6,
        type: 'user',
        icon: '✅',
        title: 'User Approved',
        description: 'Sneha Reddy account approved by admin',
        time: '4 hours ago',
        user: 'Admin',
        action: 'User Approved',
        status: 'success'
    },
    {
        id: 7,
        type: 'post',
        icon: '🗑️',
        title: 'Post Deleted',
        description: 'Admin deleted flagged post by user',
        time: '5 hours ago',
        user: 'Admin',
        action: 'Post Deleted',
        status: 'error'
    },
    {
        id: 8,
        type: 'job',
        icon: '📋',
        title: 'Job Application',
        description: 'Vikram Singh applied for Software Engineer position',
        time: '6 hours ago',
        user: 'Vikram Singh',
        action: 'Job Application',
        status: 'info'
    },
    {
        id: 9,
        type: 'user',
        icon: '🔗',
        title: 'New Connection',
        description: 'Rajesh Kumar connected with Arun Patel',
        time: '7 hours ago',
        user: 'Rajesh Kumar',
        action: 'Connection Made',
        status: 'success'
    },
    {
        id: 10,
        type: 'admin',
        icon: '📢',
        title: 'Announcement Posted',
        description: 'Admin posted announcement: Tech Fest 2024',
        time: '8 hours ago',
        user: 'Admin',
        action: 'Announcement',
        status: 'info'
    },
    {
        id: 11,
        type: 'report',
        icon: '✓',
        title: 'Report Resolved',
        description: 'Admin resolved spam report',
        time: '9 hours ago',
        user: 'Admin',
        action: 'Report Resolved',
        status: 'success'
    },
    {
        id: 12,
        type: 'user',
        icon: '🚫',
        title: 'User Banned',
        description: 'Admin banned user for policy violation',
        time: '10 hours ago',
        user: 'Admin',
        action: 'User Banned',
        status: 'error'
    }
];

// Load Analytics
function loadAnalytics() {
    // Draw sparklines
    drawSparkline('usersSparkline', analyticsData.userGrowth, '#3b82f6');
    drawSparkline('engagementSparkline', analyticsData.engagement, '#10b981');
    drawSparkline('jobsSparkline', analyticsData.jobs, '#f59e0b');
    drawSparkline('connectionsSparkline', analyticsData.connections, '#8b5cf6');
    
    // Draw main charts
    drawUserGrowthChart();
    drawActivityChart();
    drawBranchChart();
    
    // Animate real-time numbers
    animateNumber('activeNow', 234);
    animateNumber('postsToday', 45);
    animateNumber('applicationsToday', 67);
    animateNumber('connectionsToday', 123);
}

// Draw Sparkline
function drawSparkline(canvasId, data, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.clearRect(0, 0, width, height);
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

// Draw User Growth Chart
function drawUserGrowthChart() {
    const canvas = document.getElementById('userGrowthChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        students: [45, 52, 61, 68, 75, 82, 90],
        faculty: [12, 14, 15, 16, 18, 19, 20],
        alumni: [23, 27, 31, 35, 39, 43, 47]
    };
    
    drawBarChart(ctx, canvas.width, canvas.height, data);
}

// Draw Activity Chart
function drawActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [234, 345, 456, 567, 678, 789, 890]
    };
    
    drawLineChart(ctx, canvas.width, canvas.height, data);
}

// Draw Branch Chart
function drawBranchChart() {
    const canvas = document.getElementById('branchChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const data = {
        labels: ['CSE', 'ISE', 'ECE', 'ME', 'Civil'],
        values: [450, 320, 280, 150, 120],
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444']
    };
    
    drawDoughnutChart(ctx, canvas.width, canvas.height, data);
}

// Simple Bar Chart
function drawBarChart(ctx, width, height, data) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.labels.length / 4;
    const gap = 10;
    
    const maxValue = Math.max(...data.students, ...data.faculty, ...data.alumni);
    
    // Draw bars
    data.labels.forEach((label, i) => {
        const x = padding + (i * chartWidth / data.labels.length);
        
        // Students
        const h1 = (data.students[i] / maxValue) * chartHeight;
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(x, padding + chartHeight - h1, barWidth, h1);
        
        // Faculty
        const h2 = (data.faculty[i] / maxValue) * chartHeight;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + barWidth + gap, padding + chartHeight - h2, barWidth, h2);
        
        // Alumni
        const h3 = (data.alumni[i] / maxValue) * chartHeight;
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(x + (barWidth + gap) * 2, padding + chartHeight - h3, barWidth, h3);
        
        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + barWidth * 1.5, height - 10);
    });
}

// Simple Line Chart
function drawLineChart(ctx, width, height, data) {
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxValue = Math.max(...data.values);
    
    // Draw line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.values.forEach((value, i) => {
        const x = padding + (i / (data.values.length - 1)) * chartWidth;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points
    data.values.forEach((value, i) => {
        const x = padding + (i / (data.values.length - 1)) * chartWidth;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Label
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(data.labels[i], x, height - 10);
    });
}

// Simple Doughnut Chart
function drawDoughnutChart(ctx, width, height, data) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const innerRadius = radius * 0.6;
    
    const total = data.values.reduce((a, b) => a + b, 0);
    let currentAngle = -Math.PI / 2;
    
    data.values.forEach((value, i) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        ctx.fillStyle = data.colors[i];
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
        ctx.closePath();
        ctx.fill();
        
        // Label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 30);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 30);
        
        ctx.fillStyle = '#0f172a';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(data.labels[i], labelX, labelY);
        ctx.fillText(value, labelX, labelY + 16);
        
        currentAngle += sliceAngle;
    });
}

// Animate Number
function animateNumber(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
}

// Update Analytics
function updateAnalytics() {
    const timeRange = document.getElementById('analyticsTimeRange').value;
    console.log('Updating analytics for:', timeRange);
    showNotification('Analytics updated for ' + timeRange, 'success');
}

// Export Analytics
function exportAnalytics() {
    showNotification('Analytics report exported successfully!', 'success');
}

// Load Activity Logs
function loadLogs() {
    const container = document.getElementById('logsTimeline');
    if (!container) return;
    
    container.innerHTML = activityLogs.map(log => `
        <div class="log-entry ${log.type}">
            <div class="log-header">
                <div class="log-title">
                    <span class="log-icon">${log.icon}</span>
                    <span>${log.title}</span>
                </div>
                <span class="log-time">${log.time}</span>
            </div>
            <div class="log-description">${log.description}</div>
            <div class="log-meta">
                <span>👤 ${log.user}</span>
                <span>⚡ ${log.action}</span>
                <span class="log-badge ${log.status}">${log.status}</span>
            </div>
        </div>
    `).join('');
}

// Filter Logs
function filterLogs() {
    const typeFilter = document.getElementById('logTypeFilter').value;
    const dateFilter = document.getElementById('logDateFilter').value;
    
    console.log('Filtering logs:', typeFilter, dateFilter);
    
    let filtered = activityLogs;
    
    if (typeFilter !== 'all') {
        filtered = filtered.filter(log => log.type === typeFilter);
    }
    
    const container = document.getElementById('logsTimeline');
    if (!container) return;
    
    container.innerHTML = filtered.map(log => `
        <div class="log-entry ${log.type}">
            <div class="log-header">
                <div class="log-title">
                    <span class="log-icon">${log.icon}</span>
                    <span>${log.title}</span>
                </div>
                <span class="log-time">${log.time}</span>
            </div>
            <div class="log-description">${log.description}</div>
            <div class="log-meta">
                <span>👤 ${log.user}</span>
                <span>⚡ ${log.action}</span>
                <span class="log-badge ${log.status}">${log.status}</span>
            </div>
        </div>
    `).join('');
}

// Export Logs
function exportLogs() {
    showNotification('Activity logs exported successfully!', 'success');
}

// Update showSection to load analytics and logs
const originalShowSection = showSection;
showSection = function(sectionName) {
    originalShowSection.call(this, sectionName);
    
    if (sectionName === 'analytics') {
        setTimeout(loadAnalytics, 100);
    } else if (sectionName === 'logs') {
        loadLogs();
    }
};
