// server.js

const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use('/', async (req, res) => {
  const url = 'https://subport.infura-ipfs.io/2FfGg0sPAcLotHFPEDKGlsejaTY';

  const response = await fetch(url, {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000', // Replace with your actual client origin
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });

  const data = await response.text();

  res.send(data);
});

app.listen(5001, () => {
  console.log('Proxy server running on port 5001');
});
