import React, { MouseEvent, useEffect, useState } from "react";
import style from "./ProductCard.module.css";

export type ProductCardProps = {
  name: string;
  price: number;
  onClick?: (e: MouseEvent) => void;
};

export default function ProductCard({
  name,
  // Decided not to show price
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  price,
  onClick,
}: ProductCardProps) {
  // When the component mounts, let's grab a random image
  const [imageURL, setImageURL] = useState<string>("");
  useEffect(() => {
    fetchImageURL();
  }, []);

  async function fetchImageURL() {
    try {
      const resp = await fetch(
        "https://foodish-api.herokuapp.com/api/images/burger"
      ).then((r) => r.json());
      setImageURL(resp.image ?? "");
    } catch (e) {
      // Fail silently.
      // If you were really doing this, you'd probably
      // have a placeholder in immediately, which gets replace
      // above (or not in the case of an error)
    }
  }

  function handleClick(e: MouseEvent) {
    // Check to see if onclick was passed and is a
    // function
    if (typeof onClick === "function") {
      onClick.call(null, e);
    }
  }

  return (
    <div className={style.ProductCard}>
      <div className={style.ImageWrapper}>
        <img src={imageURL} className={style.Image} alt={`${name}`} />
      </div>
      <div className={style.CardDetail}>
        <button type="button" className={style.CardTitle} onClick={handleClick}>
          {name}
        </button>
      </div>
    </div>
  );
}
