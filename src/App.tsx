import { useCallback } from "react";
import * as styles from "./App.module.css";
import Layout from "./components/Layout";
import Main from "./components/Main";
import Summary from "./components/Summary";
import ProductCard from "./components/ProductCard";
import ProductGrid from "./components/ProductGrid";
import useRestApi from "./hooks/useRestApi";
import { Product } from "./types";

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

interface AppProps {
  products?: Product[];
}

function App({ products = DUMMY_PRODUCT_LIST }: AppProps) {
  // TODO
  const orderItems = [];

  // TODO
  const orderTotal = 0;

  // Use our custom hook for order submission
  const [submitPaymentState, submitPaymentRequest] = useRestApi(
    "http://localhost:3000/payment",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
    }
  );
  const { isLoading } = submitPaymentState;

  const submitPayment = useCallback(async () => {
    try {
      // Send the payment request
      await submitPaymentRequest({
        body: JSON.stringify(orderItems),
      });

      // TODO Reset the order state

      // In lieu of a nice message, let's use an alert
      window.alert("Payment successful");
    } catch (e) {
      // Oh no!
      window.alert("Something went wrong, your order has not been processed");
    }
  }, [orderItems]);

  return (
    <div className={styles.App}>
      <Layout>
        <Main>
          <ProductGrid>
            {products.map((product: Product) => (
              <ProductCard
                {...product}
                key={product.id}
                onClick={() => {
                  // TODO - add to order
                }}
              />
            ))}
          </ProductGrid>
        </Main>
        <Summary
          total={orderTotal}
          onSubmitPayment={submitPayment}
          isLoading={isLoading}
        >
          {/* TODO - show summary */}
        </Summary>
      </Layout>
    </div>
  );
}

export default App;
