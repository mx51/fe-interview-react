import { Card, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

import formatPrice from "@/utils/format-price";

export function Summary({ total }: { total: number }) {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardHeader className="gap-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Current Order</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // TODO - clear order
              }}
            >
              Clear
            </Button>
          </div>
        </CardHeader>

        <Separator />

        <ScrollArea>{/* TODO - items */}</ScrollArea>
        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between px-4 py-2">
            <span>Subtotal</span>
            {/* TODO - subtotal */}
            <span>$...</span>
          </div>
          <div className="flex justify-between px-4 py-2">
            <span>GST (10%)</span>
            {/* TODO - GST */}
            <span>$...</span>
          </div>
        </div>
        <Separator />
        <div className="flex justify-between px-4 py-2 font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            /* TODO - disabled if no items or isLoading*/
          >
            Pay ${formatPrice(total)}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
