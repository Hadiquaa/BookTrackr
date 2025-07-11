let books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-help",
    status: "Completed",
    rating: 5,
    notes: "Great strategies for building consistent habits.",
  },
  {
    id: 2,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    status: "In Progress",
    rating: null,
    notes: "",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    status: "Planned",
    rating: null,
    notes: "Recommended by Ali Abdaal.",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    status: "Completed",
    rating: 4,
    notes: "Inspiring, but slightly overrated for my taste.",
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    status: "In Progress",
    rating: null,
    notes: "Useful tips for writing maintainable code.",
  },
  {
    id: 6,
    title: "Becoming",
    author: "Michelle Obama",
    genre: "Biography",
    status: "Planned",
    rating: null,
    notes: "",
  },
];

let nextId = Math.max(...books.map((b) => b.id)) + 1;

export const getBooks = (req,res) => {
    const title = req.query.title;
    const genre = req.query.genre;
    let result = books;
    if(genre){
        result = books.filter((book) => book.genre.toLowerCase().includes(genre.toLowerCase()));
       
    }
    if(title){
        result = books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));
       
    }
    res.json(result);
}

export const getBooksById = (req,res) => {
    const id = parseInt(req.params.id);
    const book = books.find((book) => book.id === id);
    if(!book)
        res.status(404).json({message : "ID not found"});
    res.json(book);

}

export const addBook = (req,res) => {
    const newBook = {id: nextId++, ...req.body};
    books.push(newBook);
    res.status(201).json( newBook);
}

export const updateBook = (req,res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((book) => book.id === id);
    if(index !== -1){
        books[index] = {...books[index], ...req.body};
        res.status(201).json(books[index]);
    }
    else{
        res.status(404).json({message: "Id Not Found"});
    }

}
export const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
   const deleted = books.splice(index,1)[0]
    res.status(201).json({message: "Deleted", deleted});
  } else {
    res.status(404).json({ message: "Id Not Found" });
  }
};
