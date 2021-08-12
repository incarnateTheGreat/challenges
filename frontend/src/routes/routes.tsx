import GiveConsent from "views/GiveConsent/giveConsentView.view";
import DisplayConsentsView from "views/DisplayConsentsView/displayConsentsView.view";

const routes = [
  {
    label: "Give consent",
    path: "/give-consent",
    component: GiveConsent,
    exact: true,
  },
  {
    label: "Display consents",
    path: "/consents",
    component: DisplayConsentsView,
    exact: true,
  },
];

export default routes;
