import React from "react";
import type { WithChildren } from "types";
import style from "./Layout.module.css";

export type LayoutProps = WithChildren;

export default function Layout({ children }: LayoutProps) {
  return <div className={style.Layout}>{children}</div>;
}
