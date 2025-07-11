import React from 'react'
import Home from './Home'
import AddBook from './AddBook'
import { useBooks } from '../context/BooksContext'
import SearchResults from '../components/SearchResults'

const Dashboard = () => {
    const {isSearching} = useBooks();
  return (
    <div className="flex flex-col md:flex-row-reverse gap-4 p-6 max-w-7xl mx-auto mt-20">
      <div className="w-full md:w-1/3">
        <AddBook />
      </div>
      <div className="w-full md:w-2/3">
        {isSearching ? <SearchResults/> : <Home/>}
      </div>
    </div>
  );
}

export default Dashboard