const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const Knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const controllers = require('./controllers/controllers')


const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const db = Knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'smart-brain'
    }
})

app.get('/', (req, res) => {
    res.json({"Home": "home"});
})

app.post('/signin', (req, res) => { controllers.handleSignIn(req, res, db, bcrypt) });

app.post('/signup', (req, res) => { controllers.handleSignUp(req, res, db, bcrypt) })

app.put('/image', (req, res) => { controllers.handleImageCount(req, res, db) }) 

app.get('/profile/:id', (req, res) => { controllers.handleProfile(req, res, db) })


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log("App listening at port ", PORT);
})