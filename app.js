require('dotenv').config(); // to have access to the .env file
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/models.db/dbConnection');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const session = require('express-session');

// Connect to the database mongoDB
connectDB();

const app = express();

const PORT = process.env.PORT || 5002;

//used to pass data through body
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
// to parse JSON bodies into JSON format

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

// Set the layout for all the views, will automatically be used by all the routes, as its used in the middleware(before the pages are rendered)
app.set('layout', './layout/layout');

// EJS is the templating engine used in the views
app.set('view engine', 'ejs');

// Set the public folder as the static folder
app.use(express.static('public'));

//BLOGS ROUTES
app.use('/', require('./server/routes/routes'));

// AUTH ROUTES
app.use('/auth', require('./server/routes/auth'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
