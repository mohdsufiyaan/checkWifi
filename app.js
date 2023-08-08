const scanner = require('node-wifi-scanner');
const express = require('express');
const wifi = require('node-wifi');
const app = express();

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });

app.get('/', async (req, res) => {
    scanner.scan((err, networks) => {
  if (err) {
    console.error(err);
    res.status(500).json({Error : err});
    return;
  }
  res.status(200).json({name : networks});
  console.log(networks);
})
});

app.get('/connectData', async (req, res) => {
  
  wifi.getCurrentConnections((error, currentConnections) => {
  if (error) {
    console.log(error);
    res.status(500).json({Error : error});
  } else {
    console.log(currentConnections);
    res.status(200).json({name : currentConnections});
  }
});
});

const port = 3003;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});