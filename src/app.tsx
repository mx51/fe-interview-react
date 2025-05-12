import { type Product } from "./types";
import { Layout } from "./components/layout";
import { Main } from "./components/main";
import { ProductGrid } from "./components/product-grid";
import { ProductCard } from "./components/product-card";
import { Summary } from "./components/summary";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  // TODO implement application logic to track order state

  // TODO
  const orderTotal = 0;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("/api/products").then((res) => res.json()),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const submitPayment = () => {
    // TODO: Implement application logic to submit the payment
  };

  return (
    <Layout>
      <Main>
        <ProductGrid>
          {isLoading && (
            <>
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-64 w-full" />
            </>
          )}

          {!isLoading &&
            products?.map((product: Product) => (
              <ProductCard
                product={product}
                key={product.id}
                onClick={() => {
                  // TODO - add to order
                }}
              />
            ))}
        </ProductGrid>
      </Main>
      <Summary total={orderTotal}>{/* TODO - show summary */}</Summary>
    </Layout>
  );
}

export default App;
