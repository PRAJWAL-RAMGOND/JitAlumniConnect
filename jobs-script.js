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

// Mock Jobs Database
const jobsDatabase = [
    {
        id: 1,
        title: 'Software Development Engineer',
        company: 'Amazon',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹15-25 LPA',
        experience: '0-2 years',
        applicants: 45,
        postedTime: '2 days ago',
        description: 'Join Amazon as an SDE and work on cutting-edge technologies. Build scalable systems that impact millions of customers worldwide.',
        skills: ['Java', 'Python', 'AWS', 'System Design'],
        requirements: ['B.Tech/B.E in CS/IT', 'Strong problem-solving skills', 'Knowledge of data structures'],
        oncampus: true
    },
    {
        id: 2,
        title: 'Frontend Developer Intern',
        company: 'Google',
        location: 'Hyderabad, India',
        type: 'internship',
        salary: '₹80,000/month',
        experience: 'Internship',
        applicants: 120,
        postedTime: '1 day ago',
        description: 'Work with Google\'s world-class engineering team. Build user interfaces that are used by billions of people.',
        skills: ['React', 'JavaScript', 'CSS', 'TypeScript'],
        requirements: ['Currently pursuing B.Tech', 'Strong JavaScript fundamentals', 'Portfolio of projects'],
        oncampus: false
    },
    {
        id: 3,
        title: 'Data Science Intern',
        company: 'Microsoft',
        location: 'Bangalore, India',
        type: 'internship',
        salary: '₹75,000/month',
        experience: 'Internship',
        applicants: 89,
        postedTime: '3 days ago',
        description: 'Join Microsoft\'s AI team and work on machine learning projects. Gain hands-on experience with real-world data.',
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        requirements: ['B.Tech 3rd/4th year', 'Knowledge of ML algorithms', 'Python proficiency'],
        oncampus: true
    },
    {
        id: 4,
        title: 'Full Stack Developer',
        company: 'Flipkart',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹12-18 LPA',
        experience: '0-1 years',
        applicants: 67,
        postedTime: '5 days ago',
        description: 'Build end-to-end features for India\'s leading e-commerce platform. Work with modern tech stack and agile methodologies.',
        skills: ['React', 'Node.js', 'MongoDB', 'REST APIs'],
        requirements: ['B.Tech/B.E in CS/IT', 'Full stack development experience', 'Strong coding skills'],
        oncampus: true
    },
    {
        id: 5,
        title: 'Cloud Engineer',
        company: 'Adobe',
        location: 'Noida, India',
        type: 'fulltime',
        salary: '₹18-28 LPA',
        experience: '1-3 years',
        applicants: 34,
        postedTime: '1 week ago',
        description: 'Design and implement cloud infrastructure for Adobe\'s creative cloud services. Work with AWS, Azure, and GCP.',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Python'],
        requirements: ['B.Tech in CS/IT', 'Cloud certification preferred', 'DevOps experience'],
        oncampus: false
    },
    {
        id: 6,
        title: 'Product Management Intern',
        company: 'Swiggy',
        location: 'Bangalore, India',
        type: 'internship',
        salary: '₹50,000/month',
        experience: 'Internship',
        applicants: 156,
        postedTime: '4 days ago',
        description: 'Learn product management from industry experts. Work on features that impact millions of food delivery customers.',
        skills: ['Product Strategy', 'Analytics', 'Communication', 'SQL'],
        requirements: ['MBA/B.Tech final year', 'Analytical mindset', 'Passion for products'],
        oncampus: false
    },
    {
        id: 7,
        title: 'Backend Developer',
        company: 'Razorpay',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹15-22 LPA',
        experience: '0-2 years',
        applicants: 78,
        postedTime: '3 days ago',
        description: 'Build robust payment systems that process billions in transactions. Work with cutting-edge fintech technologies.',
        skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
        requirements: ['B.Tech in CS/IT', 'Strong backend fundamentals', 'Database knowledge'],
        oncampus: true
    },
    {
        id: 8,
        title: 'UI/UX Design Intern',
        company: 'Zomato',
        location: 'Gurugram, India',
        type: 'internship',
        salary: '₹40,000/month',
        experience: 'Internship',
        applicants: 92,
        postedTime: '2 days ago',
        description: 'Design delightful user experiences for millions of food lovers. Work with product and engineering teams.',
        skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
        requirements: ['Design portfolio required', 'Figma proficiency', 'Creative thinking'],
        oncampus: false
    },
    {
        id: 9,
        title: 'Software Engineer - AI/ML',
        company: 'NVIDIA',
        location: 'Pune, India',
        type: 'fulltime',
        salary: '₹25-35 LPA',
        experience: '0-2 years',
        applicants: 45,
        postedTime: '1 week ago',
        description: 'Work on AI and deep learning projects at the forefront of technology. Build solutions for autonomous vehicles and robotics.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'CUDA'],
        requirements: ['B.Tech/M.Tech in CS', 'Strong ML fundamentals', 'Research experience preferred'],
        oncampus: true
    },
    {
        id: 10,
        title: 'Cybersecurity Analyst',
        company: 'Cisco',
        location: 'Bangalore, India',
        type: 'fulltime',
        salary: '₹12-20 LPA',
        experience: '0-1 years',
        applicants: 56,
        postedTime: '5 days ago',
        description: 'Protect enterprise networks and systems from cyber threats. Work with cutting-edge security technologies.',
        skills: ['Network Security', 'Ethical Hacking', 'Linux', 'Python'],
        requirements: ['B.Tech in CS/IT', 'Security certifications preferred', 'Analytical skills'],
        oncampus: false
    }
];

// State
let currentFilter = 'all';
let savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadJobs();
    loadRecommendedJobs();
    updateStats();
});

// Load Jobs
function loadJobs(filter = 'all', searchQuery = '') {
    const container = document.getElementById('jobsContainer');
    container.innerHTML = '';
    
    let filteredJobs = jobsDatabase;
    
    // Apply filter
    if (filter !== 'all') {
        filteredJobs = filteredJobs.filter(job => {
            if (filter === 'oncampus') return job.oncampus;
            return job.type === filter;
        });
    }
    
    // Apply search
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(query) ||
            job.company.toLowerCase().includes(query) ||
            job.skills.some(skill => skill.toLowerCase().includes(query))
        );
    }
    
    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="jobs-empty-state">
                <div class="jobs-empty-state-icon">🔍</div>
                <h3>No jobs found</h3>
                <p>Try adjusting your filters or search query</p>
            </div>
        `;
        return;
    }
    
    filteredJobs.forEach(job => {
        const jobCard = createJobCard(job);
        container.appendChild(jobCard);
    });
}

// Create Job Card
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.setAttribute('data-job-id', job.id);
    
    const companyInitial = job.company.charAt(0);
    const isSaved = savedJobs.includes(job.id);
    const isApplied = appliedJobs.includes(job.id);
    
    let typeBadge = '';
    if (job.type === 'internship') {
        typeBadge = '<span class="job-type-badge internship">Internship</span>';
    } else if (job.type === 'fulltime') {
        typeBadge = '<span class="job-type-badge fulltime">Full-Time</span>';
    }
    
    if (job.oncampus) {
        typeBadge += ' <span class="job-type-badge oncampus">On-Campus</span>';
    }
    
    card.innerHTML = `
        <div class="job-card-header">
            <div class="job-company-logo">${companyInitial}</div>
            <div class="job-header-info">
                <h3 class="job-title">${job.title}</h3>
                <p class="job-company">${job.company}</p>
                <p class="job-location">📍 ${job.location}</p>
            </div>
            <div class="job-card-actions">
                <button class="job-action-btn ${isSaved ? 'saved' : ''}" onclick="toggleSaveJob(${job.id})" title="Save job">
                    ${isSaved ? '⭐' : '☆'}
                </button>
                <button class="job-action-btn" onclick="shareJob(${job.id})" title="Share job">
                    🔗
                </button>
            </div>
        </div>
        
        <div class="job-details">
            ${typeBadge}
            <div class="job-detail-item">
                <span>💰</span> ${job.salary}
            </div>
            <div class="job-detail-item">
                <span>📊</span> ${job.experience}
            </div>
            <div class="job-detail-item">
                <span>👥</span> ${job.applicants} applicants
            </div>
        </div>
        
        <div class="job-description">
            ${job.description}
        </div>
        
        <div class="job-tags">
            ${job.skills.map(skill => `<span class="job-tag">${skill}</span>`).join('')}
        </div>
        
        <div class="job-card-footer">
            <span class="job-posted-time">Posted ${job.postedTime}</span>
            <button class="job-apply-btn ${isApplied ? 'applied' : ''}" 
                    onclick="applyJob(${job.id})" 
                    ${isApplied ? 'disabled' : ''}>
                ${isApplied ? '✓ Applied' : 'Apply Now'}
            </button>
        </div>
    `;
    
    return card;
}

// Filter Jobs
function filterJobs(filter) {
    currentFilter = filter;
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    const searchQuery = document.getElementById('jobSearch').value;
    loadJobs(filter, searchQuery);
}

// Search Jobs
function searchJobs() {
    const searchQuery = document.getElementById('jobSearch').value;
    loadJobs(currentFilter, searchQuery);
}

// Toggle Save Job
function toggleSaveJob(jobId) {
    const index = savedJobs.indexOf(jobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
    } else {
        savedJobs.push(jobId);
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    loadJobs(currentFilter, document.getElementById('jobSearch').value);
    updateStats();
}

// Apply Job
function applyJob(jobId) {
    if (appliedJobs.includes(jobId)) return;
    
    appliedJobs.push(jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
    
    const job = jobsDatabase.find(j => j.id === jobId);
    alert(`✅ Application submitted for ${job.title} at ${job.company}!\n\nYou'll receive updates via email.`);
    
    loadJobs(currentFilter, document.getElementById('jobSearch').value);
    updateStats();
}

// Share Job
function shareJob(jobId) {
    const job = jobsDatabase.find(j => j.id === jobId);
    const shareText = `Check out this job: ${job.title} at ${job.company}\nSalary: ${job.salary}\nLocation: ${job.location}`;
    
    if (navigator.share) {
        navigator.share({
            title: job.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText);
        alert('Job details copied to clipboard!');
    }
}

// Load Recommended Jobs
function loadRecommendedJobs() {
    const container = document.getElementById('recommendedJobs');
    const recommended = jobsDatabase.slice(0, 3);
    
    container.innerHTML = recommended.map(job => `
        <div class="recommended-job-item" onclick="scrollToJob(${job.id})">
            <h4 class="recommended-job-title">${job.title}</h4>
            <p class="recommended-job-company">${job.company}</p>
            <p class="recommended-job-salary">${job.salary}</p>
        </div>
    `).join('');
}

// Scroll to Job
function scrollToJob(jobId) {
    const jobCard = document.querySelector(`[data-job-id="${jobId}"]`);
    if (jobCard) {
        jobCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        jobCard.style.animation = 'pulse 0.5s ease';
    }
}

// Update Stats
function updateStats() {
    document.getElementById('appliedCount').textContent = appliedJobs.length;
    document.getElementById('savedCount').textContent = savedJobs.length;
    
    // Count viewed jobs (all jobs in database for now)
    document.getElementById('viewedCount').textContent = jobsDatabase.length;
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userData');
        window.location.href = 'login.html';
    }
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('jobSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchJobs();
            }
        });
    }
});
