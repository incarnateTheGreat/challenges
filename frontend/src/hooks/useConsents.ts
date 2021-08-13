import { ConsentsData } from "interfaces/interface";
import { useQuery } from "react-query";
import { BASE_URL } from "utils/constants";
import { parseLinkHeader } from "utils/utils";

const useConsents = (repoName, pageNumber, setConsentDataRes) => {
  return useQuery<ConsentsData[]>(
    [repoName, pageNumber],
    () => {
      let url = `${BASE_URL}/consents?_page=${pageNumber}&_limit=2`;

      // Return the Consent data and set the Pagination data.
      return fetch(url).then(async (response) => {
        const data = await response.json();

        // Set the Pagination for use. Get the previous, last, and total number of pages.
        const paginationData = {
          total: +response.headers.get("X-Total-Count"),
          links:
            response.headers.get("Link") &&
            parseLinkHeader(response.headers.get("Link")),
          data,
        };

        setConsentDataRes(paginationData);

        return data;
      });
    },
    {
      refetchOnWindowFocus: false,
    }
  );
};

export default useConsents;
