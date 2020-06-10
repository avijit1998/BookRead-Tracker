import React from "react";
import * as booksAPI from "./BooksAPI";
import "./App.css";
import BookList from "./components/BookList";
import SearchPage from "./components/SearchPage";
import { Route } from "react-router-dom";
import { CoffeeLoading } from "react-loadingg";
import * as shelfNames from "./utils/shelfNames";
import cloneDeep from "lodash.clonedeep";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: {
        currentlyReading: [],
        wantToRead: [],
        read: [],
      },
      dataReceived: false,
      loading: true,
    };
  }

  componentDidMount() {
    booksAPI
      .getAll()
      .then((resBooks) => {
        let newState = Object.assign({}, this.state);
        resBooks.forEach((book) => {
          if (book.shelf === shelfNames.CURRENTLY_READING) {
            newState.books.currentlyReading.push(book);
          } else if (book.shelf === shelfNames.WANT_TO_READ) {
            newState.books.wantToRead.push(book);
          } else if (book.shelf === shelfNames.READ) {
            newState.books.read.push(book);
          }
        });
        newState.dataReceived = true;
        newState.loading = false;
        this.setState(newState);
      })
      .catch((response) => {
        console.log(response);
        this.setState(() => ({
          loading: false,
        }));
      });
  }

  changeShelf = (selectedBook, prevShelf, newShelf) => {
    let newState = cloneDeep(this.state);

    selectedBook.shelf = newShelf;

    if (prevShelf && newShelf !== "none") {
      newState.books[prevShelf] = newState.books[prevShelf].filter(
        (book) => book.id !== selectedBook.id
      );

      newState.books[newShelf] = [
        ...newState.books[newShelf],
        ...[selectedBook],
      ];
    } else if (prevShelf && newShelf === "none") {
      newState.books[prevShelf] = newState.books[prevShelf].filter(
        (book) => book.id !== selectedBook.id
      );
    } else if (newShelf !== "none") {
      newState.books[newShelf] = [
        ...newState.books[newShelf],
        ...[selectedBook],
      ];
    }

    let oldState = cloneDeep(this.state);

    this.setState(newState);

    booksAPI.update(selectedBook, newShelf).catch(() => {
      oldState.dataReceived = true;
      oldState.loading = false;
      this.setState(oldState);
    });
  };

  render() {
    const { books, dataReceived, loading } = this.state;
    if (loading) {
      return (
        <div className="app">
          <CoffeeLoading />
        </div>
      );
    } else if (dataReceived) {
      return (
        <div className="app">
          <Route
            exact
            path="/"
            render={() => (
              <BookList books={books} changeShelf={this.changeShelf} />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => <SearchPage changeShelf={this.changeShelf} />}
          />
        </div>
      );
    } else {
      return <div>404 Page Not Found.</div>;
    }
  }
}

export default App;
