import React, { useState } from "react";
import * as booksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

const SearchPage = ({ changeShelf }) => {
  const [query, setQuery] = useState("");
  const [matchedBooks, setMatchedBooks] = useState([]);

  const fetchBooks = (query) => {
    if (query.length !== 0) {
      booksAPI.search(query).then((matchedBooks) => {
        if (matchedBooks.error) {
          setMatchedBooks([]);
        } else {
          setMatchedBooks(matchedBooks);
        }
      });
    } else {
      setMatchedBooks([]);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value.replace(/^\s+/, ""));
              fetchBooks(query);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <Shelf books={matchedBooks} changeShelf={changeShelf} label="Results" />
      </div>
    </div>
  );
};

export default SearchPage;
