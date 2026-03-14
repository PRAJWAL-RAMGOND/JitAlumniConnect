/**
 * Script to automatically add toast notification imports to HTML files
 * Run with: node add-toast-to-html.js
 */

const fs = require('fs');
const path = require('path');

// HTML files to update
const htmlFiles = [
    'login.html',
    'dashboard.html',
    'admin-new.html',
    'admin.html',
    'profile.html',
    'jobs.html',
    'messages.html',
    'explore.html',
    'connections.html',
    'chatbot.html'
];

// Toast imports to add
const toastImports = `    <!-- Toast Notifications -->
    <link rel="stylesheet" href="toast-notifications.css">
    <script src="toast-notifications.js"></script>`;

// Process each HTML file
htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${filename} - file not found`);
        return;
    }
    
    // Read file content
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if toast imports already exist
    if (content.includes('toast-notifications.css')) {
        console.log(`✓  ${filename} - already has toast imports`);
        return;
    }
    
    // Find </head> tag and insert before it
    if (content.includes('</head>')) {
        content = content.replace('</head>', `${toastImports}\n</head>`);
        
        // Write updated content back to file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓  ${filename} - toast imports added`);
    } else {
        console.log(`⚠️  ${filename} - no </head> tag found`);
    }
});

console.log('\n✅ Done! Toast imports added to HTML files.');
console.log('\nNext steps:');
console.log('1. Review the changes');
console.log('2. Test locally: npm start');
console.log('3. Commit: git add . && git commit -m "Add toast notifications"');
console.log('4. Deploy: git push origin main');
