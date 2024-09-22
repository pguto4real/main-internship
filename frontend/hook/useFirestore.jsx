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
import { useContext, useState } from "react";
import { AIContext } from "../Helpers/Context";
const useFireStore = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingCompletedBooks, setLoadingCompletedBooks] = useState(true);
  const [errorBooks, setErrorBooks] = useState(null);

  const { setBookExist, setBooksInLibrary,setBooksInCompleted } = useContext(AIContext);

  const saveToLibrary = async (book, user) => {
    // console.log(book, userId);
    const userId = user.uid;
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
          setBookExist(false);
        } else {
          // Book is not saved, so add it
          await updateDoc(savedBooksRef, {
            books: arrayUnion(book),
          });
          setBookExist(true);
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
    const userId = user.uid;
    const savedBooksRef = doc(db, "saved", user.uid);
    try {
      // Retrieve the user's saved books document
      const savedBooksSnap = await await getDoc(savedBooksRef);
      // console.log("savedBooksSnap",savedBooksSnap);
      if (savedBooksSnap.exists()) {
        const savedBooks = savedBooksSnap.data().books || [];

        // Check if the book is already saved
        const isBookSaved = savedBooks.some(
          (savedBook) => savedBook.id === book.id
        );
        if (isBookSaved) {
          setBookExist(true);
        } else {
          setBookExist(false);
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
  const getAllSavedBooksByUser = async (user) => {
    const userId = user.uid;

    // Reference to the user's savedBooks document
    const userBooksDocRef = doc(db, "saved", userId);
    try {
      // Fetch the document
      const userBooksDoc = await getDoc(userBooksDocRef);

      if (userBooksDoc.exists()) {
        // Get the 'books' array from the document
        const { books } = userBooksDoc.data();
     
        // Return the books array or an empty array if no books
        setBooksInLibrary(books || []);
      } else {
        // console.log("No saved books found for this user.");
        setBooksInLibrary([]);
      }
    } catch (error) {
      console.error("Error retrieving saved books:", error);
      return [];
    } finally {
     
      setLoadingBooks(false);
    }
  };

  const saveToFinished = async (book, user) => {
    const userId = user.uid;
    const completedBooksRef = doc(db, "completed", userId);
  
    try {
      // Retrieve the user's completed books document
      const completedBooksSnap = await getDoc(completedBooksRef);
  
      if (completedBooksSnap.exists()) {
        const completedBooks = completedBooksSnap.data().books || [];
  
        // Check if the book is already completed
        const isBookCompleted = completedBooks.some(
          (completedBook) => completedBook.id === book.id
        );
  
        if (!isBookCompleted) {
          // Book is not already completed, so add it
          await updateDoc(completedBooksRef, {
            books: arrayUnion(book), // Add the book to the array
          });
          // console.log("Book added to the completed list.");
        } 
      } else {
        // If the document doesn't exist, create it and add the book
        await setDoc(completedBooksRef, {
          books: [book], // Initialize with the first book
        });
        // console.log("Document created and book added to the completed list.");
      }
    } catch (error) {
      console.error("Error updating completed books: ", error);
    }
  };
  const getAllFinishedBooksByUser = async (user) => {
    const userId = user.uid;

    // Reference to the user's savedBooks document
    const userBooksDocRef = doc(db, "completed", userId);
    try {
      // Fetch the document
      const userBooksDoc = await getDoc(userBooksDocRef);

      if (userBooksDoc.exists()) {
        // Get the 'books' array from the document
        const { books } = userBooksDoc.data();
        
        // Return the books array or an empty array if no books
        setBooksInCompleted(books || []);
      } else {
        // console.log("No saved books found for this user.");
        setBooksInCompleted([]);
      }
    } catch (error) {
      console.error("Error retrieving saved books:", error);
      return [];
    } finally {
    
      setLoadingCompletedBooks(false);
    }
  };
  return { saveToLibrary, isBookExist, getAllSavedBooksByUser, saveToFinished,getAllFinishedBooksByUser,loadingBooks,loadingCompletedBooks };
};

export default useFireStore;
