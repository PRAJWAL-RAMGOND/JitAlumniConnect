# JITConnect Backend API

Backend server for JITConnect - College Social Network Platform

## 🚀 Deployment

### Quick Deploy to Render
See [QUICK-START.md](QUICK-START.md) for 5-minute deployment guide.

### Detailed Guide
See [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) for complete deployment instructions.

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Setup
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
nano .env

# Start development server
npm run dev
```

### Environment Variables
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users (admin)
- `DELETE /api/admin/users/:id` - Delete user (admin)

---

## 🗄️ Database

### MongoDB Collections
- `users` - User accounts
- `posts` - User posts
- `jobs` - Job listings
- `messages` - Direct messages
- `notifications` - User notifications
- `announcements` - Platform announcements
- `events` - Campus events
- `research` - Research projects

---

## 🔒 Security

- JWT authentication
- Password hashing with bcrypt
- CORS enabled
- Input validation
- Rate limiting (recommended for production)

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Validation:** express-validator
- **File Upload:** Multer

---

## 🌐 Production URLs

After deployment on Render:
- **API Base:** `https://jitconnect-backend.onrender.com`
- **Health Check:** `https://jitconnect-backend.onrender.com/`

---

## 📝 Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Ensure database user has correct permissions

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📄 License

ISC

---

## 👥 Support

For deployment help, see:
- [QUICK-START.md](QUICK-START.md) - Fast deployment guide
- [RENDER-DEPLOYMENT.md](RENDER-DEPLOYMENT.md) - Detailed deployment guide
