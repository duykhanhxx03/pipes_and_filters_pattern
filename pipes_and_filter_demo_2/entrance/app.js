const axios = require('axios');
const fs = require('fs');

const imgs = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
];

for(var fileName of imgs){
    const image = fs.readFileSync(`./samples/${fileName}`);
    const base64Image = Buffer.from(image).toString('base64');

    axios
    .post('http://localhost:3002/transpose', { image: base64Image })
    .then((response)=>{
        console.log(response.data);})
    .catch((error) => {
        console.log('error:', error);
    });
}


    
  

