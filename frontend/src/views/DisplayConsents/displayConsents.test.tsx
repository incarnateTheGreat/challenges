import { QueryClient, QueryClientProvider } from "react-query";
import { act, render } from "@testing-library/react";
import useConsents from "hooks/useConsents";

import DisplayConsentsView from "./displayConsents.view";
import useConsentValues from "hooks/useConsentValues";

const queryClient = new QueryClient();

const mockUseConsents = useConsents as jest.Mock<any>;
const mockUseConsentValues = useConsentValues as jest.Mock<any>;

jest.mock("hooks/useConsents");
jest.mock("hooks/useConsentValues");

const mockedConsentData = [
  {
    name: "Garry Tsaconas",
    email: "gtsaconas@home.com",
    receiveNewsletter: true,
    enableTargetAds: false,
    enableAnonymousStatistics: true,
    id: 1,
  },
  {
    name: "Canada",
    email: "canada@rogers.com",
    receiveNewsletter: false,
    enableTargetAds: false,
    enableAnonymousStatistics: false,
    id: 2,
  },
];

const mockedConsentValues = {
  receiveNewsletter: "Receive newsletter",
  enableTargetAds: "Be shown target ads",
  enableAnonymousStatistics: "Contribute to anonymous visit statistics",
};

describe("Display Consents", () => {
  beforeEach(() => {
    mockUseConsents.mockImplementation(() => ({
      isLoading: true,
      data: undefined,
    }));

    mockUseConsentValues.mockImplementation(() => ({
      data: mockedConsentValues,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("loading spinner is active", async () => {
    let component;

    component = await render(
      <QueryClientProvider client={queryClient}>
        <DisplayConsentsView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    const spinner = getByTestId("spinner");

    // Verify that the spinner is active.
    expect(spinner).toBeTruthy();
  });

  test("Table renders with data", async () => {
    let component;

    component = await render(
      <QueryClientProvider client={queryClient}>
        <DisplayConsentsView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    const spinner = getByTestId("spinner");

    // Verify that the spinner is active.
    expect(spinner).toBeTruthy();

    // Populate table with data and disable loading spinner.
    await act(async () => {
      mockUseConsents.mockImplementation(() => ({
        isLoading: false,
        data: mockedConsentData,
      }));

      await component.rerender(
        <QueryClientProvider client={queryClient}>
          <DisplayConsentsView />
        </QueryClientProvider>
      );

      // Get the input elements.
      const table = getByTestId("displayConsents-table");

      // Verify that the table is visible.
      expect(table).toBeTruthy();
    });
  });

  test("Table does not render with no-data message", async () => {
    let component;

    component = await render(
      <QueryClientProvider client={queryClient}>
        <DisplayConsentsView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    const spinner = getByTestId("spinner");

    // Verify that the spinner is active.
    expect(spinner).toBeTruthy();

    // Complete load with no data.
    await act(async () => {
      mockUseConsents.mockImplementation(() => ({
        isLoading: false,
        data: [],
      }));

      await component.rerender(
        <QueryClientProvider client={queryClient}>
          <DisplayConsentsView />
        </QueryClientProvider>
      );

      // Get the no-data element.
      const noData: HTMLDivElement = getByTestId("displayConsents-noData");

      // Verify that the no-data element is visible.
      expect(noData).toBeTruthy();
      expect(noData.textContent).toEqual("Sorry. There is no data to display.");
    });
  });

  test("Server error does not render the table with message", async () => {
    let component;

    component = await render(
      <QueryClientProvider client={queryClient}>
        <DisplayConsentsView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    const spinner = getByTestId("spinner");

    // Verify that the spinner is active.
    expect(spinner).toBeTruthy();

    // Populate table with data and disable loading spinner.
    await act(async () => {
      mockUseConsents.mockImplementation(() => ({
        isLoading: false,
        data: undefined,
        error: {
          message:
            "Sorry. There was a problem connecting to the service. Please try again later.",
        },
      }));

      await component.rerender(
        <QueryClientProvider client={queryClient}>
          <DisplayConsentsView />
        </QueryClientProvider>
      );

      // Get the input elements.
      const serverError: HTMLDivElement = getByTestId(
        "displayConsents-serverError"
      );

      // Verify that the table is visible.
      expect(serverError).toBeTruthy();
      expect(serverError.textContent).toEqual(
        "Sorry. There was a problem connecting to the service. Please try again later."
      );
    });
  });
});
