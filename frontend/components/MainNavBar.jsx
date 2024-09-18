import { AIContext } from "../Helpers/Context";
import React, { useContext, useEffect } from "react";

function MainNavBar({ IoSearch, IoMenu, toggleSideBar }) {
  const { isSideBarOpen, setIsSideBarOpen, SideBarModalRef } = useContext(AIContext);
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
              />
              <div className="search__icon">
                <IoSearch />
              </div>
            </div>
          </div>
          <div className="sidebar__toggle--btn" onClick={() => toggleSideBar()}>
            <IoMenu />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default MainNavBar;
