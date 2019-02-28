const express = require('express');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const Knex = require('knex');



const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const dummyData = {
    users: [
        {
            id: 321,
            name: 'nayaya ibrahim',
            email: 'nayaya@gmail.com',
            password: 'nayaya',
            entries: 0,
            joined: new Date()
        },
        {
            id: 132,
            name: 'yusuf bashir',
            email: 'ybn@gmail.com',
            password: 'ybn',
            entries: 0,
            joined: new Date()
        },
        {
            id: 213,
            name: 'aliyu bashir',
            email: 'ali@gmail.com',
            password: 'ali',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send('THE ROOT ENDPOINT IS WORKING');
})

app.post('/signin', (req, res) => {
    if (req.body.email === dummyData.users[0].email && req.body.password === dummyData.users[0].password) {
        res.send('Logged in Successfully');
    } else {
        res.status(400).json("Invalid Credentials");
    }
    });

app.post('/register', (req, res) => {
    const { name, emal, password } = req.body;
    dummyData.users.push(
        {
            id: '123',
            name: name,
            email: emal,
            entries: 0,
            password: password,
            joined: new Date()
        }
    )

    res.send(dummyData.users)
})

app.put('/image/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    dummyData.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            res.json(user.entries);
            found = true;
        }
        if (!found) {
            res.status(404).json("No entries for this user")
        }
    })
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    console.log('the id received is : ', id);
    dummyData.users.map((user) => {
        if (user.id === id) {
            user.entries++;
            found = true;
            return res.send("The entries from the array is :", user.entries)
        }
    })

    if (!found) {
        res.status(404).json("Record not found");
    }

})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log("App listening at port ", PORT);
})