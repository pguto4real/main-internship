import React, { useContext } from "react";
import { AIContext } from "../../Helpers/Context";
import NotLoggedIn from "../../components/NotLoggedIn";
import Link from "next/link";

function settings() {
  const { isLoggedIn } = useContext(AIContext);
  

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {!isLoggedIn ? (
          <NotLoggedIn />
        ) : (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription plan</div>
              <div className="settings__text">Basic</div>
              <Link
                className="btn__settings settings__upgrade--btn"
                href="/choose-plan"
              >
                Upgrade to Premium
              </Link>
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">udokigb@gmail.com</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default settings;
settings.showWrapperFull = false
settings.showFonts = false