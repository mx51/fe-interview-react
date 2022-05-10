import React from "react";
import type { WithChildren } from "types";
import SectionHeader from "../SectionHeader";
import style from "./Main.module.css";

export type MainProps = WithChildren;

export default function Main({ children }: MainProps) {
  return (
    <div className={style.Main}>
      <SectionHeader>Products</SectionHeader>
      <div className={style.MainContent}>{children}</div>
    </div>
  );
}
