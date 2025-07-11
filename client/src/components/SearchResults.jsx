import React,{useEffect, useState} from "react";
import BookCard from "./BookCard";
import { useBooks } from "../context/BooksContext";
import EditBookModal from "./EditBookModal";

const SearchResults = () => {
const { searchResult, deleteBook, updateBook, searchBooks } = useBooks();
const [editingBook, setEditingBook] = useState(null);
const [showModal, setShowModal] = useState(false);



const handleEdit = (book) => {
  setEditingBook(book);
  setShowModal(true);
};

const handleEditChange = (e) => {
  const { id, value } = e.target;
  setEditingBook((prev) => ({
    ...prev,
    [id]: value,
  }));
};

const handleEditSubmit = async (e) => {
  e.preventDefault();
  await updateBook(editingBook.id, editingBook);
  setShowModal(false);
};
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-xl font-bold mb-4 text-green-700">Search Results:</h1>
      {Array.isArray(searchResult) && searchResult.length > 0 ? (
        searchResult.map((book) => (
          <BookCard key={book.id} book={book} onDelete={deleteBook} onEdit={handleEdit}/>
        ))
      ) : (
        <p className="text-gray-500">No matching books found.</p>
      )}
      {showModal && editingBook && (
        <EditBookModal
          editingBook={editingBook}
          setEditingBook={setEditingBook}
          onClose={() => setShowModal(false)}
          onSubmit={handleEditSubmit}
          handleChange={handleEditChange}
        />
      )}
    </div>
  );
};

export default SearchResults;
