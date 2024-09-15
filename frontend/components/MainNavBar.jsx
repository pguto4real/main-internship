import { AIContext } from "@/Helpers/Context";
import React, { useContext, useEffect } from "react";

function MainNavBar({ IoSearch, IoMenu, toggleSideBar }) {
  const { isSideBarOpen, setIsSideBarOpen, SideBarModalRef } =
    useContext(AIContext);
  const handleClickOutside = (event) => {
    if (
      SideBarModalRef.current &&
      !SideBarModalRef.current.contains(event.target)
    ) {
      console.log("clicked");
      setIsSideBarOpen(false);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    if (isSideBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);
  return (
    <div class="search__background">
      <div class="search__wrapper">
        <figure>
          <img src="logo" alt="" />
        </figure>
        <div class="search__content">
          <div class="search">
            <div class="search__input--wrapper">
              <input
                class="search__input"
                placeholder="Search for books"
                type="text"
                fdprocessedid="vfsbfi"
              />
              <div class="search__icon">
                <IoSearch />
              </div>
            </div>
          </div>
          <div class="sidebar__toggle--btn" onClick={() => toggleSideBar()}>
            <IoMenu />
          </div>
        </div>
        {/* <div class="search__books--wrapper">
          <a class="search__book--link" href="/book/f9gy1gpai8">
            <audio src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Faudios%2Fthe-lean-startup.mp3?alt=media&amp;token=c2f2b1d4-eaf2-4d47-8c8a-7a8fd062a47e"></audio>
            <figure
              class="book__image--wrapper h-20 w-20 min-h-20"
              
            >
              <img
                class="book__image block"
                src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&amp;token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2"
                alt="book"
              
              />
            </figure>
            <div>
              <div class="search__book--title">The Lean Startup</div>
              <div class="search__book--author">Eric Ries</div>
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
                  <div class="recommended__book--details-text">03:23</div>
                </div>
              </div>
            </div>
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default MainNavBar;
