import type { WithChildren } from "../../types";
import SectionHeader from "../SectionHeader";
import formatPrice from "../../utils/formatPrice";
import style from "./Summary.module.css";
import Button from "../Button";

export type SummaryProps = WithChildren<{
  total: number;
  onSubmitPayment: () => void;
  isLoading?: boolean;
}>;

export default function Summary({
  children,
  total,
  onSubmitPayment,
  isLoading,
}: SummaryProps) {
  return (
    <div className={style.Summary}>
      <SectionHeader>Order</SectionHeader>
      <div className={style.SummaryContent}>{children}</div>
      <div className={style.SummaryFooter}>
        <div className={style.SummaryTotal}>
          <span>Total</span>
          <span data-testid="order-total">${formatPrice(total)}</span>
        </div>
        <div className={style.SummaryPay}>
          <Button
            colorScheme="green"
            className={style.SummaryPayButton}
            isDisabled={!total}
            onClick={onSubmitPayment}
            isLoading={isLoading}
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
}
