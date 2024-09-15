import React from "react";
import loginModalStyles from "../../styles/loginModal.module.css";
function AuthSeperator() {
  return (
    <div class={loginModalStyles.auth__separator}>
      <span class={loginModalStyles["auth__separator--text"]}>or</span>
    </div>
  );
}

export default AuthSeperator;
