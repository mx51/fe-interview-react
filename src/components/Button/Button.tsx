import React, { forwardRef, LegacyRef, RefObject } from "react";
import { CgSpinner } from "react-icons/cg";
import classnames from "classnames";
import type { WithChildren, WithRestProps } from "../../types";
import style from "./Button.module.css";

export type ButtonProps = WithRestProps<
  WithChildren<{
    isLoading?: boolean;
    isDisabled?: boolean;
    type?: "button" | "reset" | "submit";
    leftIcon?: React.ReactElement;
    as?: string | React.ElementType;
    colorScheme?: string;
    className?: string;
  }>
>;

const Button = forwardRef<RefObject<HTMLButtonElement>, ButtonProps>(
  (props, ref) => {
    const {
      isLoading,
      isDisabled,
      children,
      type = "button",
      leftIcon,
      as: asTag,
      colorScheme,
      className,
      ...rest
    } = props;

    const Tag = asTag ?? "button";

    return (
      <Tag
        disabled={isDisabled || isLoading}
        ref={ref as LegacyRef<HTMLButtonElement>}
        type={type}
        data-loading={!!isLoading}
        className={classnames(
          "Button",
          style.Button,
          colorScheme &&
            typeof style[`Button-colorScheme--${colorScheme}`] !== "undefined"
            ? style[`Button-colorScheme--${colorScheme}`]
            : null,
          className
        )}
        {...rest}
      >
        {leftIcon && !isLoading && (
          <ButtonIconWrapper>{leftIcon}</ButtonIconWrapper>
        )}
        {isLoading ? <span style={{ opacity: 0 }}>{children}</span> : children}
        {isLoading && <ButtonLoadingSpinner />}
      </Tag>
    );
  }
);
export default Button;

export type ButtonIconWrapperProps = WithRestProps<WithChildren>;

export function ButtonIconWrapper({
  children,
  ...props
}: ButtonIconWrapperProps) {
  return (
    <span className={style.ButtonIconWrapper} {...props}>
      {children}
    </span>
  );
}

export function ButtonLoadingSpinner() {
  return (
    <span className={style.ButtonLoadingSpinner}>
      <CgSpinner />
    </span>
  );
}
