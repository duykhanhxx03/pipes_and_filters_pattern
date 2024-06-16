const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/datasink', (req, res) => {
  const currentDateTime = new Date();
  const imageData = req.body.image;

  const imageBuffer = Buffer.from(imageData, 'base64');

  const fileName = `${currentDateTime.getTime().toString()}.jpg`;
  const filePath = path.join(__dirname,'uploads', fileName);

  fs.writeFile(filePath, imageBuffer, (err) => {
    if (err) {
      console.log('image saving failled:', err);
      res.status(500).json({ error: `image saving failled: ${err}` });
    } else {
      console.log('saved successfully:', filePath);
      res.json({ message: 'successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});