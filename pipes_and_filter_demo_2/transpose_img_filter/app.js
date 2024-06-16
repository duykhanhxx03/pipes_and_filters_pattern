const sharp = require('sharp');
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3002;

// app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const brightness = 1.2;  // Độ sáng (giá trị > 1 làm tăng độ sáng, < 1 làm giảm độ sáng)
const saturation = 1.5;  // Độ bão hòa màu (giá trị > 1 làm tăng bão hòa, < 1 làm giảm bão hòa)
const hue = 30;         // Góc màu (đổi màu theo góc, ví dụ: 0 là màu gốc, 180 là hoán đổi màu)


app.post('/transpose', (req, res) => {
  res.json({
    "transpose":"came"
  })
  const imageData = req.body.image;

  const imageBuffer = Buffer.from(imageData, 'base64');
  sharp(imageBuffer)
  .modulate({ brightness: brightness, saturation: saturation, hue: hue })
  .toBuffer()
  .then((outputBuffer) => {
    const outputBase64 = outputBuffer.toString('base64');
    axios.post('http://localhost:3001/rm-exif-metadata', { image: outputBase64 })
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


