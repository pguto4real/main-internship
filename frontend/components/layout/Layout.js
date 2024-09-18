import { onAuthStateChanged } from "firebase/auth";

import { AIContext } from "../../Helpers/Context";

import { firebaseAuth } from "../../../backend/db/firebase/connectFirebase";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

import iconMapping from "../../utils/iconMapping";

import LoginModal from "../LoginModal";
import SideBar from "../SideBar";
import MainNavBar from "../MainNavBar";

export default function Layout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const [user, setUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginModalRef = useRef(null);
  const SideBarModalRef = useRef(null);

  const [variant, setVariant] = useState("login");

  const router = useRouter();

  // Define routes where you don't want the component to appear
  const hiddenRoutes = ["/"]; // Add any routes where MyComponent should not be shown

  // Check if the current route is in the hidden routes list
  const showComponent = !hiddenRoutes.includes(router.pathname);

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
  const [isCheckingUser, setIsCheckingUser] = useState(false);
//   const checkLoginStatus = () => {
//     try {
//       setIsCheckingUser(true);

//       onAuthStateChanged(firebaseAuth, (user) => {
//         if (user) {
//           setUser(user);
//           setIsLoggedIn(true);
//         }
//       });
//       setIsCheckingUser(false);
//     } catch (error) {
//       console.log("Error in getCurrentUser controller", error.message);
//     }
//   };

//   useEffect(() => {
//     console.log('1234')
//    checkLoginStatus();
//   }, []);
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
        }}
      >
        {/* Conditionally render MyComponent based on the current route */}
        <div className="wrapper">
          <Toaster />
          {showComponent && (
            <MainNavBar
              toggleSideBar={toggleSideBar}
              IoMenu={IoMenu}
              IoSearch={IoSearch}
            />
          )}

          {showComponent && (
            <SideBar
              TiHomeOutline={TiHomeOutline}
              CiBookmark={CiBookmark}
              RiBallPenLine={RiBallPenLine}
              FiHelpCircle={FiHelpCircle}
              Login={Login}
              Logout={Logout}
              IoSettings={IoSettings}
              IoSearch={IoSearch}
            />
          )}

          <div className="row">
            <div className="container">
              {isModalOpen && <LoginModal toggleModal={toggleModal} />}
              {children}
            </div>
          </div>
        </div>
      </AIContext.Provider>
    </QueryClientProvider>
  );
}
