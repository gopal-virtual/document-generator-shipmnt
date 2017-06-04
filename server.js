const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/get/data', function (req, res) {
    fs.readFile('src/data/data.json', 'utf8', function(err, data) {
        if (!err) {
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            res.end(data)
        } else {
            res.writeHead(400, {
                'Content-Type': 'text/json'
            });
            res.end("File write error" + err)
        }
    });
})



app.listen(9000);