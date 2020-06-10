import React from "react";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";
const BookList = ({ books, changeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf
            books={books.currentlyReading}
            changeShelf={changeShelf}
            label="Currently Reading"
          />
          <Shelf
            books={books.wantToRead}
            changeShelf={changeShelf}
            label="Want to Read"
          />
          <Shelf books={books.read} changeShelf={changeShelf} label="Read" />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default BookList;
