import { onAuthStateChanged } from "firebase/auth";
import MainNavBar from "../components/MainNavBar";
import SideBar from "../components/SideBar";
import { AIContext, AuthProvider } from "../Helpers/Context";
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

import LoginModal from "../components/LoginModal";
import useCurrentUser from "../hook/useCurrentUser";
// import useSubscription from "../hooks/useSubscription";
import payments from "../lib/initializeStripe";

import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { db } from "../firebase/connectFirebase";
import { collection, getDocs,query } from "firebase/firestore";
import useSubscription from "../hook/useSubscription";

export default function App({ Component, pageProps }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [variant, setVariant] = useState("login");
  const [isCheckingUser, setIsCheckingUser] = useState(false);
 
  const [fontSize, setFontSize] = useState("text-base");
  const [bookExist, setBookExist] = useState(false);
  const [booksInLibrary, setBooksInLibrary] = useState([]);
  const [booksInCompleted, setBooksInCompleted] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const [products, setProducts] = useState([]); // Add products state
  const [loadingProducts, setLoadingProducts] = useState(true);

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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true)
        const productDocs = (await getDocs(collection(db, "products"))).docs;
        const productsWithPrices = [];

        for (const doc of productDocs) {
          const productData = { id: doc.id, ...doc.data() };

          const pricesRef = collection(db, "products", doc.id, "prices");
          const pricesQuerySnap = await getDocs(pricesRef);

          pricesQuerySnap.forEach((priceDoc) => {
        
            productsWithPrices.push({
              ...productData,
              priceId: priceDoc.id,
              unitAmount: priceDoc.data().unit_amount,
              prices: priceDoc.data(),
            });
          });
        }

     
        setProducts(productsWithPrices); // Set the products to state
      } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
      } finally {
        setLoadingProducts(false); // Mark loading as complete
      }
    };

    fetchProducts();
  }, []);

  const subscription = useSubscription(user);

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check localStorage or system preferences for dark mode on page load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(true);
  }, []);

  useEffect(() => {
    console.log(darkMode)
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
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
          // setSubscription,
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
          products,
          loadingProducts,
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

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
