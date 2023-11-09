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

db.execute('SELECT * FROM `balletShowItems`',
  null,
  (err, results, fields) => {
    // console.log(err, results)
  });

function getBalletShowItems(cb) {
  db.execute('SELECT * FROM `balletShowItems`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
      cb(results);
    });
}

function getBalletShowItem(id, cb) {
  db.execute('SELECT * FROM `balletShowItems` WHERE `id` = id',
    null,
    (err, results, fields) => {
      cb(results);
    });
}

// function addBalletShowItems(cb, data) {
//   db.execute('INSERT INTO `balletShowItems` SET item_name=data.item_name,item_description=data.item_description)',
//     null,
//     (err, results, fields) => {
//       console.log(err, results);
//       cb(results);
//     });
// }
function addBalletShowItems({photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en}, cb) {
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
// addBalletShowItems(data);

module.exports = {
  getBalletShowItems,
  getBalletShowItem,
  addBalletShowItems,
  changeBalletShowItem,
};
