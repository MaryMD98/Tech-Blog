require('dotenv').config({ path: require('find-config')('.env') });
const path = require('path');
const express = require('express');

const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'secrets',
    cookie: {
        maxAge: 120000,
    },
    httpOnly: false,
    resave:true,
    rolling: true,
    saveUninitialized: false,
    store: new SequelizeStore({ db:sequelize, checkExpirationInterval:120000 }),
}

app.use(session(sess));

const hbs = exphbs.create({ helpers});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

// need to set up routes in controllers and api folder
app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`APP listening to port ${PORT}`));
})