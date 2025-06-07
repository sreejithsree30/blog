// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import { authenticate } from '../middleware/auth.js';

// const router = express.Router();

// // 🔐 Generate JWT Token
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your-secret-key', {
//     expiresIn: '1d'
//   });
// };

// // 🍪 Set Token in HTTP-Only Cookie
// const setTokenCookie = (res, token) => {
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000, // 1 day
//     sameSite: 'Lax',
//   });
// };

// // ✅ Register
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }

//     // Create user
//     const newUser = new User({ email, password });
//     await newUser.save();

//     // Generate token & set cookie
//     const token = generateToken(newUser._id);
//     setTokenCookie(res, token);

//     res.status(201).json({
//       message: 'User registered successfully',
//       newUser: {
//         id: newUser._id,
//         email: newUser.email
//       }
//     });
//   } catch (error) {
//     console.error('Register error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Match password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate token & set cookie
//     const token = generateToken(user._id);
//     setTokenCookie(res, token);

//     res.json({
//       message: 'Login successful',
//       user: {
//         id: user._id,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Login error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // ✅ Logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('token');
//   res.json({ message: 'Logout successful' });
// });

// // ✅ Verify (Protected Route)
// router.get('/verify', authenticate, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select('-password');
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({
//       user: {
//         id: user._id,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Verify error:', error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;



import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
    res.status(201).json({ message: 'User registered', user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
    res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;