import React, { useEffect, useState } from "react";
import type { Product } from "@/types";
import { Card, CardFooter } from "./ui/card";
import formatPrice from "@/utils/format-price";

function PlaceholderImage() {
  return (
    <div className="aspect-square relative">
      <div className="absolute inset-0 bg-gray-200 animate-pulse" />
    </div>
  );
}

export function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  // When the component mounts, let's grab a random image
  const [imageURL, setImageURL] = useState<string>("");
  useEffect(() => {
    fetchImageURL();
  }, []);

  async function fetchImageURL() {
    try {
      const resp = await fetch(
        "https://foodish-api.com/api/images/burger"
      ).then((r) => r.json());

      setImageURL(resp.image ?? "");
    } catch {
      // Fail silently.
      // If you were really doing this, you'd probably
      // have a placeholder in immediately, which gets replaced
      // above (or not in the case of an error)
    }
  }

  return (
    <Card
      key={product.id}
      className="overflow-hidden hover:shadow-md transition-shadow p-0"
    >
      <button
        onClick={onClick}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label={`Add ${product.name} to order`}
      >
        <div className="aspect-square relative">
          {imageURL ? (
            <img
              src={imageURL}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlaceholderImage />
          )}
        </div>
        <CardFooter className="flex justify-between p-3">
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              ${formatPrice(product.price)}
            </p>
          </div>
        </CardFooter>
      </button>
    </Card>
  );
}
