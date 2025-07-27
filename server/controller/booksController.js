import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

export const getBooks = async (req, res) => {
  try {
    const db = getDB();
    const {title, genre} = req.query;
    let query = {};
     if (title) query.title = { $regex: title, $options: "i" };
     if (genre) query.genre = { $regex: genre, $options: "i" };

     const books = await db.collection("books").find(query).toArray();
     res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const getBooksById = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const book = await db
      .collection("books")
      .findOne({ _id: new ObjectId(id) });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
  // const id = parseInt(req.params.id);
  // const book = books.find((book) => book.id === id);
  // if (!book) res.status(404).json({ message: "ID not found" });
  // res.json(book);
};

export const addBook =async (req, res) => {
  try {
    const db = getDB();
    const newBook = { ...req.body, _id: new ObjectId() };
    const result = await db.collection("books").insertOne(newBook);
    res.status(201).json({ ...newBook, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: "Error adding book" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedBook = { ...req.body };
    delete updatedBook._id; // Remove _id from update if present

    const result = await db.collection("books").findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updatedBook },
      { returnDocument: "after" }
    );

    // In MongoDB 6.x, the result is the document itself
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const db = getDB();
    const id = req.params.id;

    const result = await db
      .collection("books")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete book", error: error.message });
  }
};
