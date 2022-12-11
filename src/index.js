const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const flash = require('connect-flash');
const logout = require('express-passport-logout');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars)

//Inicialización General
const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middleware
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/producto'));
app.use(require('./routes/users'));

//Variables Globales

//Static files
app.use(express.static(path.join(__dirname, '/public')));

//Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto', app.get('port'))
});