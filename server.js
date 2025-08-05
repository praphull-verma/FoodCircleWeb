const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const donations = [];
const users = []; // In-memory user storage
const foodRequests = []; // In-memory food requests

app.use(cors());
app.use(bodyParser.json());

// Test route
app.get('/api/test', (req, res) => {
  res.send('🚀 Server is working on Vercel!');
});

// Donation route
app.post('/api/donate', (req, res) => {
  const { description, quantity, address } = req.body;

  if (!description || !quantity || !address) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newDonation = {
    id: donations.length + 1,
    description,
    quantity,
    address,
    timestamp: new Date()
  };

  donations.push(newDonation);
  res.status(201).json({ message: 'Donation request received', request: newDonation });
});

// Get all donations
app.get('/api/requests', (req, res) => {
  const sortedDonations = donations.sort((a, b) => b.timestamp - a.timestamp);
  res.json(sortedDonations);
});

// Signup route
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'User with this email already exists.' });
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);

  res.status(201).json({ message: `Welcome, ${name}! Signup successful.` });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  res.json({ message: `Welcome back, ${user.name}!` });
});

// Food request route
app.post('/api/request-food', (req, res) => {
  const { requesterName, contactInfo, location, quantity, notes } = req.body;

  if (!requesterName || !contactInfo || !location || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const newRequest = {
    id: foodRequests.length + 1,
    requesterName,
    contactInfo,
    location,
    quantity,
    notes: notes || '',
    timestamp: new Date()
  };

  foodRequests.push(newRequest);
  res.status(201).json({ message: 'Food request received', request: newRequest });
});

// Get all food requests
app.get('/api/food-requests', (req, res) => {
  const sortedRequests = foodRequests.sort((a, b) => b.timestamp - a.timestamp);
  res.json(sortedRequests);
});

// Export for Vercel serverless
module.exports = app;
