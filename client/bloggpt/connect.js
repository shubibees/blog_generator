const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

// Serialize method ensures that database queries are executed sequentiall
// db.serialize(() => {
//           db.run("DELETE FROM blogs where id in (26)")
//           db.close((err) => {
//               if (err) {
//                   return console.error(err.message);
//               }
//               console.log("Closed the database connection.");
//           });
// });
// insert image path /banner_images/img-Lo9mXmszyc6VfueL458inwLS.png at id 28
db.serialize(() => {
  db.run("UPDATE blogs SET imgURL = '/banner_images/img-Lo9mXmszyc6VfueL458inwLS.png' WHERE id = 28");
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
});
