import { Search } from "lucide-react";
import { useBooks } from "../context/BooksContext";
import { useState } from "react";

const Navbar = () => {
    const {searchBooks, setIsSearching} = useBooks();
    const [query, setQuery] = useState('');
    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if(value.trim() !== "")
            searchBooks(value);
        else
            setIsSearching(false);
    }
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-4xl z-50 bg-white/80 backdrop-blur-md shadow-xl rounded-full px-4 py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-indigo-600 pl-2">
        📚 BookTrackr
      </div>

      {/* Search bar */}
      <div className="flex-[0.8_1_0%] px-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search books..."
            className="w-full rounded-full px-4 py-2 pl-10 bg-white border border-gray-200 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
        </div>
      </div>

     
    </nav>
  );
};

export default Navbar;
