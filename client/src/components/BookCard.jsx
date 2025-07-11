import React from 'react'
import { MdModeEdit, MdDeleteOutline } from "react-icons/md";

const BookCard = ({book,onDelete,onEdit}) => {
    const renderStars = (rating) => {
        return Array.from({length : 5}, (_, i) => (
            <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                *
            </span>
        ))
    }
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition cursor-pointer relative">
      <h3 className="text-xl font-semibold text-purple-700">{book.title}</h3>
      <p className="text-sm text-gray-600 italic">by {book.author}</p>
      <div className="mt-2">
        <span className="inline-block text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 mr-2">
          {book.genre}
        </span>
        <span
          className={`inline-block text-xs px-2 py-1 rounded-full ${
            book.status === "Completed"
              ? "bg-green-100 text-green-800"
              : book.status === "In Progress"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {book.status}
        </span>
      </div>
      <div className="mt-3 text-lg">
        {book.rating ? (
          renderStars(book.rating)
        ) : (
          <span className="text-sm text-gray-400">No rating yet</span>
        )}
      </div>
      {book.notes && <p className="mt-3 text-sm text-gray-700">{book.notes}</p>}
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full shadow-sm transition"
          title="Edit"
          onClick={() => onEdit(book)}
        >
          <MdModeEdit size={18} />
        </button>
        <button
          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full shadow-sm transition"
          title="Delete"
          onClick={() => onDelete(book.id)}
        >
          <MdDeleteOutline size={18} />
        </button>
      </div>
    </div>
  );
}

export default BookCard