import React from "react";
import loginModalStyles from "../../styles/loginModal.module.css";
function AuthSeperator() {
  return (
    <div className={loginModalStyles.auth__separator}>
      <span className={loginModalStyles["auth__separator--text"]}>or</span>
    </div>
  );
}

export default AuthSeperator;
