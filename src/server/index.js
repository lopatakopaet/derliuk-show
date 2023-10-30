const {getAll, addBalletShowItems} = require('./db');
let path = require('path');
const express = require('express');
const app = express();
const http = require("http");
app.use(express.json()) // for parsing application/json

let server;
if(process.env.ENV === 'prod') {
  // const privateKey  = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8');
  // const certificate = fs.readFileSync(process.env.CERTIFICATE, 'utf8');
  // const credentials = {key: privateKey, cert: certificate};
  // server = https.createServer(credentials, app)
} else {
  server = http.createServer(app)
}
server.listen(process.env.PORT || 8080)

// app.get('/api', function (req, res) {
//   // res.sendFile(path.resolve(__dirname + '/../public/index.html'));
//   res.send('test');
// });

app.get('/api/getAll', function (req, res) {
  getAll((data)=> {
    res.send(data);
  })
});
app.post('/api/addBalletShowItems', function (req, res) {
  console.log('req', req.body)
  res.json(req.body)
  addBalletShowItems( req.body, (data)=> {
    res.send('true');
  })
});


// app.get("/youroute", (req, res, next) => {
//   "use strict";
//   const getProduct = "SELECT * FROM yourtable";
//   database.query(getProduct, (err, rows, fields) => {
//     if (err) {
//       res.status(500).send({ error: 'Something failed!' })
//     };
//     res.status(200).json({
//       message: "",
//       product: rows,
//     });
//   });
// });

// router.post('/event', (req, res, next) => {
//   db.query(
//     'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
//     [owner, req.body.name, req.body.description, new Date(req.body.date)],
//     (error) => {
//       if (error) {
//         console.error(error);
//         res.status(500).json({status: 'error'});
//       } else {
//         res.status(200).json({status: 'ok'});
//       }
//     }
//   );
// });


// router.put('/event/:id', function (req, res, next) {
//   db.query(
//     'UPDATE events SET name=?, description=?, date=? WHERE id=? AND owner=?',
//     [req.body.name, req.body.description, new Date(req.body.date), req.params.id, owner],
//     (error) => {
//       if (error) {
//         res.status(500).json({status: 'error'});
//       } else {
//         res.status(200).json({status: 'ok'});
//       }
//     }
//   );
// });
