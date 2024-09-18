import React from "react";
import Book from "./Book";
import SkelentonBook from "./ui/skelenton/SkelentonBook";

function BooksSection({ title, sub_title, books }) {
  return (
    <>
      <div className="for-you__title">{title}</div>
      <div className="for-you__sub--title">{sub_title}</div>
      <div className="for-you__recommended--books">
        {books.map((book,index) => {
          return <Book key={index} img={book.img} audio={book.audio} />;
        })}
      </div>
    </>
  );
}

export default BooksSection;
