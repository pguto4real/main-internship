import React, { useState, useRef, useEffect, useContext } from "react";

import { FaUser } from "react-icons/fa";

import loginModalStyles from "../styles/loginModal.module.css";
import AuthSeperator from "./ui/AuthSeperator";
import { FcGoogle } from "react-icons/fc";
import Input from "./ui/Input";
import { AIContext } from "../Helpers/Context";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const LoginModal = ({ toggleModal }) => {
  const { variant, setVariant, loginModalRef } = useContext(AIContext);

  // const [email, setEmail] = useState("");
  // const [password, setpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

  const { mutate:signUpMutate, isError, isPending, error } = useMutation({
		mutationFn: async ({ email, password }) => {
			try {

				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({ email, password })
				})
				const data = await res.json()
				if (!res.ok) throw new Error(data.error || "Failed to create account");
				if (data.error) throw new Error(data.error)
			} catch (error) {
				throw error
			}
		},
		onSuccess: () => {
			toast.success("Account created succesfull")
			setFormData({})
		}

	})
  const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
  const handleLoginOrRegister = (e) => {
    e.preventDefault();
    console.log(variant);
    if(variant === 'register'){
      signUpMutate(formData)
    }
    // if (isCommenting) return;
    // commentPost(comment);
  };


  return (
    <>
      (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col z-50">
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
              <Input
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
               
                disabled={isLoading}
              />

              {variant !== "forgot" && (
                <Input
                 
                  placeholder="Password"
               
                  name='password'
                  onChange={handleInputChange}
              
                />
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
                  {"Register"}
                </button>
              ) : (
                <button
                  className={`hover:bg-[#20ba68] bg-[#2bd97c] text-[#032b41] w-full h-10 rounded-md text-base transition-colors duration-200 flex items-center justify-center`}
                  onClick={handleLoginOrRegister}
                >
                  {"Send reset password link"}
                </button>
              )}
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
