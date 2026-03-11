// Chatbot Widget Controller

class ChatbotWidget {
    constructor() {
        this.isOpen = false;
        this.isFullscreen = false;
        this.currentUser = this.checkAuth();
        this.conversationState = {
            interest: null,
            branch: null,
            skills: [],
            companies: [],
            careerGoal: null
        };
        
        if (this.currentUser) {
            this.init();
        }
    }

    checkAuth() {
        const userData = localStorage.getItem('userData');
        if (!userData) return null;
        
        const user = JSON.parse(userData);
        // Only show widget for students
        if (user.role !== 'student') return null;
        
        return user;
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.showWelcomeTooltip();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chatbot-widget';
        widget.innerHTML = `
            <div class="chatbot-tooltip">Need help finding alumni? 💬</div>
            <button class="chatbot-fab" id="chatbotFab">
                🤖
                <span class="chatbot-badge">!</span>
            </button>
            
            <div class="chatbot-modal" id="chatbotModal">
                <div class="chatbot-modal-header">
                    <div class="chatbot-modal-header-content">
                        <div class="chatbot-modal-avatar">🤖</div>
                        <div class="chatbot-modal-title">
                            <h3>Alumni Matcher</h3>
                            <p>Online • Ready to help</p>
                        </div>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button class="chatbot-expand-btn" id="chatbotExpand" title="Expand">
                            ⛶
                        </button>
                        <button class="chatbot-close-btn" id="chatbotClose">
                            ×
                        </button>
                    </div>
                </div>
                
                <div class="chatbot-modal-messages" id="chatbotMessages">
                    <div class="chatbot-welcome">
                        <div class="chatbot-welcome-icon">👋</div>
                        <h3>Hi ${this.currentUser.name}!</h3>
                        <p>I'm your Alumni Matcher Assistant. I can help you connect with alumni based on your interests and career goals.</p>
                        <div class="chatbot-welcome-actions">
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('career')">
                                🎯 Career Guidance
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('internship')">
                                💼 Internship Advice
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('skills')">
                                📚 Skill Development
                            </button>
                            <button class="chatbot-welcome-btn" onclick="chatbotWidget.startConversation('company')">
                                🏢 Company Insights
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="chatbot-modal-input-area">
                    <input 
                        type="text" 
                        class="chatbot-modal-input" 
                        id="chatbotInput"
                        placeholder="Type your message..."
                    >
                    <button class="chatbot-modal-send-btn" id="chatbotSend">
                        ➤
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }

    attachEventListeners() {
        const fab = document.getElementById('chatbotFab');
        const modal = document.getElementById('chatbotModal');
        const closeBtn = document.getElementById('chatbotClose');
        const expandBtn = document.getElementById('chatbotExpand');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        fab.addEventListener('click', () => this.toggleModal());
        closeBtn.addEventListener('click', () => this.closeModal());
        expandBtn.addEventListener('click', () => this.toggleFullscreen());
        sendBtn.addEventListener('click', () => this.sendMessage());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Remove badge on first open
        fab.addEventListener('click', () => {
            const badge = document.querySelector('.chatbot-badge');
            if (badge) badge.style.display = 'none';
        }, { once: true });
    }

    showWelcomeTooltip() {
        setTimeout(() => {
            const tooltip = document.querySelector('.chatbot-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, 3000);
            }
        }, 2000);
    }

    toggleModal() {
        this.isOpen = !this.isOpen;
        const modal = document.getElementById('chatbotModal');
        
        if (this.isOpen) {
            modal.classList.add('active');
            document.getElementById('chatbotInput').focus();
        } else {
            modal.classList.remove('active');
        }
    }

    closeModal() {
        this.isOpen = false;
        const modal = document.getElementById('chatbotModal');
        modal.classList.add('minimizing');
        
        setTimeout(() => {
            modal.classList.remove('active', 'minimizing');
        }, 300);
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        const modal = document.getElementById('chatbotModal');
        const expandBtn = document.getElementById('chatbotExpand');
        
        if (this.isFullscreen) {
            modal.classList.add('fullscreen');
            expandBtn.textContent = '⛶';
            expandBtn.title = 'Minimize';
        } else {
            modal.classList.remove('fullscreen');
            expandBtn.textContent = '⛶';
            expandBtn.title = 'Expand';
        }
    }

    startConversation(interest) {
        this.conversationState.interest = interest;
        
        // Clear welcome screen
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.innerHTML = '';
        
        // Add user message
        this.addMessage(`I'm interested in ${interest}`, 'user');
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            
            let response = '';
            let followUp = null;
            
            switch(interest) {
                case 'career':
                    response = "Great! I can help you connect with alumni who can guide your career path. What field are you interested in?";
                    followUp = ['Software Development', 'Data Science', 'Product Management', 'Hardware Engineering'];
                    break;
                case 'internship':
                    response = "Looking for internship advice? Perfect! Which companies or domains interest you?";
                    followUp = ['Tech Giants', 'Startups', 'Product Companies', 'Service Companies'];
                    break;
                case 'skills':
                    response = "Skill development is key! What skills are you looking to learn or improve?";
                    followUp = ['Programming', 'Cloud Computing', 'Machine Learning', 'Web Development'];
                    break;
                case 'company':
                    response = "I can connect you with alumni working at top companies. Which companies are you curious about?";
                    followUp = ['Google', 'Microsoft', 'Amazon', 'Adobe'];
                    break;
            }
            
            this.addMessage(response, 'bot', followUp);
        }, 1500);
    }

    sendMessage() {
        const input = document.getElementById('chatbotInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Simulate bot response
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage("That's interesting! Let me find the best alumni matches for you. You can also visit the full Alumni Matcher page for more detailed matching.", 'bot', ['Open Full Matcher', 'Continue Here']);
        }, 1500);
    }

    addMessage(text, sender, quickReplies = null) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = sender === 'bot' ? '🤖' : '👤';
        
        let quickReplyHTML = '';
        if (quickReplies) {
            quickReplyHTML = `
                <div class="quick-replies">
                    ${quickReplies.map(reply => {
                        if (reply === 'Open Full Matcher') {
                            return `<button class="quick-reply-btn" onclick="window.location.href='chatbot.html'">${reply}</button>`;
                        }
                        return `<button class="quick-reply-btn" onclick="chatbotWidget.handleQuickReply('${reply}')">${reply}</button>`;
                    }).join('')}
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

    handleQuickReply(reply) {
        this.addMessage(reply, 'user');
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            if (reply === 'Continue Here') {
                this.addMessage("Great! Tell me more about what you're looking for, or click below to open the full Alumni Matcher for detailed matching.", 'bot', ['Open Full Matcher']);
            } else {
                this.addMessage(`Excellent choice! I'm finding alumni who specialize in ${reply}. For the best experience with detailed profiles and matching, I recommend opening the full Alumni Matcher.`, 'bot', ['Open Full Matcher', 'Ask Another Question']);
            }
        }, 1500);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbotMessages');
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

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    }
}

// Initialize widget when DOM is ready
let chatbotWidget;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        chatbotWidget = new ChatbotWidget();
    });
} else {
    chatbotWidget = new ChatbotWidget();
}
