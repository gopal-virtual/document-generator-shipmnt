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
            return res.end("File read error" + err)
        }
    });
})

app.get('/get/doc', function(req, res) {
  fs.readFile('src/data/data.json', 'utf8', function(err, data) {
      if (!err) {
          data = JSON.parse(data).docs[req.query.id]
          data.meta['id'] = req.query.id
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
          return res.end("File read error" + err)
      }
  });  
})

app.patch('/patch/doc', function(req, res) {
    var reqData = '';

    req.on('data', function(streamData) {
        reqData += streamData;
    });

    req.on('end', function() {
        fs.readFile('src/data/data.json', 'utf8', function(err, data) {
            if (!err) {

                  data = JSON.parse(data)

                  reqData = JSON.parse(reqData)

                  data.docs[reqData.id] = reqData.data;

                  data = JSON.stringify(data)
               
                  fs.writeFile('src/data/data.json', data, 'utf8', function(err) {
                      if (!err) {
                          res.writeHead(200, {
                              'Content-Type': 'text/json'
                          });
                          res.end(JSON.stringify(reqData.data))
                      } else {
                          res.writeHead(400, {
                              'Content-Type': 'text/json'
                          });
                          res.end("File write error" + err)
                      }
                  })

            } else {
                res.writeHead(400, {
                    'Content-Type': 'text/json'
                });
                return res.end("File write error" + err)
            }
        });
    })
})

app.post('/create/doc', function(req, res) {
    var reqData = '';

    req.on('data', function(streamData) {
        reqData += streamData;
    });

    req.on('end', function() {
        fs.readFile('src/data/data.json', 'utf8', function(err, data) {
            if (!err) {

                  data = JSON.parse(data)

                  reqData = JSON.parse(reqData)

                  var newDoc = data.docs[reqData.id],
                      id = new Date().valueOf()
                      newDoc.meta['id'] = id



                  data.docs[id] = newDoc
                  data.recentDocuments.push({ id : id, name : newDoc.meta.name })
                  data = JSON.stringify(data)

                  fs.writeFile('src/data/data.json', data, 'utf8', function(err) {
                      if (!err) {
                          res.writeHead(200, {
                              'Content-Type': 'text/json'
                          });
                          res.end(JSON.stringify(newDoc))
                      } else {
                          res.writeHead(400, {
                              'Content-Type': 'text/json'
                          });
                          res.end("File write error" + err)
                      }
                  })

            } else {
                res.writeHead(400, {
                    'Content-Type': 'text/json'
                });
                return res.end("File write error" + err)
            }
        });
    })
})



app.listen(9000);