const https = require("https");
const express = require("express");
const request = require("request");
const fs = require("fs");
const app = express();
const port = 4443; // Port for HTTPS (default for HTTPS is 443)
// Endpoint to stream data from the external URL
app.get("/", (req, res) => {
  const externalUrl = "https://www.example.com/some-large-file.txt";
  const externalStream = request.get(externalUrl);
  res.setHeader("Content-Type", "application/octet-stream");
  externalStream.pipe(res);
  externalStream.on("error", (err) => {
    res.status(500).send("Internal Server Error");
  });
});
/*
const privateKeyPath = './certificates/private-key.pem';
const certificatePath = './certificates/certificate.pem';
 */
/**
const privateKeyPath = '/mnt/c/Users/rocha/cert-key.pem';
const certificatePath = '/mnt/c/Users/rocha/cert.pem';
 */

// Create an HTTPS server using the provided certificates
const options = {
  key: fs.readFileSync(privateKeyPath),
  cert: fs.readFileSync(certificatePath),
};
// Start the HTTPS server
const server = https.createServer(options, app);
server.listen(port, () => {
  console.log(`HTTPS server running on https://localhost:${port}`);
});
