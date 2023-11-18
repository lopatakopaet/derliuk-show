const mysql = require("mysql2");

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "derliukShow"
});


// Connect to MySQL server
db.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});

// Номера баллета

// db.execute('SELECT * FROM `balletShowItems`',
//   null,
//   (err, results, fields) => {
//     // console.log(err, results)
//   });

function getBalletShowItems(cb) {
  db.execute('SELECT * FROM `balletShowItems`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
      cb(results);
    });
}

function getBalletShowItem(id, cb) {
  db.execute('SELECT * FROM `balletShowItems` WHERE `id` = ?' ,
    [id],
    (err, results, fields) => {
      cb(results);
    });
}

function addBalletShowItem({photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en}, cb) {
  db.execute('INSERT INTO `balletShowItems` (photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(results);
    });
}

function changeBalletShowItem({photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, id}, cb) {
  db.execute('UPDATE `balletShowItems` SET photo = ?, description_ua = ?, description_en = ?, title_ua = ?, title_en = ?, inProgram_ua = ?, inProgram_en = ?, duration_ua = ?, duration_en = ?, seoText_ua = ?, seoText_en = ? WHERE `id` = ?',
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, id || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(err, results);
    });
}

// Номера баллета КОНЕЦ

// Страница КОНТАКТЫ

function getContacts(cb) {
  db.execute('SELECT * FROM `contactsPage`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
      cb(results);
    });
}


function addContacts(data, cb) {
  db.execute('INSERT INTO `contactsPage` (data)  VALUES(?)',
    [data],
    (err, results, fields) => {
      console.log(err, results);
      cb(results);
    });
}

function changeContacts({data, id}, cb) {
  db.execute('UPDATE `contactsPage` SET data = ? WHERE `id` = ?',
    [data, id || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(err, results);
    });
}

// Страница КОНТАКТЫ КОНЕЦ

// Страница Галерея
function getGallery(cb) {
  db.execute('SELECT * FROM `GalleryItems`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
      cb(results);
    });
}

function addGalleryItem({photo, idPosition}, cb) {
  db.execute('INSERT INTO `GalleryItems` (photo, idPosition) VALUES (?,?)',
    [photo,idPosition],
    (err, results, fields) => {
      console.log(err, results);
      cb(results);
    });
}

function changeGalleryItem({photo, idPosition, id}, cb) {
  db.execute('UPDATE `GalleryItems` SET photo = ?, idPosition = ?  WHERE `id` = ?',
    [photo, idPosition, id || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(err, results);
    });
}

function changeGalleryItemPosition(data, cb) {
  let error, res;
  for (let i = 0; i < data.length; i++ ) {
    db.execute('UPDATE `GalleryItems` SET idPosition = ?  WHERE `id` = ?',
      [data[i].idPosition, data[i].id || null],
      (err, results, fields) => {
        // cb(err, results);
      });
  }
  cb(error, res);
}

function deleteGalleryItem(id, cb) {
  db.execute('DELETE FROM `GalleryItems` WHERE `id` = ?',
    [id],
    (err, results, fields) => {
      console.log(err, results);
      cb(err, results);
    });
}

// Страница Галерея КОНЕЦ

// db.execute('INSERT INTO `balletShowItems` (item_name, item_description) VALUES ("Disco Show", "Запальний та енергійний номер перенесе глядача в атмосферу 80-х.\n' +
//   'Відчуйте драйв і танцюйте разом з нами! «V.I.P.» балет подарує яскраві враження та атмосферу свята. З нами Ваш корпоратив, весілля, день народження, клубна вечірка чи презентація стануть незабутніми.")',
//   null,
//   (err, results, fields) => {
//     console.log(err, results);
//     // cb(results);
//   });
//
// db.execute('INSERT INTO `balletShowItems` (item_name, item_description) VALUES ("Disco Show", "Запальний та енергійний номер перенесе глядача в атмосферу 80-х.\n' +
//   'Відчуйте драйв і танцюйте разом з нами! «V.I.P.» балет подарує яскраві враження та атмосферу свята. З нами Ваш корпоратив, весілля, день народження, клубна вечірка чи презентація стануть незабутніми.")',
//   null,
//   (err, results, fields) => {
//     console.log(err, results);
//     // cb(results);
//   });


// let data = {
//   item_name: 'Antre',
//   item_description: 'Казково-легкий, чарівний номер стане красивим відкриттям програми чи івенту. Пориньте разом з нами у феєрію свята.',
// }
// addBalletShowItem(data);

module.exports = {
  getBalletShowItems,
  getBalletShowItem,
  addBalletShowItem,
  changeBalletShowItem,
  getContacts,
  addContacts,
  changeContacts,
  getGallery,
  addGalleryItem,
  changeGalleryItem,
  changeGalleryItemPosition,
  deleteGalleryItem,
};
