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

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
          db.run("DELETE FROM blogs where id in (2,3,4,5,6,7)")
          db.close((err) => {
              if (err) {
                  return console.error(err.message);
              }
              console.log("Closed the database connection.");
          });
});
