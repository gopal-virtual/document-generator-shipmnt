const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs')
const cors = require('cors')

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', Home);
app.get('/get/meta', getMeta)
app.get('/get/doc', getDoc)
app.patch('/patch/doc', patchDoc)
app.post('/create/doc', createDoc)
app.get('/edit/:id', Home)

function Home (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
}

function getMeta(req, res) {
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
}

function getDoc(req, res) {
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
}

function patchDoc(req, res) {
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

                  for(var i = 0, length = data.recentDocuments.length - 1; i<=length; i++){
                    if(data.recentDocuments[i].id == reqData.id){
                      data.recentDocuments[i].name = reqData.data.meta.name
                    }
                  }

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
}

function createDoc(req, res) {
    var reqData = '';

    req.on('data', function(streamData) {
        reqData += streamData;
    });

    req.on('end', function() {
        fs.readFile('src/data/data.json', 'utf8', function(err, data) {
            if (!err) {

                  data = JSON.parse(data)

                  reqData = JSON.parse(reqData)

                  var newDoc = Object.assign({},data.docs[reqData.id], {
                        meta : Object.assign({}, data.docs[reqData.id].meta)
                      }),
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
}

var server = app.listen(9000, 'localhost', function() {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)

})
