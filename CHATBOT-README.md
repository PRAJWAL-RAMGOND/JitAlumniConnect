# 🤖 JITConnect Alumni Matcher Chatbot

## Overview

The Alumni Matcher Chatbot is an intelligent assistant that helps students connect with alumni based on their interests, career goals, and skills. It provides personalized recommendations and facilitates meaningful connections within the JIT community.

## Features

### 1. Conversational Interface
- Clean, modern chat UI with smooth animations
- Real-time typing indicators
- Quick reply buttons for easy interaction
- Message history with user/bot distinction

### 2. Interest-Based Matching
The chatbot helps students find alumni based on:
- **Career Guidance** - Connect with alumni in specific career paths
- **Internship Advice** - Get insights from alumni about internship opportunities
- **Skill Development** - Find mentors for specific technical skills
- **Company Insights** - Learn about working at specific companies

### 3. Smart Matching Algorithm
The chatbot uses a scoring system to match students with alumni based on:
- Interest alignment (3 points)
- Branch/Department match (2 points)
- Company preference (4 points)
- Skill overlap (3 points)

### 4. Alumni Display
- Right panel shows matched alumni cards
- Match percentage displayed for each alumni
- Quick connect buttons
- Alumni expertise tags
- Profile information (company, role, batch)

### 5. Interactive Features
- Quick reply buttons for common responses
- Free-text input for custom questions
- Refine search capability
- Multiple alumni recommendations
- Connection request functionality

## File Structure

```
chatbot.html          - Main chatbot page with UI structure
chatbot-styles.css    - Styling for chatbot interface
chatbot-script.js     - Chatbot logic and matching algorithm
```

## How It Works

### User Flow

1. **Initial Greeting**
   - Bot welcomes user and presents 4 main interest categories
   - User selects their primary interest

2. **Interest Refinement**
   - Bot asks follow-up questions based on selected interest
   - User provides more specific information (skills, companies, domains)

3. **Alumni Matching**
   - Bot processes user preferences
   - Matching algorithm finds relevant alumni
   - Results displayed in right panel with match scores

4. **Connection**
   - User can connect with alumni directly
   - View detailed profiles
   - Refine search or explore more options

### Matching Algorithm

```javascript
Score Calculation:
- Interest match: +3 points
- Same branch: +2 points
- Company match: +4 points
- Skill overlap: +3 points

Match Percentage = min(95, score × 15)
```

## Mock Alumni Database

The prototype includes 8 sample alumni profiles:

1. **Rajesh Kumar** - Google, Software Engineer (CSE, 2019)
2. **Priya Sharma** - Microsoft, Senior Developer (ISE, 2018)
3. **Arun Patel** - Amazon, SDE-2 (CSE, 2020)
4. **Sneha Reddy** - Intel, Hardware Engineer (ECE, 2017)
5. **Karthik Menon** - Flipkart, Product Manager (ISE, 2019)
6. **Divya Iyer** - Adobe, Frontend Developer (CSE, 2021)
7. **Vikram Singh** - Goldman Sachs, Quantitative Analyst (CSE, 2018)
8. **Ananya Das** - Salesforce, Cloud Consultant (ISE, 2020)

## Integration with Existing System

### Navigation
The chatbot is integrated into the main navigation sidebar:
```html
<li class="nav-item">
    <a href="chatbot.html" class="nav-link">
        <span>🤖</span> ALUMNI MATCHER
    </a>
</li>
```

### Styling Consistency
- Uses existing `ferrari-styles.css` for base styles
- Custom `chatbot-styles.css` for chatbot-specific components
- Follows the same design language (gradients, shadows, animations)
- Supports dark mode

### Data Integration
- Reads user data from `localStorage` (branch, interests)
- Can be connected to backend API for real alumni data
- Connection requests can be stored in database

## Future Enhancements

### Phase 2 Features
1. **AI-Powered Matching**
   - Natural Language Processing for better intent understanding
   - Machine learning for improved recommendations
   - Sentiment analysis for conversation quality

2. **Advanced Filtering**
   - Filter by graduation year
   - Filter by location
   - Filter by industry
   - Filter by availability

3. **Real-Time Features**
   - Live chat with alumni
   - Instant notifications
   - Online status indicators
   - Scheduled mentorship sessions

4. **Analytics**
   - Track successful connections
   - Measure engagement metrics
   - Popular search queries
   - Alumni response rates

5. **Personalization**
   - Remember user preferences
   - Suggest alumni based on profile
   - Automated follow-ups
   - Smart recommendations

## Backend Integration

### API Endpoints Needed

```javascript
// Get matched alumni
GET /api/chatbot/match
Body: { interest, skills, companies, branch }
Response: [{ alumni data with match scores }]

// Send connection request
POST /api/chatbot/connect
Body: { studentId, alumniId, message }
Response: { success, requestId }

// Get conversation history
GET /api/chatbot/history/:userId
Response: [{ messages }]

// Save conversation
POST /api/chatbot/save
Body: { userId, conversation, matches }
```

### Database Schema

```javascript
// Conversations Collection
{
  userId: ObjectId,
  messages: [{
    sender: String,
    text: String,
    timestamp: Date
  }],
  state: {
    interest: String,
    skills: [String],
    companies: [String]
  },
  matches: [ObjectId],
  createdAt: Date
}

// Connection Requests Collection
{
  studentId: ObjectId,
  alumniId: ObjectId,
  message: String,
  status: String, // pending, accepted, rejected
  createdAt: Date
}
```

## Usage Instructions

### For Students

1. Navigate to "ALUMNI MATCHER" from the sidebar
2. Select your primary interest from the quick reply buttons
3. Answer follow-up questions to refine your search
4. Review matched alumni in the right panel
5. Click "Connect Now" to send a connection request
6. Type custom questions in the input field for more help

### For Developers

1. **Customize Alumni Data**: Edit `alumniDatabase` array in `chatbot-script.js`
2. **Modify Matching Logic**: Update `findMatchingAlumni()` function
3. **Add New Intents**: Extend `processUserMessage()` function
4. **Style Changes**: Edit `chatbot-styles.css`
5. **Backend Integration**: Replace mock data with API calls

## Technical Details

### Technologies Used
- HTML5
- CSS3 (with animations and transitions)
- Vanilla JavaScript
- LocalStorage for state management
- Gradient backgrounds and glassmorphism effects

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Responsive Design
- Desktop optimized
- Tablet compatible
- Mobile responsive (media queries included)

## Testing

### Test Scenarios

1. **Interest Selection**: Test all 4 interest categories
2. **Follow-up Responses**: Verify correct follow-up questions
3. **Alumni Matching**: Check match scores and relevance
4. **Connection Flow**: Test connection request functionality
5. **Free Text Input**: Try various custom messages
6. **Refine Search**: Test search refinement feature

### Sample Test Cases

```
Test 1: Career Guidance Flow
- Select "Career Guidance"
- Choose "Software Development"
- Verify alumni with software roles appear

Test 2: Company Search
- Select "Company Insights"
- Choose "Google"
- Verify Google employees are prioritized

Test 3: Skill Matching
- Select "Skill Development"
- Choose "Machine Learning"
- Verify alumni with ML expertise appear
```

## Deployment

1. Ensure all three files are in the project root
2. Update navigation links in all existing pages
3. Test chatbot functionality
4. Deploy with rest of the application

## Support

For issues or questions:
- Check console for JavaScript errors
- Verify localStorage is enabled
- Ensure all CSS files are loaded
- Test in different browsers

---

**Built for JITConnect** - Connecting students with alumni through intelligent matching 🎓
