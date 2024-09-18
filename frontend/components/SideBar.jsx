import { AIContext } from "../Helpers/Context";
import Link from "next/link";
import React, { use, useContext, useEffect } from "react";
import { firebaseAuth } from "../firebase/connectFirebase";
import { signOut } from "firebase/auth";
// import { AIContext } from "../Helpers/Context";
function SideBar({
  TiHomeOutline,
  CiBookmark,
  RiBallPenLine,
  FiHelpCircle,
  Login,
  Logout,
  IoSettings,
  IoSearch,
}) {
  const {
    isLoggedIn,
    isCheckingUser,
    setUser,
    user,
    setIsLoggedIn,
    setIsModalOpen,
    isModalOpen,
    isSideBarOpen,

    SideBarModalRef,
  } = useContext(AIContext);

  const handleLogout = (e) => {
    signOut(firebaseAuth);
    setUser({});
    setIsLoggedIn(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // useEffect(() => {
  //   if (user) {
  //     console.log("logged in");
  //   } else {
  //     console.log("logged out");
  //   }
  // }, [user]);
  return (
    <>
      <div
        className={`sidebar__overlay  ${
          !isSideBarOpen && "sidebar__overlay--hidden"
        }`}
      ></div>

      <div
        ref={SideBarModalRef}
        className={`sidebar ${
          isSideBarOpen ? "sidebar--opened" : "sidebar--closed"
        }`}
      >
        <div className="sidebar__logo">
          <img src="/assets/logo.png" />
        </div>
        <div className="sidebar__wrapper">
          <div className="sidebar__top">
            <Link className="sidebar__link--wrapper" href="/for-you">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <TiHomeOutline />
              </div>
              <div className="sidebar__link--text">For you</div>
            </Link>

            <Link className="sidebar__link--wrapper" href="/library">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <CiBookmark />
              </div>
              <div className="sidebar__link--text">My Library</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <RiBallPenLine />
              </div>
              <div className="sidebar__link--text">Highlights</div>
            </div>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <IoSearch />
              </div>
              <div className="sidebar__link--text">Search</div>
            </div>
          </div>
          <div className="sidebar__bottom">
            <Link className="sidebar__link--wrapper" href="/settings">
              <div className="sidebar__link--line active--tab"></div>
              <div className="sidebar__icon--wrapper">
                <IoSettings />
              </div>
              <div className="sidebar__link--text">Settings</div>
            </Link>
            <div className="sidebar__link--wrapper sidebar__link--not-allowed">
              <div className="sidebar__link--line "></div>
              <div className="sidebar__icon--wrapper">
                <FiHelpCircle />
              </div>
              <div className="sidebar__link--text">Help &amp; Support</div>
            </div>

            {isLoggedIn ? (
              <div className="sidebar__link--wrapper" onClick={handleLogout}>
                <div className="sidebar__link--line "></div>
                <div className="sidebar__icon--wrapper"></div>
                <Logout />
                <div className="sidebar__link--text">Logout</div>
              </div>
            ) : (
              <div
                className="sidebar__link--wrapper"
                onClick={() => toggleModal()}
              >
                <div className="sidebar__link--line "></div>
                <div className="sidebar__icon--wrapper"></div>
                <Login />
                <div className="sidebar__link--text">Login</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
