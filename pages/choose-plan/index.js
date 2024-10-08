import React, { useContext, useEffect, useState } from "react";
import { AIContext } from "../../Helpers/Context";
import Plan from "../../components/Plan";
import { loadCheckout } from "../../lib/initializeStripe";
import { useRouter } from "next/router";

function index() {
  const { products, loadingProducts, currentUser, subscription } =
    useContext(AIContext);
  const [selectedPlan, setSelectedPlan] = useState(products[0]);
  const [spanText, setSpanText] = useState("");
  const [spanSubText, setSpanSubText] = useState("");
  const [isBillingLoading, setBillingLoading] = useState(false);
  const router = useRouter();
  console.log(currentUser);
  useEffect(() => {
    if (currentUser) {
      subscription && router.push("/for-you");
    }
  }, [subscription]);
  const subscribeToPlan = () => {
    if (!currentUser) return;

    loadCheckout(selectedPlan?.priceId, currentUser.uid);
    setBillingLoading(true);
  };

  const handlePlanClick = (plan, spanText, spanSubText) => {
    setSelectedPlan(plan);
    setSpanText(spanText);
    setSpanSubText(spanSubText);
  };
  useEffect(() => {
    if (!loadingProducts && products.length > 0) {
      setSelectedPlan(products[0]);
      setSpanText(products[0].stripe_metadata_title);
      setSpanSubText(products[0].stripe_metadata_subTitle);
    }
  }, [products]);

  return (
    <div className="wrapper wrapper__full">
      <div className="sidebar__overlay sidebar__overlay--hidden"></div>
      <div className="plan">
        <div className="plan__header--wrapper">
          <div className="plan__header">
            <div className="plan__title">
              Get unlimited access to many amazing books to read
            </div>
            <div className="plan__sub--title">
              Turn ordinary moments into amazing learning opportunities
            </div>
            <figure className="plan__img--mask">
              <img
                alt="pricing"
                srcSet="/assets/pricing-top.png"
                src="/assets/pricing-top.png"
                width="860"
                height="722"
                decoding="async"
                data-nimg="1"
                loading="lazy"
                className="text-transparent"
              />
            </figure>
          </div>
        </div>
        <div className="row">
          <div className="container">
            <div className="plan__features--wrapper">
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M854.6 288.7c6 6 9.4 14.1 9.4 22.6V928c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h424.7c8.5 0 16.7 3.4 22.7 9.4l215.2 215.3zM790.2 326L602 137.8V326h188.2zM320 482a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h384a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320zm0 136a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h184a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8H320z"></path>
                  </svg>
                </figure>
                <div className="plan__features--text">
                  <b>Key ideas in few min</b> with many books to read
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path fill="none" d="M0 0H24V24H0z"></path>
                      <path d="M21 3v2c0 3.866-3.134 7-7 7h-1v1h5v7c0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2v-7h5v-3c0-3.866 3.134-7 7-7h3zM5.5 2c2.529 0 4.765 1.251 6.124 3.169C10.604 6.51 10 8.185 10 10v1h-.5C5.358 11 2 7.642 2 3.5V2h3.5z"></path>
                    </g>
                  </svg>
                </figure>
                <div className="plan__features--text">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className="plan__features">
                <figure className="plan__features--icon">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 640 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M434.7 64h-85.9c-8 0-15.7 3-21.6 8.4l-98.3 90c-.1.1-.2.3-.3.4-16.6 15.6-16.3 40.5-2.1 56 12.7 13.9 39.4 17.6 56.1 2.7.1-.1.3-.1.4-.2l79.9-73.2c6.5-5.9 16.7-5.5 22.6 1 6 6.5 5.5 16.6-1 22.6l-26.1 23.9L504 313.8c2.9 2.4 5.5 5 7.9 7.7V128l-54.6-54.6c-5.9-6-14.1-9.4-22.6-9.4zM544 128.2v223.9c0 17.7 14.3 32 32 32h64V128.2h-96zm48 223.9c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM0 384h64c17.7 0 32-14.3 32-32V128.2H0V384zm48-63.9c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.9 7.2-16 16-16zm435.9 18.6L334.6 217.5l-30 27.5c-29.7 27.1-75.2 24.5-101.7-4.4-26.9-29.4-24.8-74.9 4.4-101.7L289.1 64h-83.8c-8.5 0-16.6 3.4-22.6 9.4L128 128v223.9h18.3l90.5 81.9c27.4 22.3 67.7 18.1 90-9.3l.2-.2 17.9 15.5c15.9 13 39.4 10.5 52.3-5.4l31.4-38.6 5.4 4.4c13.7 11.1 33.9 9.1 45-4.7l9.5-11.7c11.2-13.8 9.1-33.9-4.6-45.1z"></path>
                  </svg>
                </figure>
                <div className="plan__features--text">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>
            <div className="section__title">Choose the plan that fits you</div>
            {!loadingProducts &&
              products.map((product, index) => (
                <Plan
                  key={index}
                  data={product}
                  selectedPlan={selectedPlan}
                  handlePlanClick={handlePlanClick}
                />
              ))}

            <div className="plan__card--cta">
              <span className="btn--wrapper">
                <button
                  onClick={subscribeToPlan}
                  className="btn w-[300px]"
                  fdprocessedid="i4p0y"
                  disabled={!selectedPlan || isBillingLoading}
                >
                  {isBillingLoading ? (
                    <span className="loading loading-infinity loading-lg"></span>
                  ) : (
                    <span>{spanText}</span>
                  )}
                </button>
              </span>
              <div className="plan__disclaimer">{spanSubText}</div>
            </div>
            <div className="faq__wrapper">
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    How does the free 7-day trial work?
                  </div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="accordion__icon accordion__icon--rotate"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </div>
                <div className="collapse show h-[96px];">
                  <div className="accordion__body">
                    Begin your complimentary 7-day trial with a Summarist annual
                    membership. You are under no obligation to continue your
                    subscription, and you will only be billed when the trial
                    period expires. With Premium access, you can learn at your
                    own pace and as frequently as you desire, and you may
                    terminate your subscription prior to the conclusion of the
                    7-day free trial.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    Can I switch subscriptions from monthly to yearly, or yearly
                    to monthly?
                  </div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="accordion__icon "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </div>
                <div className="collapse h-0">
                  <div className="accordion__body">
                    While an annual plan is active, it is not feasible to switch
                    to a monthly plan. However, once the current month ends,
                    transitioning from a monthly plan to an annual plan is an
                    option.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    What's included in the Premium plan?
                  </div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="accordion__icon "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </div>
                <div className="collapse h-0">
                  <div className="accordion__body">
                    Premium membership provides you with the ultimate Summarist
                    experience, including unrestricted entry to many
                    best-selling books high-quality audio, the ability to
                    download titles for offline reading, and the option to send
                    your reads to your Kindle.
                  </div>
                </div>
              </div>
              <div className="accordion__card">
                <div className="accordion__header">
                  <div className="accordion__title">
                    Can I cancel during my trial or subscription?
                  </div>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="accordion__icon "
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    ></path>
                  </svg>
                </div>
                <div className="collapse h-0">
                  <div className="accordion__body">
                    You will not be charged if you cancel your trial before its
                    conclusion. While you will not have complete access to the
                    entire Summarist library, you can still expand your
                    knowledge with one curated book per day.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section id="footer">
          <div className="container">
            <div className="row">
              <div className="footer__top--wrapper">
                <div className="footer__block">
                  <div className="footer__link--title">Actions</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Summarist Magazine</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Cancel Subscription</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Help</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Contact us</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Useful Links</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Pricing</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Summarist Business</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Gift Cards</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Authors &amp; Publishers</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Company</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">About</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Careers</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Partners</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Code of Conduct</a>
                    </div>
                  </div>
                </div>
                <div className="footer__block">
                  <div className="footer__link--title">Other</div>
                  <div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Sitemap</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Legal Notice</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Terms of Service</a>
                    </div>
                    <div className="footer__link--wrapper">
                      <a className="footer__link">Privacy Policies</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer__copyright--wrapper">
                <div className="footer__copyright">
                  Copyright © 2023 Summarist.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default index;

index.showSideBar = false;
index.showComponent = false;
index.showMainNavBar = false;
