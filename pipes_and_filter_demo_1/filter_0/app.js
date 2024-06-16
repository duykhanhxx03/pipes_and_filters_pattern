const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const targetPort = 8080;
const targetServer = 'http://localhost';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json())

app.use( async (req, res, next)=> {
    axios({
        url: `${targetServer}:${targetPort}`,
        data: {
            ...req.body,
            "filter_0":"OK",
        }
      })
        .then(response => res.json(response.data))
        .catch(error => {
          console.error(error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
    // res.send("sent");
});

app.listen(3000);
