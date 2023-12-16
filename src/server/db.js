const mysql = require("mysql2");
const config = require('./connection.json')

//let db = mysql.createConnection(config);

const db = mysql.createPool({
  ...config,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Connect to MySQL server
// db.connect((err) => {
//   if (err) {
//     console.log("Database Connection Failed !!!", err);
//   } else {
//     console.log("connected to Database");
//   }
// });

// Модальное окно заказа шоу-баллета
function orderShow(data, cb) {
  console.log(data);
  db.execute('INSERT INTO `orderShow` (name, comment, phone)  VALUES(?,?, ?)',
    [data.name, data.comment, data.phone],
    cb);
}

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

// ГЛАВНАЯ БАЛЕТ/ПАРОДИИ КОНЕЦ

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

function addBalletShowItem({tableName, photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, idPosition}, cb) {
  db.execute(`INSERT INTO ${tableName} (photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, idPosition) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, idPosition || null],
    (err, results, fields) => {
      console.log(err, results);
      cb(results);
    });
}

function changeBalletShowItem({tableName, photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, idPosition, id}, cb) {
  db.execute(`UPDATE ${tableName} SET photo = ?, description_ua = ?, description_en = ?, title_ua = ?, title_en = ?, inProgram_ua = ?, inProgram_en = ?, duration_ua = ?, duration_en = ?, seoText_ua = ?, seoText_en = ?, idPosition = ? WHERE id = ?`,
    [photo, description_ua, description_en, title_ua, title_en, inProgram_ua, inProgram_en, duration_ua, duration_en, seoText_ua, seoText_en, idPosition, id || null],
    cb);
}

function deleteItem({tableName, id}, cb) {
  db.execute(`DELETE FROM ${tableName} WHERE id = ?`,
    [id],
    cb);
}

// function sortItemsAfterDelete(tableName, cb) {
//   getMostPopularItems(tableName, (err, success) => {
//     if (err) {
//       cb(err);
//     } else {
//
//     }
//   })
// }

function changItemPositionByOrder(tableName) {
  let items;
  getMostPopularItems(tableName, (err, success) => {
    if (err) {
      cb(err);
    } else {
      items = success;
      items = sortItems(items);
      if (items.length) {
        // меняем idPosition у всех элементов чтобы позиционирование было по порядку
        for (let i = 0; i < items.length; i++ ) {
          items[i].idPosition = i + 1;
          db.execute(`UPDATE ${tableName} SET idPosition = ?  WHERE id = ?`,
            [items[i].idPosition, items[i].id || null],
            (err, results, fields) => {
              // cb(err, results);
            });
        }
      }
    }
  })
}

// Удаляем элемент и меняем всем элементам позиционирование, чтобы было по порядку
function deleteAndChangePositionItem({tableName, id}, cb) {
  let items;
  deleteItem({tableName, id}, (err, success) => {
    if (err) {
      cb(err);
    } else {
      changItemPositionByOrder(tableName)
    }
  })
  cb(items)
}

// function changeItemPosition({tableName, data}, cb) {
//   let res;
//   for (let i = 0; i < data.length; i++ ) {
//     db.execute(`UPDATE ${tableName} SET idPosition = ?  WHERE id = ?`,
//       [data[i].idPosition, data[i].id || null],
//       (err, results, fields) => {
//         // cb(err, results);
//       });
//   }
//   cb(res);
// }

// function changeItemPos({tableName, id}, cb) {
//   getMostPopularItems(tableName, (result) => {
//
//   })
//
// }

function changeItemPosition({tableName, item, newPosition}, cb) {
  let items;
  let newIdPosition = +newPosition;
  let OldIdPosition = +item.idPosition;
  getMostPopularItems(tableName, (err, success) => {
    if (err) {
      cb(err);
    } else {
      items = success;
      if (items.length) {
        // если новая позицая больше длины массива, то переставляем элемент в конец массив
        if  (newIdPosition > items.length) {
          newIdPosition = items.length
        }
        // меняем idPosition у элементов, у которых меняется позиционирование
        for (let i = 0; i < items.length; i++ ) {
          if (items[i].idPosition == newIdPosition) {
            items[i].idPosition = OldIdPosition;
            db.execute(`UPDATE ${tableName} SET idPosition = ?  WHERE id = ?`,
              [items[i].idPosition, items[i].id || null],
              (err, results, fields) => {
                // cb(err, results);
              });
          } else if (items[i].idPosition == OldIdPosition) {
            items[i].idPosition = newIdPosition;
            db.execute(`UPDATE ${tableName} SET idPosition = ?  WHERE id = ?`,
              [items[i].idPosition, items[i].id || null],
              (err, results, fields) => {
                // cb(err, results);
              });
          }
        }
      }
    }
  })
  cb(items);
}

// Номера баллета КОНЕЦ

// Страница КОНТАКТЫ

function getContacts(cb) {
  db.execute('SELECT * FROM `contactsPage`',
    null,
    (err, results, fields) => {
      cb(results);
    });
}


function addContacts(data, cb) {
  db.execute('INSERT INTO `contactsPage` (data)  VALUES(?)',
    [data],
    (err, results, fields) => {
      cb(results);
    });
}

function changeContacts({data, id}, cb) {
  db.execute('UPDATE `contactsPage` SET data = ? WHERE `id` = ?',
    [data, id || null],
    cb);
}

// Страница КОНТАКТЫ КОНЕЦ

// Страница Галерея
function getGallery(cb) {
  db.execute('SELECT * FROM `GalleryItems`',
    null,
    (err, results, fields) => {
      cb(results);
    });
}

function addGalleryItem({photo, idPosition}, cb) {
  db.execute('INSERT INTO `GalleryItems` (photo, idPosition) VALUES (?,?)',
    [photo,idPosition],
    (err, results, fields) => {
      cb(results);
    });
}

function changeGalleryItem({photo, idPosition, id}, cb) {
  db.execute('UPDATE `GalleryItems` SET photo = ?, idPosition = ?  WHERE `id` = ?',
    [photo, idPosition, id || null],
    (err, results, fields) => {
      cb(err, results);
    });
}

function changeGalleryItemPosition(data, cb) {
  let res;
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
      cb(results);
    });
}

function addRiderData({data}, cb) {
  db.execute('INSERT INTO `RiderData` (data)  VALUES(?)',
    [data],
    cb);
}

function changeRiderData({data, id}, cb) {
  db.execute('UPDATE `RiderData` SET data = ? WHERE `id` = ?',
    [data, id],
    cb);
}

// Страница Райдер КОНЕЦ

function sortItems(items) {
  return items.sort((n1, n2) => n1.idPosition - n2.idPosition)
}

module.exports = {
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
};
