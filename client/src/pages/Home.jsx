import React, { useState } from 'react'
import { useEffect } from "react";
import BookCard from '../components/BookCard';
import { useBooks } from '../context/BooksContext';
import EditBookModal from '../components/EditBookModal';

const Home = () => {
   const {books,fetchBooks,deleteBook,updateBook} = useBooks();
   const [editingBook, setEditingBook] =useState(null);
   const [showModal,setShowModal] = useState(false);
    useEffect(() => {
      fetchBooks();
    }, []);
    const handleEdit = (book) => {
        setEditingBook(book);
        setShowModal(true);
    };
    const handleEditChange= (e) => {
        const {id,value} = e.target;
        setEditingBook((prev) => ({
            ...prev,
            [id]:value,
        }))
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const result = await updateBook(editingBook._id, editingBook);
        if (result.success) {
          setEditingBook(null);
          setShowModal(false);
        } else {
          alert(result.error || 'Failed to update book');
        }
      };
  return (
    <div className="max-w-5xl max-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">All Books:</h1>
      <div className="flex flex-col gap-6">
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onDelete={deleteBook}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No Books Found</p>
        )}
      </div>
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
}

export default Home