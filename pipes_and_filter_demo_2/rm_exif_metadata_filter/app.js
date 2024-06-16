const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { uuid } = require('uuidv4');

const ExifTransformer = require('exif-be-gone')

const fs = require('fs');
const { Buffer } = require('buffer');

const app = express();
const port = 3001;

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/rm-exif-metadata', (req, res) => {
    res.json({
        "rm-exif-metadata":"came"
    })
    const imageData = req.body.image;
    const imageBuffer = Buffer.from(imageData, 'base64');

    const tempFilePath = `./temps/${uuid()}.jpg`;
    fs.writeFileSync(tempFilePath, imageBuffer);
    const reader = fs.createReadStream(tempFilePath);
    const writer = fs.createWriteStream(tempFilePath);

    reader.pipe(new ExifTransformer()).pipe(writer)

    const image = fs.readFileSync(tempFilePath);

    const base64Image = Buffer.from(image).toString('base64');
    axios.post('http://localhost:3000/compress', { image: base64Image })
    .then((response) => {
        console.log(response.data);
        fs.unlink(tempFilePath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('delete temp file successfully!.');
          });
    })
    .catch((error) => {
        console.log('error:', error);
    });

    
})

app.listen(port, () => {
  console.log(`listen at http://localhost:${port}`);
});


