import { useContext, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "components/Spinner/spinner.component";
import Pagination from "components/Pagination/pagination.component";
import { ConsentsData, ConsentsContext } from "interfaces/interface";
import { BASE_URL } from "utils/constants";
import { parseLinkHeader } from "utils/utils";

const DisplayConsentsView = () => {
  const { repoName } = useContext(ConsentsContext);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [consentDataRes, setConsentDataRes] = useState({});
  const { isLoading, data, error } = useQuery<ConsentsData[]>(
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

  // Get the Consent values to display in the table.
  const { data: consentsMap = {} } = useQuery(
    [],
    () => {
      return fetch(`${BASE_URL}/consentValues`).then((response) =>
        response.json()
      );
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="displayConsents">
      {isLoading && <Spinner position="floatCenter" />}

      {!isLoading && data?.length > 0 && (
        <>
          <table className="striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Consent given for</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((consent, key) => {
                const {
                  name,
                  email,
                  receiveNewsletter,
                  enableTargetAds,
                  enableAnonymousStatistics,
                } = consent;

                let listedConsents: string[] | string = [];

                if (receiveNewsletter) {
                  listedConsents.push(consentsMap?.["receiveNewsletter"]);
                }

                if (enableTargetAds) {
                  listedConsents.push(consentsMap?.["enableTargetAds"]);
                }

                if (enableAnonymousStatistics) {
                  listedConsents.push(
                    consentsMap?.["enableAnonymousStatistics"]
                  );
                }

                listedConsents = listedConsents.join(", ");
                listedConsents =
                  listedConsents.length > 0 ? listedConsents : "None";

                return (
                  <tr key={key}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{listedConsents}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            data={consentDataRes}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </>
      )}

      {!isLoading && data?.length === 0 && (
        <div>Sorry. There is no data to display.</div>
      )}

      {!isLoading && !data && error && (
        <div>
          Sorry. There was a problem connecting to the service. Please try again
          later.
        </div>
      )}
    </div>
  );
};

export default DisplayConsentsView;
