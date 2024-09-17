import React, { useState, useRef, useEffect, useContext } from "react";

import { FaUser } from "react-icons/fa";

import loginModalStyles from "../styles/loginModal.module.css";
import AuthSeperator from "./ui/AuthSeperator";
import { FcGoogle } from "react-icons/fc";
import Input from "./ui/Input";
import { AIContext, AuthContext, useAuth } from "../Helpers/Context";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { firebaseAuth } from "../../backend/db/firebase/connectFirebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const LoginModal = ({ toggleModal }) => {
  const router = useRouter();
  const {
    variant,
    setVariant,
    loginModalRef,
   
    setUser,
    setIsModalOpen,
    setIsLoggedIn,
  } = useContext(AIContext);
  console.log(variant);
  // const [email, setEmail] = useState("");
  // const [password, setpassword] = useState("");
  // const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // console.log(email, password);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    variant: variant,
  });
  console.log(variant);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    mutate: signUpMutate,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ email, password, variant }) => {
      let path = "";
      let method = "";

      if (variant === "register") {
        path = "http://localhost:7000/api/auth/signup";
        method = "POST";
      } else if (variant === "login") {
        console.log(1111);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          toast.error("Invalid email format");
          throw error;
        }

        signInWithEmailAndPassword(firebaseAuth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            setUser(user);
            setIsLoggedIn(true)
            router.push('/for-you');
          })
          .catch((error) => {
            console.log("Error in login controller", error.message);
            return res.status(500).json({ error: error.message });
            // ..
          });
      }
    },
    onError: () => {},
    onSuccess: () => {
      let message = "";
      if (variant === "register") {
        message = "Account created succesfull";
      } else if (variant === "login") {
        message = "Login succesfull";
        
      }
      toast.success(message);
      setIsModalOpen(false);
      // setFormData({});
    },
  });

  const handleLoginOrRegister = (e) => {
    e.preventDefault();
   
    if (variant === "register") {
     
      signUpMutate(formData, "register");
    } else if (variant === "login") {
  
      signUpMutate(formData, "login");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(document.getElementById("myTextField"));
  }, []);
  return (
    <>
      (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col z-[9999]">
        <div
          ref={loginModalRef}
          className="modal-box relative bg-white rounded shadow-lg max-w-sm !p-0 overflow-hidden"
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => toggleModal()}
          >
            ✕
          </button>
          <div className="pt-12 px-[38px] pb-6">
            <div className="text-center text-[20px] font-[700] text=[#032b41] mb-6">
              {variant === "login"
                ? "Log in to Summarist"
                : variant === "register"
                ? "Sign Up to Summarist"
                : "Reset your password"}
            </div>

            {variant === "login" && (
              <>
                <button
                  class={`${loginModalStyles["btn__ai"]} ${loginModalStyles["guest__btn--wrapper"]}`}
                  fdprocessedid="pi3tk"
                >
                  <figure
                    className={`${loginModalStyles["google__icon--mask"]} ${loginModalStyles["guest__icon--mask"]}`}
                  >
                    <FaUser />
                  </figure>
                  <div>Login as a Guest</div>
                </button>
                <AuthSeperator />
              </>
            )}

            {variant === "login" ? (
              <>
                <button
                  className={`${loginModalStyles["btn__ai"]} ${loginModalStyles["guest__btn--wrapper"]} !bg-[#4285f4] hover:!bg-[#3367d6]`}
                  fdprocessedid="pi3tk"
                >
                  <figure
                    className={`${loginModalStyles["google__icon--mask"]} ${loginModalStyles["guest__icon--mask"]}`}
                  >
                    <FcGoogle />
                  </figure>
                  <div>Login With Google</div>
                </button>
                <AuthSeperator />
              </>
            ) : (
              variant === "register" && (
                <>
                  <button
                    className={`${loginModalStyles["btn__ai"]} ${loginModalStyles["guest__btn--wrapper"]} !bg-[#4285f4] hover:!bg-[#3367d6]`}
                    fdprocessedid="pi3tk"
                  >
                    <figure
                      className={`${loginModalStyles["google__icon--mask"]} ${loginModalStyles["guest__icon--mask"]}`}
                    >
                      <FcGoogle />
                    </figure>
                    <div>Sign Up With Google</div>
                  </button>
                  <AuthSeperator />
                </>
              )
            )}

            <form action="" className="flex flex-col gap-4">
              {/* <input
                  type="text"
                  name={"email"}
                  disabled={isLoading}
                  onChange={handleInputChange}
                  placeholder={"Email"}
                  ref={emailRef}
                  className=" h-[40px] border-2 rounded-md text-[#394547] py-0 px-3 outline-none
                 focus:border-[#2bd97c]
                 "
                 
                /> */}
              <input
                id="email"
                type="text"
                name="email"
                value={formData.email} // Controlled input field for lastName
                onChange={handleInputChange} // Handle change
                placeholder="Email"
              />

              {variant !== "forgot" && (
                <input
                  type="password"
                  name="password"
                  value={formData.password} // Controlled input field for lastName
                  onChange={handleInputChange} // Handle change
                  placeholder="Password"
                />

                // <Input
                //   ref={passwordRef}
                //   placeholder="Password"
                //   name="password"
                //   defaultValue="fff"
                //   onChange={handleInputChange}
                //   value={formData.password}
                // />
              )}
              {variant === "login" ? (
                <button
                  className={`hover:bg-[#20ba68] bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-md text-base transition-colors duration-200 flex items-center justify-center`}
                  onClick={handleLoginOrRegister}
                >
                  {"Login"}
                </button>
              ) : variant === "register" ? (
                <button
                  className={`hover:bg-[#20ba68] bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-md text-base transition-colors duration-200 flex items-center justify-center`}
                  onClick={handleLoginOrRegister}
                >
                  {isPending ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              ) : (
                <button
                  className={`hover:bg-[#20ba68] bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-md text-base transition-colors duration-200 flex items-center justify-center`}
                  onClick={handleLoginOrRegister}
                >
                  {"Send reset password link"}
                </button>
              )}
              {/* {isError && <p className='text-red-500 text-center'>{error.message}</p>} */}
            </form>
          </div>

          {variant === "login" && (
            <div
              onClick={() => setVariant("forgot")}
              className="text-center text-[#116be9] font-light text-sm w-fit mx-auto mb-4 cursor-pointer"
            >
              Forgot your password?
            </div>
          )}
          {variant === "login" ? (
            <button
              class="bg-[#e1e9e8] h-10 text-center text-[#116be9] w-full rounded-b-md font-light text-base"
              onClick={() => setVariant("register")}
              fdprocessedid="6kc93j"
            >
              Don't have an account?
            </button>
          ) : variant === "register" ? (
            <button
              class="bg-[#e1e9e8] h-10 text-center text-[#116be9] w-full rounded-b-md font-light text-base"
              onClick={() => setVariant("login")}
              fdprocessedid="6kc93j"
            >
              Already have an account?
            </button>
          ) : (
            <button
              class="bg-[#e1e9e8] h-10 text-center text-[#116be9] w-full rounded-b-md font-light text-base"
              onClick={() => setVariant("login")}
              fdprocessedid="6kc93j"
            >
              Go to login
            </button>
          )}
        </div>
      </div>
      )
    </>
  );
};

export default LoginModal;
