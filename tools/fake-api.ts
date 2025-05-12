import { type Product } from "../src/types";
import express from "express";
import type { Plugin } from "vite";

// A list of dummy products
// The prices are stored as 100 * the actual price. This is
// To avoid js float handling issues if there are
// non integer prices
const DUMMY_PRODUCT_LIST: Product[] = [
  {
    id: 0,
    name: "Special Burger",
    price: 1500, // $15.00
  },
  { id: 1, name: "Classic Burger", price: 1400 }, // $14.00
  { id: 2, name: "Spicy Burger", price: 1600 },
  { id: 3, name: "Korean Pork Burger", price: 1600 },
];

const app = express();

app.get("/api/products", (_, res) => {
  res.json(DUMMY_PRODUCT_LIST);
});

export function fakeApiPlugin(): Plugin {
  const proxy = {
    "/api": {},
  };
  return {
    name: "fake-api",
    configureServer(server) {
      server.middlewares.use(app);
    },
    config() {
      return {
        server: { proxy },
        preview: { proxy },
      };
    },
  };
}
