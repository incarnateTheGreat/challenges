import { useContext, useState } from "react";
import Spinner from "components/Spinner/spinner.component";
import Pagination from "components/Pagination/pagination.component";
import { ConsentsContext } from "interfaces/interface";
import useConsents from "hooks/useConsents";
import useConsentVales from "hooks/useConsentValues";

const DisplayConsentsView = () => {
  const { repoName } = useContext(ConsentsContext);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [consentDataRes, setConsentDataRes] = useState({});
  const { isLoading, data, error } = useConsents(
    repoName,
    pageNumber,
    setConsentDataRes
  );

  // Get the Consent values to display in the table.
  const { data: consentsMap = {} } = useConsentVales();

  return (
    <div className="displayConsents">
      {isLoading && <Spinner position="floatCenter" />}

      {!isLoading && data?.length > 0 && (
        <>
          <table className="striped" data-testid="displayConsents-table">
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
        <div data-testid="displayConsents-noData">
          Sorry. There is no data to display.
        </div>
      )}

      {!isLoading && !data && error && (
        <div data-testid="displayConsents-serverError">
          Sorry. There was a problem connecting to the service. Please try again
          later.
        </div>
      )}
    </div>
  );
};

export default DisplayConsentsView;
