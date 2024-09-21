import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore"; // Import necessary Firestore methods
import { db } from "../firebase/connectFirebase"; // Import the Firestore instance
import { useContext } from "react";
import { AIContext } from "../Helpers/Context";
const useFireStore = () => {
  const {  bookExist,
    setBookExist } =
    useContext(AIContext);
  const saveToLibrary = async (book, user) => {
    // console.log(book, userId);
    const userId = user.uid
    const savedBooksRef = doc(db, "saved", user.uid);

    try {
      // Retrieve the user's saved books document
      const savedBooksSnap = await getDoc(savedBooksRef);

      if (savedBooksSnap.exists()) {
        const savedBooks = savedBooksSnap.data().books || [];
    
        // Check if the book is already saved
        const isBookSaved = savedBooks.some(
          (savedBook) => savedBook.id === book.id
        );
        if (isBookSaved) {
          // Book is already saved, so remove it
          await updateDoc(savedBooksRef, {
            books: arrayRemove(book),
          });
          setBookExist(false)
        } else {
          // Book is not saved, so add it
          await updateDoc(savedBooksRef, {
            books: arrayUnion(book),
          });
          setBookExist(true)
        }
      } else {
        
        // If the document doesn't exist, create it and add the book
        // Document doesn't exist, create it with the first book
        await setDoc(savedBooksRef, {
          books: [book],
        });
        console.log("Document created and book added to saved list.");
      }
    } catch (error) {
      console.error("Error updating saved books: ", error);
    }
  };
  const isBookExist = async (book, user) => {
    
    const userId = user.uid
	const savedBooksRef = doc(db, "saved", user.uid);
    try {
      // Retrieve the user's saved books document
      const savedBooksSnap = await await getDoc(savedBooksRef);;
        // console.log("savedBooksSnap",savedBooksSnap);
      if (savedBooksSnap.exists()) {
        const savedBooks = savedBooksSnap.data().books || [];
    
        // Check if the book is already saved
        const isBookSaved = savedBooks.some(
          (savedBook) => savedBook.id === book.id
        );
        if (isBookSaved) {
        
         setBookExist(true)
        } else {
         
          setBookExist(false)
        }
      } else {
        
        // If the document doesn't exist, create it and add the book
        // Document doesn't exist, create it with the first book
        await setDoc(savedBooksRef, {
          books: [book],
        });
        console.log("Document created and book added to saved list.");
      }
    } catch (error) {
      console.error("Error updating saved books: ", error);
    }
  };
  return { saveToLibrary,isBookExist };
};


export default useFireStore;
