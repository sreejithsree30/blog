// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Routes
// import authRoutes from './routes/auth.js';
// import postRoutes from './routes/posts.js';

// // Load environment variables
// dotenv.config();

// // Create Express app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Get current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173', // Vite's default dev server
//   credentials: true
// }));

// // Serve uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // API routes
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);

// // Connect to MongoDB
// const connectDB = async () => {
//   try {
//     const mon = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-platform');
//     console.log(process.env.MONGODB_URI + 'MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Serve frontend build files
//   app.use(express.static(path.join(__dirname, '../dist')));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
//   });
// }

// // Start server
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });



import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.error('MongoDB connection error:', err));
