require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

// connect to database
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// set headers for requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,DELETE,POST,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

// make server accept json
app.use(express.json());

// use routes
app.use('/colors/auth', authRoutes);
app.use('/colors/users', userRoutes);
app.use('/colors/posts', postRoutes);

app.listen(5000, () => console.log('Server has started'));
