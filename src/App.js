import React from "react";
import * as booksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./components/BookList";
import SearchPage from "./components/SearchPage";
import { Route } from "react-router-dom";
import { CoffeeLoading } from "react-loadingg";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    booksAPI.getAll().then((books) => {
      this.setState(() => ({
        books: books,
      }));
    });
  }

  changeShelf = (book, shelf) => {
    console.log(book.title + "  " + shelf);

    booksAPI.update(book, shelf);
  };

  render() {
    return this.state.books.length !== 0 ? (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList books={this.state.books} changeShelf={this.changeShelf} />
          )}
        />
        <Route exact path="/search" render={() => <SearchPage />} />
      </div>
    ) : (
      <div className="app">
        <CoffeeLoading />
      </div>
    );
  }
}

export default BooksApp;
