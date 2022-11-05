const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

sequelize = require('./config/connection');
const SequelizeStore = require('connect=session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: process.env.SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const hbs = exphbs.create({ helpers });
const helpers = require('./utils/helpers');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening!'));
});
