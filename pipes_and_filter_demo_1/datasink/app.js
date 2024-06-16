const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json())

app.use(async (req, res, next)=> {
    res.json(req.body);
});

app.listen(3005);
