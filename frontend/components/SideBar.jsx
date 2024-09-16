import { AIContext } from "../Helpers/Context";
import Link from "next/link";
import React, { useContext } from "react";

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

  const { isSideBarOpen, setIsSideBarOpen,SideBarModalRef} = useContext(AIContext)
  return (
    <>
    <div class={`sidebar__overlay  ${!isSideBarOpen && 'sidebar__overlay--hidden'}`}></div>
    
    <div ref={SideBarModalRef} class={`sidebar ${isSideBarOpen ? 'sidebar--opened': 'sidebar--closed'}`}>
      <div class="sidebar__logo">
        <img src="/assets/logo.png" />
      </div>
      <div class="sidebar__wrapper">
        <div class="sidebar__top">
          <Link class="sidebar__link--wrapper" href="/for-you">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <TiHomeOutline />
            </div>
            <div class="sidebar__link--text">For you</div>
          </Link>

          <Link class="sidebar__link--wrapper" href="/library">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <CiBookmark />
            </div>
            <div class="sidebar__link--text">My Library</div>
          </Link>
          <div class="sidebar__link--wrapper sidebar__link--not-allowed">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <RiBallPenLine />
            </div>
            <div class="sidebar__link--text">Highlights</div>
          </div>
          <div class="sidebar__link--wrapper sidebar__link--not-allowed">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <IoSearch />
            </div>
            <div class="sidebar__link--text">Search</div>
          </div>
        </div>
        <div class="sidebar__bottom">
          <Link class="sidebar__link--wrapper" href="/settings">
            <div class="sidebar__link--line active--tab"></div>
            <div class="sidebar__icon--wrapper">
              <IoSettings />
            </div>
            <div class="sidebar__link--text">Settings</div>
          </Link>
          <div class="sidebar__link--wrapper sidebar__link--not-allowed">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <FiHelpCircle />
            </div>
            <div class="sidebar__link--text">Help &amp; Support</div>
          </div>
          <div class="sidebar__link--wrapper">
            <div class="sidebar__link--line "></div>
            <div class="sidebar__icon--wrapper">
              <Login />
            </div>
            <div class="sidebar__link--text">Login</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SideBar;
