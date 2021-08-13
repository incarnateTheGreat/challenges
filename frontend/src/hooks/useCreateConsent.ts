import { useMutation } from "react-query";

const useCreateConsent = (history, mutationFunc) => {
  return useMutation(mutationFunc, {
    // Navigate to the listed consents' page.
    onSuccess: async () => {
      await history.push({
        pathname: "/consents",
      });
    },
  });
};

export default useCreateConsent;
