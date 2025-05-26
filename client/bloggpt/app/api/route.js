import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

// Database initialization
let db = null;

// Initialize database connection
async function initDb() {
  if (!db) {
    db = await open({
      filename: "./collection.db",
      driver: sqlite3.Database
    });
    
  }
  return db;
}

// GET all blogs
export async function GET() {
  const db = await initDb();
  const blogs = await db.all("SELECT * FROM blogs ORDER BY id DESC");
  return new Response(JSON.stringify(blogs), {
    headers: { "Content-Type": "application/json" },
    status: 200
  });
}

// POST new blog
export async function POST(request) {
  const db = await initDb();
  const data = await request.json();
  
  try {
    const result = await db.run(
      "INSERT INTO blogs (title, content, imgURL) VALUES (?, ?, ?)",
      [data.title, data.content, data.imgURL]
    );
    
    const blog = await db.get(
      "SELECT * FROM blogs WHERE id = ?",
      [result.lastID]
    );
    
    return new Response(JSON.stringify(blog), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}

// PUT update blog
export async function PUT(request) {
  const db = await initDb();
  const data = await request.json();
  
  try {
    const result = await db.run(
      "UPDATE blogs SET title = ?, content = ?, imgURL = ? WHERE id = ?",
      [data.title, data.content, data.imgURL, data.id]
    );
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }
    
    const blog = await db.get(
      "SELECT * FROM blogs WHERE id = ?",
      [data.id]
    );
    
    return new Response(JSON.stringify(blog), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}

// DELETE blog
export async function DELETE(request) {
  const db = await initDb();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return new Response(JSON.stringify({ error: "ID is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
  
  try {
    const result = await db.run(
      "DELETE FROM blogs WHERE id = ?",
      [id]
    );
    
    if (result.changes === 0) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404
      });
    }
    
    return new Response(JSON.stringify({ message: "Blog deleted successfully" }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
}
