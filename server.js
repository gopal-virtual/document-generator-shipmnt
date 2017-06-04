const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const cors = require('cors')

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.get('/get/meta', function (req, res) {
    fs.readFile('src/data/data.json', 'utf8', function(err, data) {
        if (!err) {
            data = { 
                templateList : JSON.parse(data).templateList,
                recentDocuments : JSON.parse(data).recentDocuments
            }
            res.writeHead(200, {
                'Content-Type': 'text/json'
            });
            return res.end(JSON.stringify(data))
        } else {
            res.writeHead(400, {
                'Content-Type': 'text/json'
            });
            return res.end("File write error" + err)
        }
    });
})

app.get('/get/doc', function(req, res) {
  fs.readFile('src/data/data.json', 'utf8', function(err, data) {
      if (!err) {
          data = JSON.parse(data).docs[req.query.id]
          if(data){
            res.writeHead(200, {
              'Content-Type': 'text/json'
            });
            return res.end(JSON.stringify(data))
          }
          else{
            res.writeHead(404);
            return res.end("Document not found")  
          }

      } else {
          res.writeHead(400, {
              'Content-Type': 'text/json'
          });
          return res.end("File write error" + err)
      }
  });  
})



app.listen(9000);