import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { WithChildren } from "../types";

// Just in case we need some providers etc later
const Wrapper = ({ children }: WithChildren) => children as ReactElement;

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries" | "wrapper">
) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
