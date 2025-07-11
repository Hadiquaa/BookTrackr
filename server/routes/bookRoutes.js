import express from "express";
import { addBook, deleteBook, getBooks, getBooksById, updateBook } from "../controller/booksController.js";

const router = express.Router();

router.get('/',getBooks)
 router.get("/:id",getBooksById);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook)

export default router