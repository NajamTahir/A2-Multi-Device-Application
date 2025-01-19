const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb://localhost:27017/userDatabase';

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' folder

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
// Sign Up
app.post('/signup', async (req, res) => {
  console.log(req.body); // Logs incoming data
  try {
    const { username, password, phone, age, gender } = req.body;
    const newUser = new User({ username, password, phone, age, gender });
    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).send('Error signing up: ' + err.message);
  }
});


// Sign In
app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.status(200).send('Sign in successful!');
    } else {
      res.status(401).send('Invalid username or password.');
    }
  } catch (err) {
    res.status(500).send('Error signing in: ' + err.message);
  }
});

const cartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// API route to add items to the database
app.post('/add-to-cart', async (req, res) => {
  const { name, price } = req.body;

  try {
    const newItem = new CartItem({ name, price });
    await newItem.save();
    res.status(200).send({ message: 'Item added to cart in database!' });
  } catch (error) {
    res.status(500).send({ message: 'Error adding item to database!', error });
  }
});

// API route to get all items from the database
app.get('/cart-items', async (req, res) => {
  try {
    const items = await CartItem.find();
    res.status(200).send(items);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching items!', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
