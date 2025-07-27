import { createContext ,useContext, useState } from "react";

const BooksContext =  createContext();
export const useBooks = () => useContext(BooksContext);

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8004";

console.log(process.env.REACT_APP_BACKEND_URL);

export const BooksProvider = ({children}) => {
    const [books,setBooks] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const fetchBooks =async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/books`);
            if(!res.ok)
                throw new Error("Failed to fetch");
            const data = await res.json();
            setBooks(data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateBook = async (id, updatedBook) => {
        try {
            const res = await fetch(`${BASE_URL}/api/books/${id}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to update book');
            }

            const updatedData = await res.json();
            setBooks((prev) => prev.map((book) => 
                book._id === id ? updatedData : book
            ));
            return { success: true, data: updatedData };
            
        } catch (error) {
            console.error('Update book error:', error);
            return { success: false, error: error.message };
        }
    }
    const deleteBook =async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if(!confirmDelete) return;
        try {
            const res = await fetch(`${BASE_URL}/api/books/${id}`, {
                method: "DELETE"
            });
            if(!res.ok)
                throw new Error("Failed to delete");
            setBooks((prev) => prev.filter((book) => book._id !== id));
           
        } catch (error) {
            console.log(error)
        }
    }

    const addBook = async(newBook) => {
        try {
            const res = await fetch(`${BASE_URL}/api/books`, {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(newBook)
            });
            if(!res.ok)
                throw new Error("Failed to add new book");
            const added = await res.json();
            setBooks((prev) => [...prev,added]);
            
        } catch (error) {
            console.log(error)
        }
    }
    const searchBooks =async (query) => {
        try {
            const res = await fetch(`${BASE_URL}/api/books?title=${query}`);
            if(!res.ok)
                throw new Error("Failed to fetch");
            const data = await res.json();
            setSearchResult(data);
            setIsSearching(true);
        } catch (error) {
            console.log(error);
            setSearchResult([]);
        }
    }
    return (
        <BooksContext.Provider value={{books,fetchBooks, deleteBook, updateBook, addBook, searchBooks, searchResult, isSearching, setIsSearching}}>
            {children}
        </BooksContext.Provider>
    )
}