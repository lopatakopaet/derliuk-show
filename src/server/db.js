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

function getAll(cb) {
  db.execute('SELECT * FROM `balletShowItems`',
    null,
    (err, results, fields) => {
      // console.log(err, results);
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
function addBalletShowItems({item_name, item_description}, cb) {
  db.execute('INSERT INTO `balletShowItems` (item_name, item_description) VALUES (?,?)',
    [item_name, item_description],
    (err, results, fields) => {
      console.log(err, results);
      cb();
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
  getAll,
  addBalletShowItems,
};
