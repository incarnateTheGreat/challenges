import React from "react";

const GiveConsent = () => {
  return (
    <>
      <div className="consentInputs">
        <div className="input-field col s6">
          <input placeholder="Placeholder" id="name" type="text" />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field col s6">
          <input placeholder="Placeholder" id="emailAddress" type="text" />
          <label htmlFor="emailAddress">Email</label>
        </div>
      </div>
      <div className="consentSelectors">
        <span>I agree to:</span>
        <div className="consentSelectors-selectors">
          <label>
            <input
              type="checkbox"
              id="receiveNewsletter"
              className="filled-in"
            />
            <span>Receive newsletter</span>
          </label>
          <label>
            <input type="checkbox" id="enableTargetAds" className="filled-in" />
            <span>Be shown targeted ads</span>
          </label>
          <label>
            <input
              type="checkbox"
              id="enableAnonymousStatistics"
              className="filled-in"
            />
            <span>Contribute to anonymous visit statistics</span>
          </label>
        </div>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          title="Give consent"
        >
          Give consent
        </button>
      </div>
    </>
  );
};

export default GiveConsent;
