// Edit Profile Functionality
// Dedicated script for profile editing

console.log('Edit Profile Script Loaded');

// Global variable to store current user
let editCurrentUser = null;

// Initialize edit profile functionality
function initEditProfile() {
    console.log('Initializing edit profile...');
    
    // Get current user from localStorage
    const userDataRaw = localStorage.getItem('userData');
    if (!userDataRaw) {
        console.error('No user data found');
        return;
    }
    
    try {
        editCurrentUser = JSON.parse(userDataRaw);
        console.log('Edit profile initialized for:', editCurrentUser.name);
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
}

// Open edit profile modal
function openEditProfileModal() {
    console.log('Opening edit profile modal...');
    
    if (!editCurrentUser) {
        console.error('No current user found');
        alert('Error: User data not found. Please login again.');
        return;
    }
    
    const modal = document.getElementById('editProfileModal');
    if (!modal) {
        console.error('Modal element not found');
        alert('Error: Modal not found');
        return;
    }
    
    // Populate form fields
    try {
        const nameInput = document.getElementById('editName');
        const emailInput = document.getElementById('editEmail');
        
        if (nameInput) nameInput.value = editCurrentUser.name || '';
        if (emailInput) emailInput.value = editCurrentUser.email || '';
        
        console.log('Basic fields populated');
        
        // Hide all role-specific fields first
        const roleFields = document.querySelectorAll('.edit-role-fields');
        roleFields.forEach(field => {
            field.style.display = 'none';
        });
        
        console.log('User role:', editCurrentUser.role);
        
        // Show and populate role-specific fields
        if (editCurrentUser.role === 'student') {
            console.log('Populating student fields...');
            const studentFields = document.getElementById('editStudentFields');
            if (studentFields) {
                studentFields.style.display = 'block';
                
                const branchInput = document.getElementById('editBranch');
                const yearInput = document.getElementById('editYear');
                const usnInput = document.getElementById('editUsn');
                
                if (branchInput) branchInput.value = editCurrentUser.branch || '';
                if (yearInput) yearInput.value = editCurrentUser.year || '';
                if (usnInput) usnInput.value = editCurrentUser.usn || '';
                
                console.log('Student fields populated');
            }
        } else if (editCurrentUser.role === 'faculty') {
            console.log('Populating faculty fields...');
            const facultyFields = document.getElementById('editFacultyFields');
            if (facultyFields) {
                facultyFields.style.display = 'block';
                
                const deptInput = document.getElementById('editDepartment');
                const desigInput = document.getElementById('editDesignation');
                const expInput = document.getElementById('editExperience');
                
                if (deptInput) deptInput.value = editCurrentUser.department || '';
                if (desigInput) desigInput.value = editCurrentUser.designation || '';
                if (expInput) expInput.value = editCurrentUser.experience || '';
                
                console.log('Faculty fields populated');
            }
        } else if (editCurrentUser.role === 'alumni') {
            console.log('Populating alumni fields...');
            const alumniFields = document.getElementById('editAlumniFields');
            if (alumniFields) {
                alumniFields.style.display = 'block';
                
                const batchInput = document.getElementById('editBatch');
                const branchInput = document.getElementById('editAlumniBranch');
                const companyInput = document.getElementById('editCompany');
                const desigInput = document.getElementById('editAlumniDesignation');
                
                if (batchInput) batchInput.value = editCurrentUser.batch || '';
                if (branchInput) branchInput.value = editCurrentUser.branch || '';
                if (companyInput) companyInput.value = editCurrentUser.company || '';
                if (desigInput) desigInput.value = editCurrentUser.designation || '';
                
                console.log('Alumni fields populated');
            }
        } else if (editCurrentUser.role === 'department') {
            console.log('Populating department fields...');
            const deptFields = document.getElementById('editDepartmentFields');
            if (deptFields) {
                deptFields.style.display = 'block';
                
                const nameInput = document.getElementById('editDeptName');
                const descInput = document.getElementById('editDeptDescription');
                
                if (nameInput) nameInput.value = editCurrentUser.deptName || '';
                if (descInput) descInput.value = editCurrentUser.description || '';
                
                console.log('Department fields populated');
            }
        }
        
        // Show modal
        modal.classList.add('show');
        modal.style.display = 'flex';
        console.log('Modal displayed');
        
    } catch (error) {
        console.error('Error populating form:', error);
        alert('Error opening edit form: ' + error.message);
    }
}

// Close edit profile modal
function closeEditProfileModal() {
    console.log('Closing edit profile modal...');
    
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        console.log('Modal closed');
    }
}

// Save profile changes
function saveProfileChanges(event) {
    if (event) event.preventDefault();
    
    console.log('Saving profile changes...');
    
    if (!editCurrentUser) {
        console.error('No current user found');
        alert('Error: User data not found');
        return false;
    }
    
    try {
        // Get updated values
        const updatedData = {
            ...editCurrentUser,
            name: document.getElementById('editName').value.trim()
        };
        
        console.log('Base data updated:', updatedData.name);
        
        // Update role-specific fields
        if (editCurrentUser.role === 'student') {
            updatedData.branch = document.getElementById('editBranch').value.trim();
            updatedData.year = document.getElementById('editYear').value.trim();
            updatedData.usn = document.getElementById('editUsn').value.trim();
            console.log('Student data updated');
        } else if (editCurrentUser.role === 'faculty') {
            updatedData.department = document.getElementById('editDepartment').value.trim();
            updatedData.designation = document.getElementById('editDesignation').value.trim();
            updatedData.experience = document.getElementById('editExperience').value.trim();
            console.log('Faculty data updated');
        } else if (editCurrentUser.role === 'alumni') {
            updatedData.batch = document.getElementById('editBatch').value.trim();
            updatedData.branch = document.getElementById('editAlumniBranch').value.trim();
            updatedData.company = document.getElementById('editCompany').value.trim();
            updatedData.designation = document.getElementById('editAlumniDesignation').value.trim();
            console.log('Alumni data updated');
        } else if (editCurrentUser.role === 'department') {
            updatedData.deptName = document.getElementById('editDeptName').value.trim();
            updatedData.description = document.getElementById('editDeptDescription').value.trim();
            console.log('Department data updated');
        }
        
        // Validate name
        if (!updatedData.name) {
            alert('Name cannot be empty');
            return false;
        }
        
        console.log('Updated data:', updatedData);
        
        // Update current user in localStorage
        localStorage.setItem('userData', JSON.stringify(updatedData));
        console.log('userData updated in localStorage');
        
        // Update in users list
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === editCurrentUser.email);
        
        if (userIndex !== -1) {
            // Preserve password
            updatedData.password = users[userIndex].password;
            users[userIndex] = updatedData;
            localStorage.setItem('users', JSON.stringify(users));
            console.log('User updated in users list at index:', userIndex);
        } else {
            console.log('User not found in users list, adding...');
            users.push(updatedData);
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        // Show success message
        alert('✅ Profile updated successfully!');
        
        // Close modal
        closeEditProfileModal();
        
        // Reload page to show updated data
        console.log('Reloading page...');
        setTimeout(() => {
            window.location.reload();
        }, 500);
        
        return false;
        
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('❌ Failed to update profile: ' + error.message);
        return false;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('editProfileModal');
    if (event.target === modal) {
        closeEditProfileModal();
    }
});

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Edit profile DOM ready');
    initEditProfile();
    
    // Attach event listener to form
    const form = document.getElementById('editProfileForm');
    if (form) {
        form.addEventListener('submit', saveProfileChanges);
        console.log('Form submit listener attached');
    }
});

// Make functions globally available
window.editProfile = openEditProfileModal;
window.closeEditModal = closeEditProfileModal;
window.saveProfile = saveProfileChanges;

console.log('Edit profile functions registered globally');
