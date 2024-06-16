const sharp = require('sharp');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const options = {
  quality: 50, 
};

app.post('/compress', (req, res) => {
  res.json({
    "compress":"came"
  })
  const imageData = req.body.image;
  const imageBuffer = Buffer.from(imageData, 'base64');
  sharp(imageBuffer)
  .jpeg(options)
  .toBuffer()
  .then((outputBuffer) => {
  const outputBase64 = outputBuffer.toString('base64');
  axios.post('http://localhost:8080/datasink', { image: outputBase64 })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
      console.log('error:', error);
  });
})
.catch((error) => {
  console.log('error:', error);
});
});

app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});