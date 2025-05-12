import { cleanup, render, screen, waitFor } from "@/utils/test-utils";
import App from "./app";
import { it, expect, beforeAll, afterEach, afterAll, vi } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import userEvent from "@testing-library/user-event";
const products = [
  {
    id: 0,
    name: "Special Burger",
    price: 1500, // $15.00
  },
];

const paymentEndpointMock = vi.fn();

export const restHandlers = [
  http.get("http://localhost:3000/api/products", () => {
    return HttpResponse.json(products);
  }),
  http.post("http://localhost:3000/api/payment", async ({ request }) => {
    const body = await request.json();
    paymentEndpointMock(body);
    return HttpResponse.json({});
  }),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => {
  cleanup();
  server.resetHandlers();
  paymentEndpointMock.mockClear();
});

it("Renders correctly, displays list of products", async () => {
  render(<App />);
  expect(screen.getByText("Products")).toBeVisible();

  // Wait for the products to load
  await waitFor(() => {
    expect(screen.getByText("Special Burger")).toBeVisible();
  });
});

it("Adds a product and shows correct total", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Special Burger")).toBeVisible();
  });

  await userEvent.click(
    screen.getByRole("button", { name: "Add Special Burger to order" })
  );

  // TODO: Check the total
});

it("Adds a product twice and shows correct total", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Special Burger")).toBeVisible();
  });

  await userEvent.click(
    screen.getByRole("button", { name: "Add Special Burger to order" })
  );
  await userEvent.click(
    screen.getByRole("button", { name: "Add Special Burger to order" })
  );

  // TODO: Check the total
});

it("Adds a product and submits correct data to API", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText("Special Burger")).toBeVisible();
  });

  await userEvent.click(
    screen.getByRole("button", { name: "Add Special Burger to order" })
  );

  // TODO: Implement application logic to submit the payment

  expect(paymentEndpointMock).toHaveBeenCalledWith(
    expect.objectContaining({
      product: expect.objectContaining(products[0]),
      quantity: 1,
    })
  );
});
