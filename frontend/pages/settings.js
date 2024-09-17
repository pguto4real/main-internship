import React, { useContext } from "react";
import { AIContext } from "../Helpers/Context";
import NotLoggedIn from "../components/NotLoggedIn";

function settings() {
  const { isLoggedIn } = useContext(AIContext);

  return (
    <div class="container">
      <div class="row">
        <div class="section__title page__title">Settings</div>
        {!isLoggedIn ? (
          <NotLoggedIn />
        ) : (
          <>
            <div class="setting__content">
              <div class="settings__sub--title">Your Subscription plan</div>
              <div class="settings__text">Basic</div>
              <a
                class="btn__settings settings__upgrade--btn"
                href="/choose-plan"
              >
                Upgrade to Premium
              </a>
            </div>
            <div class="setting__content">
              <div class="settings__sub--title">Email</div>
              <div class="settings__text">udokigb@gmail.com</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default settings;
