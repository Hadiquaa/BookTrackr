
import React from "react";

const EditBookModal = ({
  editingBook,
  setEditingBook,
  onClose,
  onSubmit,
  handleChange,
}) => {
  if (!editingBook) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Edit Book
        </h2>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            type="text"
            id="title"
            className="border p-2 rounded"
            placeholder="Enter a title"
            value={editingBook.title}
            onChange={handleChange}
          />
          <input
            type="text"
            id="author"
            className="border p-2 rounded"
            placeholder="Author"
            value={editingBook.author}
            onChange={handleChange}
          />
          <select
            id="genre"
            className="border p-2 rounded"
            value={editingBook.genre}
            onChange={handleChange}
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Self-help">Self-help</option>
            <option value="Productivity">Productivity</option>
            <option value="Biography">Biography</option>
            <option value="Programming">Programming</option>
          </select>
          <select
            id="status"
            className="border p-2 rounded"
            value={editingBook.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Planned">Planned</option>
          </select>
          {editingBook.status === "Completed" && (
            <select
              id="rating"
              value={editingBook.rating || ""}
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
          <textarea
            id="notes"
            className="border p-2 rounded"
            placeholder="Notes"
            value={editingBook.notes}
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
