import { onAuthStateChanged } from "firebase/auth";
import MainNavBar from "../components/MainNavBar";
import SideBar from "../components/SideBar";
import { AIContext, AuthProvider } from "../Helpers/Context";
import checkCurrent from "../hook/formatTime";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/globals.css";
import iconMapping from "../utils/iconMapping";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import { firebaseAuth } from "../firebase/connectFirebase";
import LoginModal from "../components/LoginModal";
import useCurrentUser from "../hook/useCurrentUser";
import useFireStore from "../hook/useFirestore";

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [variant, setVariant] = useState("login");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [subscription, setSubscription] = useState(true);
  const [fontSize, setFontSize] = useState("text-base");
  const [bookExist, setBookExist] = useState(false);
  const [booksInLibrary, setBooksInLibrary] = useState([]);
  const [booksInCompleted, setBooksInCompleted] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const loginModalRef = useRef(null);
  const SideBarModalRef = useRef(null);

  const router = useRouter();
  const showFonts =
    Component.showFonts !== undefined ? Component.showFonts : true;
  const showComponent =
    Component.showComponent !== undefined ? Component.showComponent : true;
  const showSideBar =
    Component.showSideBar !== undefined ? Component.showSideBar : true;
  const showWrapperFull =
    Component.showWrapperFull !== undefined ? Component.showWrapperFull : true;
  const showMainNavBar =
    Component.showMainNavBar !== undefined ? Component.showMainNavBar : true;

  // // Define routes where you don't want the component to appear
  // const hiddenRoutes = [
  //   "/",
  //   "/choose-plan",
  //   /^\/player\/[a-zA-Z0-9]+$/, // Regex to match any /player/:bookId route
  // ]; // Add any routes where MyComponent should not be shown
  // // Check if the current route is in the hidden routes list
  // const showComponent = !hiddenRoutes.some(route =>
  //   typeof route === 'string'
  //     ? router.pathname.includes(route)
  //     : route.test(router.pathname) // Use regex test for dynamic routes
  // );

  // console.log(showComponent)

  // const hiddenSideBarRoutes = [
  //   "/",
  //   "/choose-plan",

  // ]; // Add any routes where MyComponent should not be shown
  // // Check if the current route is in the hidden routes list
  // const showSideBar = !hiddenSideBarRoutes.some(route =>
  //   typeof route === 'string'
  //     ? router.pathname.includes(route)
  //     : route.test(router.pathname) // Use regex test for dynamic routes
  // );

  const IoMenu = iconMapping["IoMdMenu"];
  const IoSearch = iconMapping["IoMdSearch"];
  const TiHomeOutline = iconMapping["TiHomeOutline"];
  const CiBookmark = iconMapping["CiBookmark"];
  const RiBallPenLine = iconMapping["RiBallPenLine"];
  const IoSettings = iconMapping["IoSettingsOutline"];
  const Login = iconMapping["TbLogout"];
  const Logout = iconMapping["TbLogout2"];
  const FiHelpCircle = iconMapping["FiHelpCircle"];

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  const toggleModal = () => {
    console.log("clicked");
    setIsModalOpen(!isModalOpen);
    setIsSideBarOpen(false);
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  // const checkLoginStatus = () => {
  //   if(user){
  //     setIsLoggedIn(true);
  //     setCurrentUser(user)
  //     }
  //   console.log("user", user);
  // };

  // useEffect(() => {
  //   return () => checkLoginStatus();
  // }, []);
  const { user, loading, error } = useCurrentUser();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
    } else {
      setIsLoggedIn(false);

      setCurrentUser(null);
    }
  }, [user]);
  if (!loading) {
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AIContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
          variant,
          setVariant,
          isSideBarOpen,
          setIsSideBarOpen,
          loginModalRef,
          SideBarModalRef,
          currentUser,
          setCurrentUser,
          isLoggedIn,
          setIsLoggedIn,
          isCheckingUser,
          setIsCheckingUser,
          subscription,
          setSubscription,
          fontSize,
          setFontSize,
          bookExist,
          setBookExist,
          booksInLibrary,
          setBooksInLibrary,
          booksInCompleted,
          setBooksInCompleted,
          searchBooks,
          setSearchBooks,
          isSearching,
          setIsSearching,
          query,
          setQuery,
        }}
      >
        {/* Conditionally render MyComponent based on the current route */}
        <div className={`wrapper ${showWrapperFull && "wrapper__full"}`}>
          <Toaster className="!z-[100000]" />
          {showMainNavBar && (
            <MainNavBar
              toggleSideBar={toggleSideBar}
              IoMenu={IoMenu}
              IoSearch={IoSearch}
            />
          )}

          {showSideBar && (
            <SideBar
              TiHomeOutline={TiHomeOutline}
              CiBookmark={CiBookmark}
              RiBallPenLine={RiBallPenLine}
              FiHelpCircle={FiHelpCircle}
              Login={Login}
              Logout={Logout}
              IoSettings={IoSettings}
              IoSearch={IoSearch}
              showFonts={showFonts}
            />
          )}
          {loading ? (
            <div>Loading</div>
          ) : showComponent ? (
            // When showComponent is false
            <div className="row">
              <div className="container">
                {isModalOpen && <LoginModal toggleModal={toggleModal} />}
                <Component {...pageProps} />
              </div>
            </div>
          ) : (
            // When showComponent is true

            <>
              {isModalOpen && <LoginModal toggleModal={toggleModal} />}
              <Component {...pageProps} />
            </>
          )}
        </div>
      </AIContext.Provider>
    </QueryClientProvider>
  );
}
