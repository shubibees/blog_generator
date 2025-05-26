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
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY,
        title TEXT,
        content TEXT,
        imgURL TEXT
      )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
        db.run(`DELETE FROM items`, (err) => {
            if (err) {
                return console.error(err.message);
            }
            console.log("All rows deleted from items");

            // Insert new data into the products table
            const values1 = [
                "Oshawott",
                "Basic Pokemon. HP 60. Surprise Attack 20. Flip a coin. If heads, this attack does 10 more damage. Water Gun 30. Weakness: Lightning x2. Resistance: none. Retreat Cost: 1.",
                "/collection/item1.png",
            ];


            const insertSql = `INSERT INTO blogs(title, content, imgURL) VALUES(?, ?, ?)`;


            const values =
                [
                    "Exploring the Myriad Uses of Commercial Plywood",
                    `<h1>Exploring the Myriad Uses of Commercial Plywood</h1>

<p>For the unacquainted, commercial plywood is a versatile, economical, and incredibly durable material. Characterized by its moisture-resistant properties and affordability, it serves a wide range of applications.</p>

<h2>Diving Deep into the Characteristics of Commercial Plywood</h2>

<p>Commercial plywood is infused with MR grade, an attribute that enhances its resistance to moisture, making it perfect for interior use. Apart from affordability, this plywood is preferred for a variety of projects thanks to the number of plies - thin wood layers - which contributes to its adaptability. Each sheet of commercial plywood comprises a minimum of 3 plies, thus adding to its structural stability (<a href="https://www.plywood.cc/no-of-plies-thickness-of-commercial-plywood/">source</a>).</p>

<h2>Unfolding the Various Applications of Commercial Plywood</h2>

<p>The interior design industry appreciates commercial plywood's adaptability, using it to create captivating wall and ceiling designs. Furthermore, in the realm of furniture manufacturing, commercial plywood shines with its cost-effectiveness and resilience - it's revered for constructing robust items such as wardrobes and bookshelves. Even in packaging solutions, commercial plywood's strength and light weight make it the go-to choice.</p>

<h2>Deciphering Commercial Plywood's Benefits </h2>

<p>Commercial plywood is not just an economical, moisture-resistant material - it also offers flexibility and strength. It's excellent at retaining nails and screws, making it an optimal alternative to other wood types.</p>

<h2>Distinguishing Commercial Plywood</h2>

<p>Commercial plywood and Marine plywood may seem alike, but they differ in their resistance to moisture. Marine Plywood possess greater water resistance properties as it's intended for continuous water exposure, whereas Commercial Plywood offers occasional water resistance. Comparatively, Commercial Plywood and engineered wood are quite different – the former is a natural product, while the latter is man-made, each with distinct properties and uses (<a href="https://www.lowes.com/n/buying-guide/plywood-vs-engineered-wood">source</a>).</p>

<h2>Considerations When Buying Commercial Plywood</h2>

<p>Aspects such as dimensions, price, and quality must be assessed when choosing commercial plywood. With thorough research and careful inspection, you're more likely to get your hands on a top-tier product that aligns with your budget and project requirements.</p>

<h2>Wrapping Up</h2>

<p>To sum up, commercial plywood's versatility in the realms of home décor, furniture manufacturing, and packaging cannot be overlooked or underestimated. Its affordability and exceptional characteristics make it a superb choice for many indoor applications. Therefore, before gravitating towards marine or engineered wood, consider the prospects of commercial plywood suiting your project needs better.</p>`,
                    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-G22Bv6v9PbrJajf5ofaHzL2B/user-jGslv8448DKiqMu1JuWzAO13/img-qsiLspICaDNtMrkDkoFGUeee.png?st=2025-05-26T08%3A12%3A09Z&se=2025-05-26T10%3A12%3A09Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=52f8f7b3-ca8d-4b21-9807-8b9df114d84c&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-26T00%3A18%3A09Z&ske=2025-05-27T00%3A18%3A09Z&sks=b&skv=2024-08-04&sig=H8CLrxgqkS2RtyzlWlt90z%2B69dgrMonvHbRl/rvMJ7k%3D"
                ]
          db.run(insertSql, values, function (err) {
              if (err) {
                  return console.error(err.message);
              }
              const id = this.lastID; // get the id of the last inserted row
              console.log(`Rows inserted, ID ${id}`);
          });

          //   Close the database connection after all insertions are done
          db.close((err) => {
              if (err) {
                  return console.error(err.message);
              }
              console.log("Closed the database connection.");
          });
      });
      }
  );
});
