import GiveConsent from "views/giveConsent.component";
import Consents from "views/consents.component";

const routes = [
  {
    label: "Give consent",
    path: "/give-consent",
    component: GiveConsent,
    exact: true,
  },
  {
    label: "Consents",
    path: "/consents",
    component: Consents,
    exact: true,
  },
];

export default routes;
