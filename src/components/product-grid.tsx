import { type PropsWithChildren } from "react";

export function ProductGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
