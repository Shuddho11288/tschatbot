// app.js
const express = require('express');
const axios = require('axios');
let cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// Serve the HTML file
app.use(express.static('public'));

// Define an endpoint to communicate with SimSimi API
app.get('/api/simsimi', async (req, res) => {
  const { text } = req.query;
  try {

    var url = 'https://api.simsimi.vn/v2/simtalk'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'text='+text+'&lc=bn'
  })
  .then((response) => response.json())
  .then((data) => {
      res.json(data);
  });


  } catch (error) {
    res.status(500).json({ error: 'An error occurred while communicating wiv th SimSimi.'+error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
