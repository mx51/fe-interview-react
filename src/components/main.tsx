import { type PropsWithChildren } from "react";
import { Input } from "./ui/input";

export function Main({ children }: PropsWithChildren) {
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Input
          type="search"
          placeholder="Search products..."
          className="max-w-xs"
        />
      </div>

      {children}
    </div>
  );
}
