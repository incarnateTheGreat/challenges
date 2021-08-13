import GiveConsent from "views/GiveConsent/giveConsent.view";
import DisplayConsentsView from "views/DisplayConsents/displayConsents.view";

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
