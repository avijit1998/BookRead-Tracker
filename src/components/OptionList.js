import React from "react";

const OptionList = ({ item, action }) => {
  return (
    <>
      <select
        onChange={(e) => {
          action(item, item.shelf, e.target.value);
        }}
        value={item.shelf ? item.shelf : "none"}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </>
  );
};

export default OptionList;
