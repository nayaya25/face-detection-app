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

app.get('/', (req, res) => {
    res.send('Its Working');
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => { 
    console.log("App listening at port ", PORT);
})