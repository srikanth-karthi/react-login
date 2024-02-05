import express from 'express';
import cors from 'cors';

import { connectDB } from './config/mongodb.js';
import User from './model/userdata.js';

const app = express();
const port = 8080;
app.use(cors())

// Middleware to parse JSON in the request body
app.use(express.json());

connectDB();

app.post('/login', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log(existingUser)

    if (!existingUser) {
      return res.status(404).json({ error: 'Email not found' });
    }


  if (existingUser.password!== req.body.password) {
      return res.status(401).json({ error: 'Wrong password' });
    }

    res.status(200).json({ message: 'Login successful', user: existingUser });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/register', async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

  

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'Registration successful', user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
