import axios from "axios";
import { AIContext } from "../Helpers/Context";
import React, { useContext, useEffect, useState } from "react";

import SearchSkelentons from "./ui/skelenton/SearchSkelentons";
import iconMapping from "../utils/iconMapping";

function MainNavBar({ IoSearch, IoMenu, toggleSideBar }) {
  const {
    isSideBarOpen,
    setIsSideBarOpen,
    SideBarModalRef,
    isSearching,
    setIsSearching,
    searchBooks,
    setSearchBooks,
  } = useContext(AIContext);

  const [query, setQuery] = useState("");

  const IoMdSearch = iconMapping["IoMdSearch"];
  const IoMdClose = iconMapping["IoMdClose"];

  const handleClickOutside = (event) => {
    if (
      SideBarModalRef.current &&
      !SideBarModalRef.current.contains(event.target)
    ) {
      console.log("clicked");
      setIsSideBarOpen(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm) {
      setIsSearching(true);
      try {
        const response = await axios.get(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchTerm}`
        ); // Adjust this endpoint to match your API
        setSearchBooks(response.data); // Assuming response.data contains an array of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
      setIsSearching(false);
    } else {
      setSearchBooks([]);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isSideBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    const delayDebounceFn = setTimeout(() => {
      handleSearch(query);
    }, 300); // Debounce for 300ms

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(delayDebounceFn);
    };
  }, [isSideBarOpen, query]);

  return (
    <div className="search__background">
      <div className="search__wrapper">
        <figure>
          <img src="logo" alt="" />
        </figure>
        <div className="search__content">
          <div className="search">
            <div className="search__input--wrapper">
              <input
                className="search__input"
                placeholder="Search for books"
                type="text"
                fdprocessedid="vfsbfi"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="search__icon">
                {query ? <IoMdClose onClick={()=>setQuery("")} className="cursor-pointer"/> : <IoMdSearch />}
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => toggleSideBar()}>
            <IoMenu />
          </div>
        </div>
        {isSearching && query ? (
          <SearchSkelentons />
        ) : query && searchBooks.length > 0 ? (
          <div class="search__books--wrapper">
            {searchBooks.map((book) => {
              return (
                <a class="search__book--link" href="/book/5bxl50cz4bt">
                  <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fhow-to-win-friends-and-influence-people.mp3?alt=media&amp;token=60872755-13fc-43f4-8b75-bae3fcd73991"></audio>
                  <figure class="book__image--wrapper !h-[80px] !w-[80px] !min-w-[80px]">
                    <img
                      class="book__image block"
                      src={book.imageLink}
                      alt="book"
                    />
                  </figure>
                  <div>
                    <div class="search__book--title">{book.title}</div>
                    <div class="search__book--author">{book.author}</div>
                    <div class="search__book--duration">
                      <div class="recommended__book--details">
                        <div class="recommended__book--details-icon">
                          <svg
                            stroke="currentColor"
                            fill="currentColor"
                            stroke-width="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
                            <path d="M13 7h-2v6h6v-2h-4z"></path>
                          </svg>
                        </div>
                        <div class="recommended__book--details-text">03:24</div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          searchBooks.length == 0 &&
          query && <div class="search__books--wrapper">No books found</div>
        )}
      </div>
    </div>
  );
}

export default MainNavBar;
