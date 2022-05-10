import React from "react";
import type { WithChildren } from "types";
import style from "./SectionHeader.module.css";

export default function SectionHeader({ children }: WithChildren) {
  return <div className={style.SectionHeader}>{children}</div>;
}
