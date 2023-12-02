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

// ГЛАВНАЯ БАЛЕТ/ПАРОДИИ
function getMainPage(tableName, cb) {
  db.execute(`SELECT * FROM ${tableName}`,
    null,
    cb)
}

function changeMainPage({tableName, data}, cb) {
  db.execute(`UPDATE ${tableName} SET mainPhoto = ?, mainText_ua = ?, mainText_en = ?, seoText_ua = ?, seoText_en = ? WHERE id = ?`,
    [data.mainPhoto, data.mainText_ua, data.mainText_en, data.seoText_ua, data.seoText_en, data.id],
    cb);
}

// function changeMainPage({tableName, data}, cb) {
//   db.execute('UPDATE ' + `${tableName}` + ' SET mainPhoto = ?, mainText_ua = ?, mainText_en = ?, seoText_ua, seoText_en WHERE id = ?',
//     [data.mainPhoto, data.mainText_ua, data.mainText_en, data.seoText_ua, data.seoText_en, data.id || null],
//     cb);
// }
// ГЛАВНАЯ БАЛЕТ КОНЕЦ

// Номера балета

// function getBalletShowItems(cb) {
//   db.execute('SELECT * FROM `balletShowItems`',
//     null,
//     (err, results, fields) => {
//       // console.log(err, results);
//       cb(results);
//     });
// }

function getMostPopularItems(tableName,cb) {
  db.execute(`SELECT * FROM ${tableName}`,
    null,
    cb)
}

function getBalletShowItem({tableName, id}, cb) {
  db.execute(`SELECT * FROM ${tableName} WHERE id = ?` ,
    [id],
    cb);
}

function addBalletShowItem({tableName, photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en}, cb) {
  db.execute(`INSERT INTO ${tableName} (photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(results);
    });
}

function changeBalletShowItem({tableName, photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, id}, cb) {
  db.execute(`UPDATE ${tableName} SET photo = ?, description_ua = ?, description_en = ?, title_ua = ?, title_en = ?, inProgram_ua = ?, inProgram_en = ?, duration_ua = ?, duration_en = ?, seoText_ua = ?, seoText_en = ? WHERE id = ?`,
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, id || null],
    cb);
}

function deleteItem({tableName, id}, cb) {
  db.execute(`DELETE FROM ${tableName} WHERE id = ?`,
    [id],
    cb);
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
  let res = 'ok';
  for (let i = 0; i < data.length; i++ ) {
    db.execute('UPDATE `GalleryItems` SET idPosition = ?  WHERE `id` = ?',
      [data[i].idPosition, data[i].id || null],
      (err, results, fields) => {
        // cb(err, results);
      });
  }
  cb(res);
}

function deleteGalleryItem(id, cb) {
  db.execute('DELETE FROM `GalleryItems` WHERE `id` = ?',
    [id],
    cb);
}

// Страница Галерея КОНЕЦ

// Страница Райдер
function getRiderData(cb) {
  db.execute('SELECT * FROM `RiderData`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
      cb(results);
    });
}

function addRiderData(data, cb) {
  db.execute('INSERT INTO `RiderData` (data)  VALUES(?)',
    [data],
    (err, results, fields) => {
      cb(results);
    });
}

function changeRiderData({data, id}, cb) {
  db.execute('UPDATE `RiderData` SET data = ? WHERE `id` = ?',
    [data, id || 1], // всегда записываем дату в первый id
    (err, results, fields) => {
      console.log(err, results);
      cb(err, results);
    });
}

// Страница Райдер КОНЕЦ

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
  getMainPage,
  changeMainPage,
  getMostPopularItems,
  getBalletShowItem,
  addBalletShowItem,
  changeBalletShowItem,
  deleteItem,
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
};
