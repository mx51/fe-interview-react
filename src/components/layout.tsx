import { type PropsWithChildren } from "react";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Burger POS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">{children}</div>
    </div>
  );
}
