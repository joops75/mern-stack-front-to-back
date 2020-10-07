const express = require('express');
const connectDB = require('./config/db');
const app = express();

// connect database
connectDB();

// Init middleware
app.use(express.json()); // for parsing application/json, based on body-parser
app.use(express.urlencoded({ extended: false })); // for parsing of strings/arrays only, based on body-parser

// define api routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
