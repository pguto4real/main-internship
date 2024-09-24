import React, { useContext } from "react";
import { AIContext } from "../../Helpers/Context";
import NotLoggedIn from "../../components/NotLoggedIn";
import Link from "next/link";

function settings() {
  const { isLoggedIn, currentUser, subscription } = useContext(AIContext);
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
              <div className="settings__text">{subscription?.items[0].price.product.name==="Premium Plus Yearly"?"Premium-plus":"Premium"}</div>
              {!subscription && (
                <Link
                  className="btn__settings settings__upgrade--btn"
                  href="/choose-plan"
                >
                  Upgrade to Premium
                </Link>
              )}
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">{currentUser.email}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default settings;
settings.showWrapperFull = false;
settings.showFonts = false;
