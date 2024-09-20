import { AIContext } from "../Helpers/Context";
import Link from "next/link";
import React, { use, useContext, useEffect } from "react";
import { firebaseAuth } from "../firebase/connectFirebase";
import { signOut } from "firebase/auth";
import { RiFontSize } from "react-icons/ri";
import iconMapping from "../utils/iconMapping";

function SideBar({
  TiHomeOutline,
  CiBookmark,
  RiBallPenLine,
  FiHelpCircle,
  Login,
  Logout,
  IoSettings,
  IoSearch,
  showFonts,
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
    fontSize,
    setFontSize,
  } = useContext(AIContext);

  const handleLogout = (e) => {
    signOut(firebaseAuth);
    setUser({});
    setIsLoggedIn(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleFontSize = (fontSizeData) => {
    setFontSize(fontSizeData);
  };
  const RiFontSize = iconMapping["RiFontSize"];
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
        <div className={`sidebar__wrapper ${showFonts && "!h-[calc(-140px+100vh)]"}`}>
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
            {showFonts && (
              <div className="sidebar__link--wrapper sidebar__font--size-wrapper">
                <div
                  className={`sidebar__link--text sidebar__font--size-icon ${fontSize === "text-base" && "sidebar__font--size-icon--active"}`}
                  onClick={() => toggleFontSize("text-base")}
                >
                  <RiFontSize
                    className="sidebar__font--size-icon-small"
                    height="1em"
                    width="1em"
                  />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon ${fontSize === "text-[18px]" && "sidebar__font--size-icon--active"}`}
                  onClick={() => toggleFontSize("text-[18px]")}
                >
                  <RiFontSize
                    className="sidebar__font--size-icon-medium"
                    height="1em"
                    width="1em"
                  />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon ${fontSize === "text-[22px]" && "sidebar__font--size-icon--active"}`}
                  onClick={() => toggleFontSize("text-[22px]")}
                >
                  <RiFontSize
                    className="sidebar__font--size-icon-large"
                    height="1em"
                    width="1em"
                  />
                </div>
                <div
                  className={`sidebar__link--text sidebar__font--size-icon ${
                    fontSize === "text-[26px]" && "sidebar__font--size-icon--active"
                  }`}
                  onClick={() => toggleFontSize("text-[26px]")}
                >
                  <RiFontSize
                    className="sidebar__font--size-icon-xlarge"
                    height="1em"
                    width="1em"
                  />
                </div>
              </div>
            )}
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
