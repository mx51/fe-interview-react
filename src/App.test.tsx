import { screen } from "@testing-library/dom";
import { expect, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import fetchMock from "fetch-mock-jest";
import { act } from "react-dom/test-utils";
import { render } from "./utils/testUtils";
import App from "./App";

const products = [
  {
    id: 0,
    name: "Special Burger",
    price: 1500, // $15.00
  },
];

it("Renders without crashing", async () => {
  render(<App />);
  expect(await screen.findByText("Products")).toBeInTheDocument();
});

it("Renders the list of products correctly", async () => {
  render(<App products={products} />);

  expect(
    await screen.getByRole("button", { name: "Special Burger" })
  ).toBeInTheDocument();
});

it("Adds a product and shows correct total", async () => {
  render(<App products={products} />);

  userEvent.click(await screen.getByRole("button", { name: "Special Burger" }));

  expect(await screen.getByTestId("order-total").textContent).toBe("$15.00");
});

it("Adds a product twice and shows correct total", async () => {
  render(<App products={products} />);

  userEvent.click(await screen.getByRole("button", { name: "Special Burger" }));
  userEvent.click(await screen.getByRole("button", { name: "Special Burger" }));

  expect(await screen.getByTestId("order-total").textContent).toBe("$30.00");
});

it("Adds a product and submits correct data to API", async () => {
  render(<App products={products} />);

  userEvent.click(await screen.getByRole("button", { name: "Special Burger" }));

  fetchMock.mock("http://localhost:3000/payment", 200);

  await act(async () => {
    userEvent.click(await screen.getByRole("button", { name: "Pay" }));
  });

  const calls = fetchMock.mock.calls.find(
    ([url]) => url === "http://localhost:3000/payment"
  );

  const call = calls.slice(-1).pop();

  expect(JSON.parse(call.body)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        product: expect.objectContaining(products[0]),
        quantity: 1,
      }),
    ])
  );
});
