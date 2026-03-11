// Check authentication - Redirect if not logged in
function checkAuth() {
    const userData = localStorage.getItem('userData');
    if (!userData) {
        alert('Please login to access Alumni Matcher');
        window.location.href = 'login.html';
        return null;
    }
    const user = JSON.parse(userData);
    
    // Only students can access chatbot
    if (user.role !== 'student') {
        alert('Alumni Matcher is only available for students');
        window.location.href = 'dashboard.html';
        return null;
    }
    
    return user;
}

// Chatbot State
let conversationState = {
    interest: null,
    branch: null,
    skills: [],
    companies: [],
    careerGoal: null
};

// Current User
const currentUser = checkAuth();

// Mock Alumni Database
const alumniDatabase = [
    {
        name: "Rajesh Kumar",
        batch: "2019",
        branch: "CSE",
        company: "Google",
        role: "Software Engineer",
        skills: ["Python", "Machine Learning", "Cloud Computing"],
        interests: ["career", "internship", "skills"],
        expertise: ["AI/ML", "Backend Development"]
    },
    {
        name: "Priya Sharma",
        batch: "2018",
        branch: "ISE",
        company: "Microsoft",
        role: "Senior Developer",
        skills: ["C#", ".NET", "Azure"],
        interests: ["career", "company", "skills"],
        expertise: ["Cloud Architecture", "Full Stack"]
    },
    {
        name: "Arun Patel",
        batch: "2020",
        branch: "CSE",
        company: "Amazon",
        role: "SDE-2",
        skills: ["Java", "AWS", "System Design"],
        interests: ["internship", "career", "company"],
        expertise: ["Distributed Systems", "Scalability"]
    },
    {
        name: "Sneha Reddy",
        batch: "2017",
        branch: "ECE",
        company: "Intel",
        role: "Hardware Engineer",
        skills: ["VLSI", "Embedded Systems", "IoT"],
        interests: ["skills", "career"],
        expertise: ["Chip Design", "IoT Solutions"]
    },
    {
        name: "Karthik Menon",
        batch: "2019",
        branch: "ISE",
        company: "Flipkart",
        role: "Product Manager",
        skills: ["Product Strategy", "Analytics", "UX"],
        interests: ["career", "company"],
        expertise: ["E-commerce", "Product Development"]
    },
    {
        name: "Divya Iyer",
        batch: "2021",
        branch: "CSE",
        company: "Adobe",
        role: "Frontend Developer",
        skills: ["React", "JavaScript", "UI/UX"],
        interests: ["internship", "skills"],
        expertise: ["Web Development", "Design Systems"]
    },
    {
        name: "Vikram Singh",
        batch: "2018",
        branch: "CSE",
        company: "Goldman Sachs",
        role: "Quantitative Analyst",
        skills: ["Python", "Finance", "Data Science"],
        interests: ["career", "skills"],
        expertise: ["Financial Modeling", "Algorithmic Trading"]
    },
    {
        name: "Ananya Das",
        batch: "2020",
        branch: "ISE",
        company: "Salesforce",
        role: "Cloud Consultant",
        skills: ["Salesforce", "CRM", "Integration"],
        interests: ["career", "company"],
        expertise: ["Cloud Solutions", "Business Process"]
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    if (currentUser) {
        loadUserData();
        displayWelcomeMessage();
    }
});

function loadUserData() {
    if (currentUser && currentUser.branch) {
        conversationState.branch = currentUser.branch;
    }
}

function displayWelcomeMessage() {
    const userName = currentUser.name || 'Student';
    const userBranch = currentUser.branch || 'your department';
    
    // Update welcome message with user's name
    const firstMessage = document.querySelector('.bot-message .message-content p');
    if (firstMessage) {
        firstMessage.textContent = `Hi ${userName}! I'm your Alumni Matcher Assistant. I'll help you connect with alumni from ${userBranch} and other departments based on your interests and career goals.`;
    }
}

// Handle Interest Selection
function selectInterest(interest) {
    conversationState.interest = interest;
    
    // Remove quick reply buttons
    const initialOptions = document.getElementById('initialOptions');
    if (initialOptions) {
        initialOptions.remove();
    }
    
    // Add user message
    addMessage(`I'm interested in ${interest}`, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Bot response based on interest
    setTimeout(() => {
        hideTypingIndicator();
        
        let response = '';
        let followUp = null;
        
        switch(interest) {
            case 'career':
                response = "Great! I can help you connect with alumni who can guide your career path. What field are you interested in?";
                followUp = ['Software Development', 'Data Science', 'Product Management', 'Hardware Engineering'];
                break;
            case 'internship':
                response = "Looking for internship advice? Perfect! Which companies or domains interest you?";
                followUp = ['Tech Giants (Google, Microsoft)', 'Startups', 'Product Companies', 'Service Companies'];
                break;
            case 'skills':
                response = "Skill development is key! What skills are you looking to learn or improve?";
                followUp = ['Programming Languages', 'Cloud Computing', 'Machine Learning', 'Web Development'];
                break;
            case 'company':
                response = "I can connect you with alumni working at top companies. Which companies are you curious about?";
                followUp = ['Google', 'Microsoft', 'Amazon', 'Adobe', 'Goldman Sachs'];
                break;
        }
        
        addMessage(response, 'bot', followUp);
    }, 1500);
}

// Handle Follow-up Selection
function selectFollowUp(value) {
    addMessage(value, 'user');
    
    // Store the selection
    if (conversationState.interest === 'skills') {
        conversationState.skills.push(value);
    } else if (conversationState.interest === 'company') {
        conversationState.companies.push(value);
    } else {
        conversationState.careerGoal = value;
    }
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        // Find matching alumni
        const matches = findMatchingAlumni();
        
        if (matches.length > 0) {
            addMessage(`Excellent! I found ${matches.length} alumni who match your interests. Check the right panel to see them!`, 'bot');
            displayMatchedAlumni(matches);
            
            setTimeout(() => {
                addMessage("Would you like to refine your search or connect with any of these alumni?", 'bot', 
                    ['Refine Search', 'Tell Me More']);
            }, 1000);
        } else {
            addMessage("I couldn't find exact matches, but let me show you some alumni who might still be helpful!", 'bot');
            displayMatchedAlumni(alumniDatabase.slice(0, 3));
        }
    }, 1500);
}

// Find Matching Alumni
function findMatchingAlumni() {
    let matches = alumniDatabase.filter(alumni => {
        let score = 0;
        
        // Match by interest
        if (conversationState.interest && alumni.interests.includes(conversationState.interest)) {
            score += 3;
        }
        
        // Match by branch
        if (conversationState.branch && alumni.branch === conversationState.branch) {
            score += 2;
        }
        
        // Match by company
        if (conversationState.companies.length > 0) {
            if (conversationState.companies.some(c => alumni.company.toLowerCase().includes(c.toLowerCase()))) {
                score += 4;
            }
        }
        
        // Match by skills
        if (conversationState.skills.length > 0) {
            const skillMatch = conversationState.skills.some(s => 
                alumni.skills.some(as => as.toLowerCase().includes(s.toLowerCase())) ||
                alumni.expertise.some(e => e.toLowerCase().includes(s.toLowerCase()))
            );
            if (skillMatch) score += 3;
        }
        
        alumni.matchScore = score;
        return score > 0;
    });
    
    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    return matches.slice(0, 5);
}

// Display Matched Alumni
function displayMatchedAlumni(alumni) {
    const container = document.getElementById('matchedAlumni');
    container.innerHTML = '';
    
    alumni.forEach(person => {
        const card = document.createElement('div');
        card.className = 'alumni-card';
        
        const initials = person.name.split(' ').map(n => n[0]).join('');
        const matchPercentage = Math.min(95, (person.matchScore || 5) * 15);
        
        card.innerHTML = `
            <div class="alumni-header">
                <div class="alumni-avatar">${initials}</div>
                <div class="alumni-info">
                    <h4>${person.name}</h4>
                    <p>${person.role} at ${person.company}</p>
                </div>
            </div>
            <div class="alumni-tags">
                ${person.expertise.slice(0, 2).map(exp => `<span class="alumni-tag">${exp}</span>`).join('')}
            </div>
            <div class="match-score">
                ✨ ${matchPercentage}% Match
            </div>
            <button class="connect-btn" onclick="connectWithAlumni('${person.name}')">
                Connect Now
            </button>
        `;
        
        container.appendChild(card);
    });
}

// Connect with Alumni
function connectWithAlumni(name) {
    addMessage(`I'd like to connect with ${name}`, 'user');
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        addMessage(`Great choice! I've sent a connection request to ${name}. They'll be notified and can accept your request. In the meantime, you can view their profile or continue exploring other alumni.`, 'bot',
            ['View Profile', 'Find More Alumni', 'Ask Another Question']);
    }, 1500);
}

// Send Message
function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    addMessage(message, 'user');
    input.value = '';
    
    // Process user message
    processUserMessage(message);
}

// Process User Message
function processUserMessage(message) {
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        
        const lowerMessage = message.toLowerCase();
        
        // Simple keyword matching
        if (lowerMessage.includes('refine') || lowerMessage.includes('search again')) {
            addMessage("Sure! Let's start fresh. What would you like to focus on?", 'bot',
                ['Career Guidance', 'Internship Advice', 'Skill Development', 'Company Insights']);
            conversationState = { branch: conversationState.branch };
        } else if (lowerMessage.includes('tell me more') || lowerMessage.includes('more info')) {
            addMessage("I can help you learn more about any of the matched alumni. You can click on their cards to view detailed profiles, or ask me specific questions like 'What does Rajesh do at Google?' or 'How did Priya get into Microsoft?'", 'bot');
        } else if (lowerMessage.includes('profile')) {
            addMessage("To view a detailed profile, simply click on any alumni card in the right panel. You'll see their full background, achievements, and how to best reach out to them!", 'bot');
        } else if (lowerMessage.includes('find more') || lowerMessage.includes('show more')) {
            const allMatches = findMatchingAlumni();
            if (allMatches.length > 0) {
                displayMatchedAlumni(allMatches);
                addMessage(`I've updated the list with all ${allMatches.length} matching alumni!`, 'bot');
            } else {
                addMessage("Let me show you more alumni from different backgrounds!", 'bot');
                displayMatchedAlumni(alumniDatabase.slice(0, 5));
            }
        } else if (lowerMessage.includes('thank')) {
            addMessage("You're welcome! Feel free to reach out anytime you need help connecting with alumni. Good luck! 🎓", 'bot');
        } else {
            // Generic response
            addMessage("I understand you're looking for specific information. Could you clarify what you'd like to know? I can help you with career guidance, internship advice, skill development, or company insights.", 'bot',
                ['Career Guidance', 'Internship Advice', 'Skill Development', 'Company Insights']);
        }
    }, 1500);
}

// Add Message to Chat
function addMessage(text, sender, quickReplies = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    let quickReplyHTML = '';
    if (quickReplies) {
        quickReplyHTML = `
            <div class="quick-replies">
                ${quickReplies.map(reply => 
                    `<button class="quick-reply-btn" onclick="selectFollowUp('${reply}')">${reply}</button>`
                ).join('')}
            </div>
        `;
    }
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${text}</p>
            ${quickReplyHTML}
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Typing Indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Handle Enter Key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Logout Function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}
