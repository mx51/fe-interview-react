import { ReactNode } from "react";

export type WithChildren<T = {}> = T & { children?: ReactNode };

export type WithRestProps<T = {}> = T & { [x: string]: any };

export type Maybe<T> = T | null;

export type Product = {
  id: number;
  name: string;
  price: number;
};