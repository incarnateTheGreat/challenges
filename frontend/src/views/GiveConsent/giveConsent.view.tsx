import { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "utils/constants";
import { isValidEmail } from "utils/utils";
import Spinner from "components/Spinner/spinner.component";
import useCreateConsent from "hooks/useCreateConsent";

const GiveConsentView = () => {
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    receiveNewsletter: false,
    enableTargetAds: false,
    enableAnonymousStatistics: false,
  });

  // Fire the POST call to create the Consent.
  const createConsent = async () => {
    return await fetch(`${BASE_URL}/consents`, {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  // Handle the addition of a new Consent.
  const { mutate, isLoading } = useCreateConsent(history, createConsent);

  // If all the fields have been populated, then allow for submission.
  const isSubmitEnabled = () => {
    const {
      name,
      email,
      receiveNewsletter,
      enableTargetAds,
      enableAnonymousStatistics,
    } = formValues;

    return (
      name &&
      email &&
      isValidEmail(formValues.email) &&
      (receiveNewsletter || enableTargetAds || enableAnonymousStatistics)
    );
  };

  return (
    <div className="giveConsent">
      <div className="giveConsent-consentInputs">
        <div className="input-field col s6">
          <input
            data-testid="giveConsent-name"
            placeholder="Name"
            id="name"
            type="text"
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="input-field col s6">
          <input
            data-testid="giveConsent-email"
            placeholder="Email"
            id="email"
            type="text"
            value={formValues.email}
            onChange={(e) =>
              setFormValues({ ...formValues, email: e.target.value })
            }
          />
          <label htmlFor="email">Email</label>
          {!isValidEmail(formValues.email) && (
            <span className="giveConsent-consentInputs-helper-text">
              The email address is invalid.
            </span>
          )}
        </div>
      </div>
      <div className="giveConsent-consentSelectors">
        <span>I agree to:</span>
        <div className="giveConsent-consentSelectors-selectors">
          <label>
            <input
              data-testid="giveConsent-receiveNewsletter"
              type="checkbox"
              id="receiveNewsletter"
              checked={formValues.receiveNewsletter}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  receiveNewsletter: e.target.checked,
                })
              }
            />
            <span>Receive newsletter</span>
          </label>
          <label>
            <input
              data-testid="giveConsent-enableTargetAds"
              type="checkbox"
              id="enableTargetAds"
              checked={formValues.enableTargetAds}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  enableTargetAds: e.target.checked,
                })
              }
            />
            <span>Be shown targeted ads</span>
          </label>
          <label>
            <input
              data-testid="giveConsent-enableAnonymousStatistics"
              type="checkbox"
              id="enableAnonymousStatistics"
              checked={formValues.enableAnonymousStatistics}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  enableAnonymousStatistics: e.target.checked,
                })
              }
            />
            <span>Contribute to anonymous visit statistics</span>
          </label>
        </div>
        <button
          data-testid="giveConsent-submitBtn"
          className="btn waves-effect waves-light"
          type="button"
          disabled={!isSubmitEnabled()}
          name="action"
          title="Give consent"
          onClick={() => mutate()}
        >
          <span className="consentSelectors-buttonTitle">Give consent</span>{" "}
          {isLoading && <Spinner position="mini" />}
        </button>
      </div>
    </div>
  );
};

export default GiveConsentView;
