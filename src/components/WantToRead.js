import React from "react";

const WantToRead = (props) => {
  const { items, action } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">Want to Read</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {items.map((item) => {
            return (
              <li key={item.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${item.imageLinks.thumbnail}")`,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) => {
                          action(item, e.target.value);
                        }}
                        value={item.shelf}
                      >
                        <option value="move" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{item.title}</div>
                  <div className="book-authors">{item.authors}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default WantToRead;
