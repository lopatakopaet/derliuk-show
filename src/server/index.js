const {
  orderShow,
  getMainPage,
  changeMainPage,
  getMostPopularItems,
  getBalletShowItem,
  addBalletShowItem,
  changeBalletShowItem,
  deleteItem,
  deleteAndChangePositionItem,
  changeItemPosition,
  getContacts,
  addContacts,
  changeContacts,
  getGallery,
  addGalleryItem,
  changeGalleryItem,
  changeGalleryItemPosition,
  deleteGalleryItem,
  getRiderData,
  addRiderData,
  changeRiderData,
  getComments,
  addComment,
  changeComment,
  deleteComment,
  getSliderGalleryItems,
  addSliderGalleryItem,
  changeSliderGalleryItem,
  deleteSliderGalleryItem,
} = require('./db');
let path = require('path');
const express = require('express');
const multer = require("multer");
const app = express();
const http = require("http");
const fs = require("fs");
const cors = require('cors')

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

app.use(cors())
// Specifies the file upload location
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // для прода
    cb(null, path.join(__dirname,"../public_html/assets/uploads"));
    // для локалки
    // cb(null, path.join(__dirname,"../assets/uploads"));
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
      // throw new Error("Failed to delete file");
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

app.use(express.json()) // for parsing application/json

app.post("/api/deleteFile",function (req, res, next) {
  // для локалки
  // let filePath = path.join(__dirname, `../${req.body.data.filePath}`);
  // для прода
  let filePath = path.join(__dirname, `../public_html${req.body.data.filePath}`);
 let status;
 let message;
  fs.unlink(filePath, (err, success) => {
    if (err) {
      console.error(err);
      status = 500;
      message = "Filed delete file"
      next(err)
    } else {
      status = 200;
      message = "File deleted"
      res.send(success)
    }
  });
  // return res.status(status).json({
  //   message: message,
  // });
})

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
    message: "File uploaded successfully",
    data: {
      // url: `${HOST}:${PORT}/uploads/${file.filename}`,

      url: `/assets/uploads/${file.filename}`,
    },
  });
});

let server;
if(process.env.ENV === 'prod') {
} else {
  server = http.createServer(app)
}
const start = () =>  {
  try {
    server.listen(process.env.PORT || 8080, ()=> console.log(`Server started on port ${process.env.PORT || 8080}`))
  } catch (e) {
    console.log(e)
  }
}
start();

// const auth = function (req, res, next) {
//   console.log('req', req)
//   // var user = basicAuth(req);
//   let user = {
//     name: 'amy',
//     pass: 'passwd123',
//   };
//
//   if (!user || !user.name || !user.pass) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     res.sendStatus(401);
//   }
//   if (user.name === 'amy' && user.pass === 'passwd123') {
//     next();
//   } else {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     res.sendStatus(401);
//   }
// }

function authentication(req, res, next) {
  const authheader = req.headers.authorization;
  console.log('authheader', authheader);

  if (!authheader) {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err)
  }
  // const auth = new Buffer.from(authheader.split(' ')[1],
  //   'base64').toString().split(':');
  const auth = new Buffer.from(authheader.split(' ')[1],
    'base64').toString().split(' ')[1].split(':');

  console.log('auth', auth);
  const user = auth[0];
  const pass = auth[1];

  if (user == 'admin' && pass == 'pass') {

    // If Authorized user
    // next();
    res.status(200).json({
      msg: "Login ok",
    });
  } else {
    let err = new Error('You are not authenticated!');
    // res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    // return next(err);
    // return next(err);
        res.status(401).json({
          msg: "Login error",
    });
  }
}

function adminLogin(req, res, next) {
  const data = req.body.data;

  if (!data) {
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err)
  }

  const user = data.user;
  const pass = data.pass;

  if (user == 'admin' && pass == 'pass') {
  let hash = btoa(`Basic ${user}:${pass}`)
    // If Authorized user
    res.status(200).json({
      msg: "Login ok",
      hash: hash
    });
  } else {
    let err = new Error('You are not authenticated!');
    err.status = 401;
    res.status(401).json({
      msg: "Login error",
    });
  }
}

app.post('/api/adminLogin', function (req, res, next) {
  adminLogin(req, res, next);
});

app.post('/api/orderShow', function (req, res, next) {
  orderShow(req.body.data, (err, success) => {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  });
});

// ГЛАВНАЯ БАЛЕТ
app.get('/api/getMainPage', function (req, res, next) {
  getMainPage(req.query.tableName, (err, success) => {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  });
})

app.post('/api/changeMainPage',  function (req, res, next) {
  console.log('adf',req.body.data);
  changeMainPage(req.body.data, (err, success) => {
    if (err) {
      res.send(err)
      next(err);
    } else {
      res.send(success)
    }
  })
});

// ГЛАВНАЯ БАЛЕТ КОНЕЦ

// Номера баллета

app.get('/api/getMostPopularItems', function (req, res, next) {
  getMostPopularItems(req.query.tableName, (err, success) => {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.get('/api/getBalletShowItem', function (req, res, next) {
  getBalletShowItem(req.query, (err, success) => {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/addBalletShowItem', function (req, res) {
  console.log('req', req.body)
  addBalletShowItem(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

app.post('/api/changeBalletShowItem', function (req, res, next) {
  console.log('req', req.body)
  changeBalletShowItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/deleteItem', function (req, res, next) {
  deleteItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/deleteAndChangePositionItem', function (req, res, next) {
  deleteAndChangePositionItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/changeItemPosition', function (req, res, next) {
  changeItemPosition(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
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
  addContacts(req.body.data, (data)=> {
    res.send(data);
  })
});

app.post('/api/changeContacts', function (req, res, next) {
  changeContacts(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

// Страница КОНТАКТЫ КОНЕЦ
//
// Страница Галерея
app.get('/api/getGalleryItems', function (req, res) {
  getGallery((data)=> {
    res.send(data);
  })
});

app.post('/api/addGalleryItem', function (req, res) {
  console.log('req', req.body)
  addGalleryItem(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

app.post('/api/changeGalleryItem', function (req, res) {
  changeGalleryItem(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});

app.post('/api/changeGalleryItemPosition', function (req, res) {
  changeGalleryItemPosition(req.body.data, (data)=> {
    // res.send('true');
    res.send(data);
  })
});
app.post('/api/deleteGalleryItem', function (req, res, next) {
  deleteGalleryItem(req.body.id, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});
// Страница Галерея КОНЕЦ

// Страница Райдер
app.get('/api/getRiderData', function (req, res) {
  getRiderData((data)=> {
    res.send(data);
  })
});

app.post('/api/addRiderData', function (req, res, next) {
  addRiderData(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/changeRiderData', function (req, res, next) {
  changeRiderData(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});
// Страница Райдер КОНЕЦ

// Общие комментарии
app.get('/api/getComments', function (req, res, next) {
  getComments(req.query,(err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/addComment', function (req, res, next) {
  addComment(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/changeComment', function (req, res, next) {
  changeComment(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/deleteComment', function (req, res, next) {
  deleteComment(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

// Общие комментарии конец

// Слайдер галлереии
app.get('/api/getSliderGalleryItems', function (req, res, next) {
  getSliderGalleryItems(req.query,(err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/addSliderGalleryItem', function (req, res, next) {
  addSliderGalleryItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/changeSliderGalleryItem', function (req, res, next) {
  changeSliderGalleryItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

app.post('/api/deleteSliderGalleryItem', function (req, res, next) {
  deleteSliderGalleryItem(req.body.data, (err, success)=> {
    if (err) {
      next(err);
    } else {
      res.send(success)
    }
  })
});

// Слайдер галлереии конец
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
