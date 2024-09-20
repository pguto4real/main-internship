import { onAuthStateChanged } from "firebase/auth";
import MainNavBar from "../components/MainNavBar";
import SideBar from "../components/SideBar";
import { AIContext, AuthProvider } from "../Helpers/Context";
import checkCurrent from "../hook/formatTime";

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

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [variant, setVariant] = useState("login");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [fontSize, setFontSize] = useState("text-base");

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
  console.log(showComponent);
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
  const checkLoginStatus = () => {
    try {
      setIsCheckingUser(true);

      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUser(user);
          setIsLoggedIn(true);
        }
      });
      setIsCheckingUser(false);
    } catch (error) {
      console.log("Error in getCurrentUser controller", error.message);
    }
  };

  useEffect(() => {
    return () => checkLoginStatus();
  }, [router]);

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
          user,
          setUser,
          isLoggedIn,
          setIsLoggedIn,
          isCheckingUser,
          setIsCheckingUser,
          subscription,
          setSubscription,
          fontSize,
          setFontSize,
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
          {showComponent ? (
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
