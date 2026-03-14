// Profile Page Script - Fixed Version

// Check authentication with better error handling
function checkAuth() {
    console.log('=== CHECKING AUTHENTICATION ===');
    
    const userData = localStorage.getItem('userData');
    console.log('Raw userData:', userData);
    
    if (!userData) {
        console.log('No user data found, redirecting to login');
        window.location.href = 'login.html';
        return null;
    }
    
    try {
        const user = JSON.parse(userData);
        console.log('Parsed user data:', user);
        
        // Check if user has required fields
        if (!user.email && !user.name) {
            console.error('User data is invalid (missing email and name)');
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
            return null;
        }
        
        // Ensure isLoggedIn is true
        if (user.isLoggedIn === false) {
            console.log('User is not logged in');
            window.location.href = 'login.html';
            return null;
        }
        
        console.log('User authenticated successfully:', user.name || user.email);
        return user;
    } catch (error) {
        console.error('Error parsing user data:', error);
        console.error('Invalid userData string:', userData);
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
        return null;
    }
}

// Global variable for current user
let currentUser = null;

// Load user profile
function loadProfile() {
    console.log('=== LOADING PROFILE ===');
    
    if (!currentUser) {
        console.error('No current user found');
        return;
    }
    
    console.log('Loading profile for:', currentUser);
    
    // Set profile avatar
    const avatar = document.getElementById('profileAvatar');
    if (avatar) {
        const firstLetter = currentUser.name ? 
            currentUser.name.charAt(0).toUpperCase() : 
            (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : '👤');
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
        const roleText = currentUser.role ? 
            currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1) : 
            'Student';
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
    
    console.log('=== PROFILE LOADED SUCCESSFULLY ===');
}

// Load user's posts
function loadUserPosts() {
    const container = document.getElementById('userPostsContainer');
    if (!container) {
        console.error('userPostsContainer not found');
        return;
    }
    
    // Get all posts from localStorage
    const allPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    console.log('Total posts in system:', allPosts.length);
    
    // Filter posts by current user
    const userPosts = allPosts.filter(post => 
        post.author === currentUser.name || 
        post.email === currentUser.email
    );
    
    console.log('User posts found:', userPosts.length);
    
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
    console.log('Opening edit profile modal');
    
    const modal = document.getElementById('editProfileModal');
    if (!modal) {
        console.error('Edit profile modal not found');
        alert('Edit profile feature is not available');
        return;
    }
    
    // Populate form with current user data
    document.getElementById('editName').value = currentUser.name || '';
    document.getElementById('editEmail').value = currentUser.email || '';
    
    // Show role-specific fields
    const roleFields = document.querySelectorAll('.edit-role-fields');
    roleFields.forEach(field => field.style.display = 'none');
    
    if (currentUser.role === 'student') {
        const studentFields = document.getElementById('editStudentFields');
        if (studentFields) {
            studentFields.style.display = 'block';
            if (document.getElementById('editBranch')) 
                document.getElementById('editBranch').value = currentUser.branch || '';
            if (document.getElementById('editYear')) 
                document.getElementById('editYear').value = currentUser.year || '';
            if (document.getElementById('editUsn')) 
                document.getElementById('editUsn').value = currentUser.usn || '';
        }
    } else if (currentUser.role === 'faculty') {
        const facultyFields = document.getElementById('editFacultyFields');
        if (facultyFields) {
            facultyFields.style.display = 'block';
            if (document.getElementById('editDepartment')) 
                document.getElementById('editDepartment').value = currentUser.department || '';
            if (document.getElementById('editDesignation')) 
                document.getElementById('editDesignation').value = currentUser.designation || '';
            if (document.getElementById('editExperience')) 
                document.getElementById('editExperience').value = currentUser.experience || '';
        }
    }
    // Add more role-specific field handling as needed
    
    modal.style.display = 'flex';
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Save profile changes
function saveProfile(event) {
    event.preventDefault();
    
    console.log('Saving profile changes');
    
    // Get updated values
    const updatedName = document.getElementById('editName').value;
    
    // Update user object
    currentUser.name = updatedName;
    
    // Update role-specific fields
    if (currentUser.role === 'student') {
        if (document.getElementById('editBranch')) 
            currentUser.branch = document.getElementById('editBranch').value;
        if (document.getElementById('editYear')) 
            currentUser.year = document.getElementById('editYear').value;
        if (document.getElementById('editUsn')) 
            currentUser.usn = document.getElementById('editUsn').value;
    } else if (currentUser.role === 'faculty') {
        if (document.getElementById('editDepartment')) 
            currentUser.department = document.getElementById('editDepartment').value;
        if (document.getElementById('editDesignation')) 
            currentUser.designation = document.getElementById('editDesignation').value;
        if (document.getElementById('editExperience')) 
            currentUser.experience = document.getElementById('editExperience').value;
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('userData', JSON.stringify(currentUser));
        console.log('Profile saved successfully');
        
        // Update users array if it exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Close modal and reload profile
        closeEditModal();
        loadProfile();
        
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to save profile. Please try again.');
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        console.log('Logging out user');
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== PROFILE PAGE INITIALIZATION ===');
    console.log('Page loaded at:', new Date().toISOString());
    
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
            console.log('Is logged in:', userData.isLoggedIn);
        } catch (error) {
            console.error('Error parsing userData:', error);
        }
    } else {
        console.error('No userData found in localStorage!');
    }
    
    // Check if required elements exist
    const requiredElements = {
        'profileAvatar': document.getElementById('profileAvatar'),
        'profileName': document.getElementById('profileName'),
        'profileRole': document.getElementById('profileRole'),
        'profileDetails': document.getElementById('profileDetails'),
        'userPostsContainer': document.getElementById('userPostsContainer')
    };
    
    console.log('Required elements check:');
    Object.keys(requiredElements).forEach(key => {
        console.log(`  ${key}:`, requiredElements[key] ? 'Found' : 'NOT FOUND');
    });
    
    // Authenticate user
    currentUser = checkAuth();
    
    if (currentUser) {
        console.log('Authentication successful, loading profile');
        loadProfile();
    } else {
        console.error('Authentication failed');
    }
    
    console.log('=== INITIALIZATION COMPLETE ===');
});

// Handle modal close on outside click
window.onclick = function(event) {
    const modal = document.getElementById('editProfileModal');
    if (event.target === modal) {
        closeEditModal();
    }
}
