import React from "react";
import { Link } from "react-router-dom";
import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import AlreadyRead from "./AlreadyRead";
const BookList = (props) => {
  const { books, changeShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <CurrentlyReading
            items={books.filter((book) => book.shelf === "currentlyReading")}
            action={changeShelf}
          />
          <WantToRead
            items={books.filter((book) => book.shelf === "wantToRead")}
            action={changeShelf}
          />
          <AlreadyRead
            items={books.filter((book) => book.shelf === "read")}
            action={changeShelf}
          />
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
