const {getBalletShowItems, getBalletShowItem, addBalletShowItem, changeBalletShowItem, getContacts, addContacts, changeContacts} = require('./db');
let path = require('path');
const express = require('express');
const multer = require("multer");
const app = express();
const http = require("http");
const fs = require("fs");

// // работает
// const upload = multer({dest:"uploads"});
// app.use(express.static(__dirname));
// app.post("/api/upload", upload.single("filedata"), function (req, res, next) {
//
//   let filedata = req.file;
//
//   console.log(filedata);
//   if(!filedata)
//     res.send("Ошибка при загрузке файла");
//   else
//     // res.send("Файл загружен");
//     res.send(filedata);
// });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "uploads"))
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
//
// const upload = multer({ storage: storage })
//
// app.post("/api/upload", upload.single("filedata"), function (req, res, next) {
//
//   let filedata = req.file;
//
//   console.log(filedata);
//   if(!filedata)
//     res.send("Ошибка при загрузке файла");
//   else
//     // res.send("Файл загружен");
//     res.send(filedata);
// });



// test2

// //app.use("/image", express.static("image"));
// let imageName = "";
// const storage = multer.diskStorage({
//   destination: path.join("uploads"),
//   filename: function (req, file, cb) {
//     imageName = Date.now() + path.extname(file.originalname);
//     cb(null, imageName);
//   },
// });
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 3000000 },
// }).single("filedata");
// app.post("/api/upload", (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       return res.status(201)
//         // .json({ url: "http://link to domains/marketplace-api/rest-api/image/" + imageName });
//         .json(imageName );
//     }
//   });
// });

// end test2




// test
// Specifies the file upload location
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"../assets/uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Create function upload with multer
const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1024 * 1024 * 25, // Max file size 25MB
  },
});

// Create function to delete file
const deleteFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err);
      throw new Error("Failed to delete file");
    }
  });
};


const acceptedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "video/mp4",
  "video/quicktime",
  "video/webm",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

// Membuat fungsi validasi file
const validateFileTypes = (file) => {
  if (!acceptedFileTypes.includes(file.mimetype)) {
    return false;
  }
  return true;
};

app.post("/api/upload", upload.single("filedata"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      message: "File not found!",
    });
  } else if (!validateFileTypes(file)) {
    deleteFile(file);
    return res.status(400).json({
      message: "Unsupported file format",
    });
  }

  return res.status(200).json({
    message: "File uploaded succesfully",
    data: {
      // url: `${HOST}:${PORT}/uploads/${file.filename}`,

      url: `/assets/uploads/${file.filename}`,
    },
  });
});
//
// app.get("/api/uploads/:filename", (req, res) => {
//   const file = req.params.filename;
//   console.log('file', file);
//   const filePath = path.join(__dirname, "uploads", file);
//
//   if (!fs.existsSync(filePath)) {
//     return res.status(404).json({
//       message: "File not found",
//     });
//   }
//
//   return res.sendFile(filePath);
// });

// and test








app.use(express.json()) // for parsing application/json

// app.use(express.static(__dirname));
// app.use(multer({dest:"uploads"}).single("filedata"));

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

// app.post("/upload", upload.single("filedata"), function (req, res, next) {
//
//   let filedata = req.file;
//
//   console.log(filedata);
//   if(!filedata)
//     res.send("Ошибка при загрузке файла");
//   else
//     res.send("Файл загружен");
// });


// app.get('/api', function (req, res) {
//   // res.sendFile(path.resolve(__dirname + '/../public/index.html'));
//   res.send('test');
// });

// Номера баллета

app.get('/api/getBalletShowItems', function (req, res) {
  getBalletShowItems((data)=> {
    res.send(data);
  })
});

app.post('/api/getBalletShowItem', function (req, res) {
  getBalletShowItem(req.body.id, (data) => {
    res.send(data);
  })
});

app.post('/api/addBalletShowItem', function (req, res) {
  console.log('req', req.body)
  addBalletShowItem(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

app.post('/api/changeBalletShowItem', function (req, res) {
  console.log('req', req.body)
  changeBalletShowItem(req.body.data, (err, results)=> {
    // res.send('true');
    res.send({err, results});
  })
});

// Номера баллета КОНЕЦ

// Страница КОНТАКТЫ
app.get('/api/getContacts', function (req, res) {
  getContacts((data)=> {
    res.send(data);
  })
});

app.post('/api/addContacts', function (req, res) {
  console.log('req', req.body)
  addContacts(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

app.post('/api/changeContacts', function (req, res) {
  console.log('req', req.body)
  changeContacts(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

// Страница КОНТАКТЫ КОНЕЦ


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
