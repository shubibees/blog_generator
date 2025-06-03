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
db.serialize(() => {
          db.run("DELETE FROM blogs where id in (5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24)")
          db.close((err) => {
              if (err) {
                  return console.error(err.message);
              }
              console.log("Closed the database connection.");
          });
});
