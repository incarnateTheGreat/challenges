import { QueryClient, QueryClientProvider } from "react-query";
import { act, fireEvent, render } from "@testing-library/react";

import GiveConsentView from "./giveConsent.view";

const queryClient = new QueryClient();

describe("Give Consent", () => {
  test("Populate the Name and Email inputs", async () => {
    let component;

    component = render(
      <QueryClientProvider client={queryClient}>
        <GiveConsentView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    // Get the input elements.
    const name: HTMLInputElement = getByTestId("giveConsent-name");
    const email: HTMLInputElement = getByTestId("giveConsent-email");

    // Verify Name and Email inputs exist and are empty.
    expect(name).toBeTruthy();
    expect(name.value).toBe("");

    expect(email).toBeTruthy();
    expect(email.value).toBe("");

    // Update the Name and Email inputs.
    await act(async () => {
      fireEvent.change(name, { target: { value: "Garry" } });
    });

    await act(async () => {
      fireEvent.change(email, { target: { value: "garry@home.com" } });
    });

    // Verify Name and Email inputs exist and are now populated.
    expect(name).toBeTruthy();
    expect(name.value).toBe("Garry");

    expect(email).toBeTruthy();
    expect(email.value).toBe("garry@home.com");
  });

  test("Select one of the checkboxes", async () => {
    let component;

    component = render(
      <QueryClientProvider client={queryClient}>
        <GiveConsentView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    // Get the input elements.
    const receiveNewsletter = getByTestId("giveConsent-receiveNewsletter");

    // Verify the checkbox exists and is empty.
    expect(receiveNewsletter).toBeTruthy();
    expect(receiveNewsletter).not.toBeChecked();

    // Check the checkbox.
    receiveNewsletter.click();

    // Verify that the checkbox is checked.
    expect(receiveNewsletter).toBeChecked();
  });

  test("Enable the submit button by populating the form", async () => {
    let component;

    component = render(
      <QueryClientProvider client={queryClient}>
        <GiveConsentView />
      </QueryClientProvider>
    );

    const { getByTestId } = component;

    // Get the input elements.
    const name: HTMLInputElement = getByTestId("giveConsent-name");
    const email: HTMLInputElement = getByTestId("giveConsent-email");
    const receiveNewsletter = getByTestId("giveConsent-receiveNewsletter");
    const submitBtn = getByTestId("giveConsent-submitBtn");

    // Verify Name, Email, and checkbox inputs exist and are empty.
    expect(name).toBeTruthy();
    expect(name.value).toBe("");

    expect(email).toBeTruthy();
    expect(email.value).toBe("");

    expect(receiveNewsletter).toBeTruthy();
    expect(receiveNewsletter).not.toBeChecked();

    expect(submitBtn).toBeTruthy();
    expect(submitBtn).toBeDisabled();

    // Update the Name and Email inputs.
    await act(async () => {
      fireEvent.change(name, { target: { value: "Garry" } });
    });

    await act(async () => {
      fireEvent.change(email, { target: { value: "garry@home.com" } });
    });

    // Check the checkbox.
    receiveNewsletter.click();

    // Verify Name and Email inputs exist and are now populated.
    expect(name).toBeTruthy();
    expect(name.value).toBe("Garry");

    expect(email).toBeTruthy();
    expect(email.value).toBe("garry@home.com");

    // Verify that the checkbox is checked.
    expect(receiveNewsletter).toBeChecked();

    // Verify that the submit button is enabled
    expect(submitBtn).toBeEnabled();
  });
});
