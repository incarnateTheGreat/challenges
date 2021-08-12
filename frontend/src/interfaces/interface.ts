import { createContext } from "react";

export interface ConsentsData {
  name: string;
  email: string;
  receiveNewsletter: boolean;
  enableTargetAds: boolean;
  enableAnonymousStatistics: boolean;
}

export interface ConsentsContext {
  repoName: string;
}

export const ConsentsContext = createContext({} as ConsentsContext);
