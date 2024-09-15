import React from 'react'
import Book from './Book';

function BooksSection({title,sub_title,books}) {
  return (
    <>
    <div class="for-you__title">{title}</div>
        <div class="for-you__sub--title">{sub_title}</div>
        <div class="for-you__recommended--books">
          {books.map((book) => {
            return (
              <Book img={book.img} audio={book.audio}/>
            );
          })}

         
        </div>
    </>
  )
}

export default BooksSection