const express = require('express');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Init
const app = express();
require('./config/database');

// Settings
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middlewares
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'mysecretapp',
  resave: true,
  saveUninitialized: true
}));

// Global Variables

// Routes
app.use('/', require('./routes/index'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/categories', require('./routes/categories'));

// Static Files

// Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

