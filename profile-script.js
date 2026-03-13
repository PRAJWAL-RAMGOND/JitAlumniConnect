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
    
    console.log('Loading profile for:', currentUser);
    
    // Set profile avatar
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        avatar.textContent = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '👤';
    }
    
    // Set profile name
    const nameElement = document.getElementById('profileName');
    if (nameElement) {
        nameElement.textContent = currentUser.name || 'User';
    }
    
    // Set profile role
    const roleElement = document.getElementById('profileRole');
    if (roleElement) {
        const roleText = currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'Student';
        roleElement.textContent = roleText;
    }
    
    // Set profile details based on role
    const detailsElement = document.getElementById('profileDetails');
    if (detailsElement) {
        let details = [];
        
        if (currentUser.email) {
            details.push(`📧 ${currentUser.email}`);
        }
        
        if (currentUser.role === 'student') {
            if (currentUser.branch) details.push(`🎓 ${currentUser.branch}`);
            if (currentUser.year) details.push(`📅 ${currentUser.year}`);
            if (currentUser.usn) details.push(`🆔 ${currentUser.usn}`);
        } else if (currentUser.role === 'faculty') {
            if (currentUser.department) details.push(`🏢 ${currentUser.department}`);
            if (currentUser.designation) details.push(`💼 ${currentUser.designation}`);
            if (currentUser.experience) details.push(`⏱️ ${currentUser.experience} years`);
        } else if (currentUser.role === 'alumni') {
            if (currentUser.batch) details.push(`🎓 Batch ${currentUser.batch}`);
            if (currentUser.branch) details.push(`📚 ${currentUser.branch}`);
            if (currentUser.company) details.push(`🏢 ${currentUser.company}`);
            if (currentUser.designation) details.push(`💼 ${currentUser.designation}`);
        } else if (currentUser.role === 'department') {
            if (currentUser.deptName) details.push(`🏢 ${currentUser.deptName}`);
            if (currentUser.description) details.push(`📝 ${currentUser.description}`);
        }
        
        detailsElement.innerHTML = details.join(' • ');
    }
    
    // Load user's posts
    loadUserPosts();
}

// Load user's posts
function loadUserPosts() {
    const container = document.getElementById('userPostsContainer');
    if (!container) return;
    
    // Get all posts from localStorage
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    
    // Filter posts by current user
    const userPosts = allPosts.filter(post => 
        post.author === currentUser.name || 
        post.email === currentUser.email
    );
    
    if (userPosts.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: rgba(0, 0, 0, 0.5);">
                <div style="font-size: 48px; margin-bottom: 16px;">📝</div>
                <p>No posts yet. Start sharing your achievements!</p>
                <a href="dashboard.html" class="btn-primary" style="display: inline-block; margin-top: 16px; text-decoration: none;">
                    Create Your First Post
                </a>
            </div>
        `;
        return;
    }
    
    // Display user's posts
    container.innerHTML = userPosts.map(post => `
        <div class="post-card" style="margin-bottom: 20px;">
            <div class="post-header">
                <div class="avatar avatar-sm">${post.author.charAt(0)}</div>
                <div class="post-author-info">
                    <h4>${post.author}</h4>
                    <p class="post-meta">${post.timestamp}</p>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
            <div class="post-interactions">
                <span>❤️ ${post.likes || 0} likes</span>
                <span>💬 ${post.comments || 0} comments</span>
            </div>
        </div>
    `).join('');
}

// Edit profile function
function editProfile() {
    alert('Profile editing feature coming soon! For now, you can update your details by registering again.');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Profile page loaded');
    loadProfile();
});
