import { useQuery } from "react-query";
import { BASE_URL } from "utils/constants";

const useConsentValues = () => {
  return useQuery(
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
};

export default useConsentValues;
