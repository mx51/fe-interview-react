import React from "react";
import type { WithChildren } from "types";
import style from "./ProductGrid.module.css";

export type ProductGridProps = WithChildren;

export default function ProductGrid({ children }: ProductGridProps) {
  return <div className={style.ProductGrid}>{children}</div>;
}
