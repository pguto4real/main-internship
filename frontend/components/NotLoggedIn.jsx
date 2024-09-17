import React, { useContext } from "react";
import { AIContext } from "../Helpers/Context";

function NotLoggedIn() {
    const { setIsModalOpen, isModalOpen } = useContext(AIContext);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
      };
  return (
    <div class="settings__login--wrapper">
      <img
        alt="login"
        srcset="/assets/login.png"
        src="/assets/login.png"
        width="1033"
        height="712"
        className="text-transparent"
        decoding="async"
        data-nimg="1"
        loading="lazy"
       
      />
      <div class="settings__login--text">
        Log in to your account to see your details.
      </div>
      <button class="btn__settings settings__login--btn" fdprocessedid="i3k6bj" onClick={()=>toggleModal()}>
        Login
      </button>
    </div>
  );
}

export default NotLoggedIn;
