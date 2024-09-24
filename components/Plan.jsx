import React, { useState } from "react";

const Plan = ({ data, selectedPlan, handlePlanClick }) => {
  const isSelectedPlan = selectedPlan === data;

  return (
    <>
      <div
        onClick={() =>
          handlePlanClick(
            data,
            data.stripe_metadata_title,
            data.stripe_metadata_subTitle
          )
        }
        className={`plan__card ${isSelectedPlan && "plan__card--active"}`}
      >
        {isSelectedPlan ? (
          <div className="plan__card--circle">
            <div className="plan__card--dot"></div>
          </div>
        ) : (
          <div className="plan__card--circle"></div>
        )}

        <div className="plan__card--content">
          <div className="plan__card--title">{data.name}</div>
          <div className="plan__card--price">
            ${(data.prices.unit_amount / 100).toFixed(2)}/{data.prices.interval}
          </div>
          {data.prices.trial_period_days ? (
            <div className="plan__card--text">
              {data.prices.trial_period_days}-day free trial included
            </div>
          ) : (
            <div className="plan__card--text">No trial included</div>
          )}
        </div>
      </div>
      {data.prices.interval === "year" && (
        <div className="plan__card--separator">
          <div className="plan__separator">or</div>
        </div>
      )}
    </>
  );
};

export default Plan;
