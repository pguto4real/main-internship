import React, { useContext, useEffect } from "react";
import iconMapping from "../../utils/iconMapping";
import BooksSection from "../../components/BooksSection";
import { AIContext } from "../../Helpers/Context";
import NotLoggedIn from "../../components/NotLoggedIn";
import useFireStore from "../../hook/useFirestore";
import BooksSectionLoading from "../../components/ui/BooksSectionLoading";
import SkelentonBook from "../../components/ui/skelenton/SkelentonBook";

function Library() {
  const { isLoggedIn, booksInLibrary, currentUser, booksInCompleted } =
    useContext(AIContext);
  const books = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fcant-hurt-me.png?alt=media&amp;token=026646b0-40f8-48c4-8d32-b69bd5b8f700",

      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fmastery.png?alt=media&amp;token=c41aac74-9887-4536-9478-93cd983892af",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fatomic_habits.png?alt=media&amp;token=51401979-e7cc-40c4-87fa-3b27d1fe761b",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fhow-to-talk-to-anyone.png?alt=media&amp;token=48f77463-a093-42b4-8f1f-82fa4edd044c",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fgood-to-great.png?alt=media&amp;token=b906ec52-7871-411f-b5b6-53f1da98ee27",
      audio:
        "https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fcan't-hurt-me.mp3?alt=media&amp;token=7de57406-60ca-49d6-9113-857507f48312",
    },
  ];
 
  const {
    getAllSavedBooksByUser,
    loadingBooks,
    getAllFinishedBooksByUser,
    loadingCompletedBooks,
  } = useFireStore();

  const FaPlayCircle = iconMapping["FaPlayCircle"];
  const IoTimeOutline = iconMapping["IoTimeOutline"];
  const CiStar = iconMapping["CiStar"];
  useEffect(() => {
    if (currentUser?.uid) {
      getAllSavedBooksByUser(currentUser);
      getAllFinishedBooksByUser(currentUser);
    }
  }, [currentUser]);

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }
  return (
    <>
      {loadingBooks ? (
         <SkelentonBook
         title={"Saved Books"}
         sub_title={""}
       />
       
      ) : (
        <BooksSection
          title={"Saved Books"}
          sub_title={`${booksInLibrary.length} items`}
          books={booksInLibrary}
        />
      )}
      {loadingCompletedBooks ? (
        <SkelentonBook
        title={"Finished"}
        sub_title={""}
      />
      ) : (
        <BooksSection
          title={"Finished"}
          sub_title={`${booksInCompleted.length} items`}
          books={booksInCompleted}
        />
      )}
    </>
  );
}

export default Library;
Library.showWrapperFull = false;
Library.showFonts = false;
