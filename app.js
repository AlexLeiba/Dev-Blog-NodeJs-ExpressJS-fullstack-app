require('dotenv').config(); // to have access to the .env file
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/models.db/dbConnection');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const session = require('express-session');

const app = express();

const PORT = process.env.PORT || 5002;

// Connect to the database mongoDB
connectDB();

app.use(express.urlencoded({ extended: true })); //used to pass data through body
app.use(express.json()); // to parse JSON bodies into JSON format

app.use(cookieParser());
app.use(
  session({
    secret: 'session secret word',
    resave: false,
    saveUninitialized: true,
    store: mongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
  // cookie:{}
);

// Templating engine/ MIDDLEWARE / LAYOUTS
app.use(expressLayouts);

// Set the layout for all the views
app.set('layout', './layout/layout');

// Set the view engine "NODE" to work with JAVASCRIPT
app.set('view engine', 'ejs');

// Set the public folder as the static folder
app.use(express.static('public'));

//WHERE ALL THE ROUTES ARE
app.use('/', require('./server/routes/routes'));

// AUTH ROUTES
app.use('/auth', require('./server/routes/auth'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
