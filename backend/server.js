require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');

/* const subscribersRouter = require('./routes/subscribers'); */
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
/* mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); */
/* mongoose.connect('mongodb://localhost/subscribers'); */
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(express.json());

/* app.use('/subscribers', subscribersRouter); */
app.use('/colors/users', userRoutes);
app.use('/colors/posts', postRoutes);

app.listen(3000, () => console.log('Server has started'));
