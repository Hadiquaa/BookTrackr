import React, { useState } from 'react'
import { useBooks } from '../context/BooksContext';

const AddBook = () => {
    const {addBook} = useBooks();
    const [formData, setFormData] = useState({
        title: "",
        author : "",
        genre : "",
        status: "",
        rating: "",
        notes: ""
    });

    const handleChange = (e) => {
        const {id,value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id] : value
        }))
    };
    const addNewBook = async (e) => {
        e.preventDefault();
        await addBook(formData);
        setFormData({
          title: "",
          author: "",
          genre: "",
          status: "",
          rating: "",
          notes: "",
        });
    }
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h1 className="text-xl font-bold mb-4 text-purple-700">Add New Book</h1>
      <form className="flex flex-col gap-4" onSubmit={addNewBook}>
        {/* Title */}
        <input
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {/* Author */}
        <input
          id="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        {/* Genre */}
        <select
          id="genre"
          value={formData.genre}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Self-help">Self-help</option>
          <option value="Productivity">Productivity</option>
          <option value="Biography">Biography</option>
          <option value="Programming">Programming</option>
        </select>
        {/* Status */}
        <select
          id="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Planned">Planned</option>
        </select>
        {/* Rating (only if Completed) */}
        {formData.status === "Completed" && (
          <select
            id="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} ★
              </option>
            ))}
          </select>
        )}
        {/* Notes */}
        <textarea
          id="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 rounded"
        ></textarea>

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook