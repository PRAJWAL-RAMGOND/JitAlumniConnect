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

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    loadSuggestions();
});

// Logout
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'login.html';
}

// JIT-Specific Sample Posts
const samplePosts = [
    {
        id: 1,
        author: 'Training & Placement Cell - JIT',
        role: 'department',
        content: '🎉 RECORD BREAKING PLACEMENTS 2024! 250+ students placed in top companies including Amazon, Microsoft, Google, Infosys, TCS, and Wipro. Average package: 8.5 LPA | Highest package: 45 LPA. Proud moment for Jyothy Institute of Technology! #JITPlacement2024',
        image: null,
        likes: 456,
        comments: 89,
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        author: 'Dr. Shashi Kumar',
        role: 'faculty',
        content: 'Thrilled to announce that our research paper on "AI-Driven Healthcare Solutions" has been accepted at IEEE International Conference 2024! Congratulations to the entire research team from JIT. Innovation drives us forward! 🚀 #JITResearch #Innovation',
        image: null,
        likes: 234,
        comments: 45,
        timestamp: '4 hours ago'
    },
    {
        id: 3,
        author: 'Priya Sharma',
        role: 'student',
        content: 'Dreams do come true! 🎯 Selected for Software Engineering Internship at Microsoft Bangalore! Grateful to JIT faculty, especially Prof. Rajesh for mentorship. The journey from classroom to corporate starts here! #JITToMicrosoft #Internship2024',
        image: null,
        likes: 567,
        comments: 123,
        timestamp: '6 hours ago'
    },
    {
        id: 4,
        author: 'Atal Incubation Centre - JIT',
        role: 'department',
        content: '🚀 STARTUP LAUNCH ALERT! Congratulations to Team InnoTech for successfully launching their EdTech startup from AIC-JIT Foundation. From idea to execution in 6 months. This is what innovation looks like! Apply for incubation: aic-jit.in #StartupIndia #JITIncubation',
        image: null,
        likes: 389,
        comments: 67,
        timestamp: '8 hours ago'
    },
    {
        id: 5,
        author: 'Arjun Reddy',
        role: 'alumni',
        content: 'From JIT CSE 2019 batch to Senior Software Engineer at Google Cloud! The foundation I built at Jyothy Institute of Technology shaped my career. Forever grateful to my professors and peers. Happy to mentor current JIT students - DM me! 💼 #JITAlumni #GoogleLife',
        image: null,
        likes: 678,
        comments: 145,
        timestamp: '12 hours ago'
    },
    {
        id: 6,
        author: 'CSE Department - JIT',
        role: 'department',
        content: '🏆 HACKATHON VICTORY! JIT team "Code Warriors" wins 1st place at Smart India Hackathon 2024! Developed an AI-powered traffic management system. Prize: ₹1 Lakh + Incubation support. Making JIT proud! #SIH2024 #JITWins',
        image: null,
        likes: 512,
        comments: 98,
        timestamp: '1 day ago'
    },
    {
        id: 7,
        author: 'Ananya Iyer',
        role: 'alumni',
        content: 'Completed AWS Solutions Architect certification! The cloud computing knowledge from JIT curriculum gave me a strong foundation. Now working as Cloud Engineer at Amazon Web Services. Keep learning, keep growing! ☁️ #AWS #JITAlumni',
        image: null,
        likes: 423,
        comments: 76,
        timestamp: '1 day ago'
    },
    {
        id: 8,
        author: 'Cultural Committee - JIT',
        role: 'department',
        content: '🎭 JYOTHI UTSAV 2024 - Save the Date! Annual cultural fest on March 15-17. 3 days of music, dance, drama, and tech exhibitions. Celebrity performances, competitions, and prizes worth ₹5 Lakhs! Registration opens soon. #JyothiUtsav2024 #JITFest',
        image: null,
        likes: 789,
        comments: 234,
        timestamp: '2 days ago'
    },
    {
        id: 9,
        author: 'Prof. Sunita Rao',
        role: 'faculty',
        content: 'Proud to share that JIT has been ranked among Top 100 Engineering Colleges in India by NIRF 2024! Our commitment to excellence in education, research, and innovation continues. Congratulations to entire JIT family! 🏅 #NIRFRanking #JITExcellence',
        image: null,
        likes: 891,
        comments: 167,
        timestamp: '2 days ago'
    },
    {
        id: 10,
        author: 'Karthik Menon',
        role: 'student',
        content: 'Just cleared all 3 rounds of Infosys interview! Offer letter received - System Engineer role with 6 LPA package. The coding practice sessions and mock interviews at JIT made all the difference. Thank you placement cell! 🎯 #JITPlacement #Infosys',
        image: null,
        likes: 445,
        comments: 89,
        timestamp: '3 days ago'
    }
];

// Load Posts
function loadPosts() {
    const container = document.getElementById('postsContainer');
    container.innerHTML = '';
    
    // Load from localStorage or use sample data
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    const allPosts = [...savedPosts, ...samplePosts];
    
    allPosts.forEach(post => {
        const postElement = createPostElement(post);
        container.appendChild(postElement);
    });
}

// Create Post Element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    const initial = post.author.charAt(0).toUpperCase();
    
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="avatar">${initial}</div>
            <div class="post-author-info">
                <h4>${post.author} <span class="role-badge ${post.role}">${post.role.toUpperCase()}</span></h4>
                <p class="post-meta">${post.timestamp}</p>
            </div>
        </div>
        <div class="post-content">
            <p>${post.content}</p>
            ${post.image ? `<img src="${post.image}" alt="Post image" class="post-image">` : ''}
        </div>
        <div class="post-interactions">
            <button class="interaction-btn" onclick="likePost(${post.id})">
                ❤️ ${post.likes}
            </button>
            <button class="interaction-btn">
                💬 ${post.comments}
            </button>
            <button class="interaction-btn">
                🔁 SHARE
            </button>
        </div>
    `;
    
    return postDiv;
}

// Create Post
function createPost() {
    const content = document.getElementById('postContent').value.trim();
    const category = document.getElementById('postCategory').value;
    const imageFile = document.getElementById('postImage').files[0];
    
    if (!content) {
        alert('Please write something to post!');
        return;
    }
    
    const newPost = {
        id: Date.now(),
        author: currentUser.name,
        role: currentUser.role,
        content: content,
        image: imageFile ? URL.createObjectURL(imageFile) : null,
        likes: 0,
        comments: 0,
        timestamp: 'Just now',
        category: category
    };
    
    // Save to localStorage
    const savedPosts = JSON.parse(localStorage.getItem('posts') || '[]');
    savedPosts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(savedPosts));
    
    // Clear form
    document.getElementById('postContent').value = '';
    document.getElementById('postImage').value = '';
    
    // Reload posts
    loadPosts();
}

// Like Post
function likePost(postId) {
    alert('Post liked! ❤️');
}

// JIT-Specific Suggestions
const sampleSuggestions = [
    { name: 'Dr. Rajesh Kumar', role: 'faculty', info: 'Professor • CSE Department' },
    { name: 'Ananya Iyer', role: 'alumni', info: 'Software Engineer • Amazon' },
    { name: 'Vikram Singh', role: 'alumni', info: 'Product Manager • Microsoft' },
    { name: 'Priya Sharma', role: 'student', info: 'CSE • 4th Year' },
    { name: 'AIC-JIT Foundation', role: 'department', info: 'Incubation Centre' }
];

// Load Suggestions
function loadSuggestions() {
    const container = document.getElementById('suggestionsContainer');
    container.innerHTML = '';
    
    sampleSuggestions.forEach(person => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.className = 'suggestion-item';
        
        const initial = person.name.charAt(0).toUpperCase();
        
        suggestionDiv.innerHTML = `
            <div class="avatar-sm">${initial}</div>
            <div class="suggestion-info">
                <h4>${person.name}</h4>
                <p>${person.info}</p>
            </div>
            <button class="btn-connect" onclick="connect('${person.name}')">CONNECT</button>
        `;
        
        container.appendChild(suggestionDiv);
    });
}

// Connect with user
function connect(name) {
    alert(`Connection request sent to ${name}!`);
}
