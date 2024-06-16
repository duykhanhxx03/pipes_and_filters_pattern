const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const targetPort = 3005;
const targetServer = 'http://localhost';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json())

app.use( async (req, res, next)=> {
  console.log(req.body);
    axios({
        url: `${targetServer}:${targetPort}`,
        data: {
            ...req.body,
            "filter_2":"OK",
        }
      })
        .then(response => res.json(response.data))
        .catch(error => {
          console.error(error);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
    
});

app.listen(3004);
