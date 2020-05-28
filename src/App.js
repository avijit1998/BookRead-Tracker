import React from "react";
import * as booksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./components/BookList";
import SearchPage from "./components/SearchPage";
import { Route } from "react-router-dom";
import { CoffeeLoading } from "react-loadingg";
import * as shelfNames from "./utils/shelfNames";
class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
    };
  }

  componentDidMount() {
    booksAPI.getAll().then((resBooks) => {
      this.setState(() => ({
        books: {
          currentlyReading: resBooks.filter(
            (book) => book.shelf === shelfNames.CURRENTLY_READING
          ),
          wantToRead: resBooks.filter(
            (book) => book.shelf === shelfNames.WANT_TO_READ
          ),
          read: resBooks.filter((book) => book.shelf === shelfNames.READ),
        },
      }));
    });
  }

  changeShelf = (selectedBook, shelf) => {
    let newState = Object.assign({}, this.state);
    newState.books.find((book) => book.id === selectedBook.id).shelf = shelf;
    this.setState(newState);
    booksAPI.update(selectedBook, shelf).then((result) => {
      console.log(result);
    });
  };

  render() {
    const { books } = this.state;
    return books.currentlyReading.length !== 0 ||
      books.wantToRead.length !== 0 ||
      books.read.length !== 0 ? (
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
