import e from "cors";
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://myAtlasDBUser:mongodb5@myatlasclusteredu.008aesa.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU";

const client = new MongoClient(uri, {
  authSource: "admin", // or specify your database
});
let db;

const connectToDB =  async () => {
    try {
        await client.connect();
        const dbList = await client.db().admin().listDatabases();
        console.log("Connected to MongoDB Atlas");
        db = client.db('BookTracker');

    } catch (error) {
        console.log(error);
    }
}
function getDB() {
  if (!db) throw new Error("DB not initialized");
  return db;
}


const seedData = async () => {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-help",
      status: "Completed",
      rating: 5,
      notes: "Great strategies for building consistent habits.",
    },
    {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      genre: "Fantasy",
      status: "In Progress",
      rating: null,
      notes: "",
    },
    // more books...
  ];

  try {
    const collection = db.collection("books");
    // Clear existing data (optional)
    await collection.deleteMany({});
    // Insert seed data
    const result = await collection.insertMany(books);
    console.log(`Seeded ${result.insertedCount} books`);
  } catch (error) {
    console.error("Seeding error:", error);
  }
};

export { connectToDB, getDB, seedData };