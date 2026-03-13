// Profile Page Script

// Check authentication
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        console.log('No user data found, redirecting to login');
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const user = JSON.parse(userData);
        console.log('User data loaded:', user);
        return user;
    } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
        return null;
    }
}

const currentUser = checkAuth();

// Load user profile
function loadProfile() {
    if (!currentUser) {
        console.error('No current user found');
        return;
    }
    
    console.log('Loading profile for:', currentUser);
    
    // Set profile avatar
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        const firstLetter = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : '👤');
        avatar.textContent = firstLetter;
        console.log('Avatar set to:', firstLetter);
    } else {
        console.error('Avatar element not found');
    }
    
    // Set profile name
    const nameElement = document.getElementById('profileName');
    if (nameElement) {
        nameElement.textContent = currentUser.name || currentUser.email || 'User';
        console.log('Name set to:', nameElement.textContent);
    } else {
        console.error('Name element not found');
    }
    
    // Set profile role
    const roleElement = document.getElementById('profileRole');
    if (roleElement) {
        const roleText = currentUser.role ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 'Student';
        roleElement.textContent = roleText;
        console.log('Role set to:', roleText);
    } else {
        console.error('Role element not found');
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
        } else if (currentUser.role === 'admin') {
            details.push(`🔐 Administrator`);
            details.push(`🎯 Full Access`);
        }
        
        if (details.length === 0) {
            details.push('Complete your profile to add more details');
        }
        
        detailsElement.innerHTML = details.join(' • ');
        console.log('Details set:', details);
    } else {
        console.error('Details element not found');
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
    console.log('=== PROFILE PAGE DEBUG ===');
    console.log('Profile page loaded');
    
    // Check localStorage
    const userDataRaw = localStorage.getItem('userData');
    console.log('Raw userData from localStorage:', userDataRaw);
    
    if (userDataRaw) {
        try {
            const userData = JSON.parse(userDataRaw);
            console.log('Parsed userData:', userData);
            console.log('User name:', userData.name);
            console.log('User email:', userData.email);
            console.log('User role:', userData.role);
        } catch (error) {
            console.error('Error parsing userData:', error);
        }
    } else {
        console.error('No userData found in localStorage!');
    }
    
    // Check if elements exist
    console.log('profileAvatar element:', document.getElementById('profileAvatar'));
    console.log('profileName element:', document.getElementById('profileName'));
    console.log('profileRole element:', document.getElementById('profileRole'));
    console.log('profileDetails element:', document.getElementById('profileDetails'));
    console.log('userPostsContainer element:', document.getElementById('userPostsContainer'));
    
    console.log('=== END DEBUG ===');
    
    loadProfile();
});
