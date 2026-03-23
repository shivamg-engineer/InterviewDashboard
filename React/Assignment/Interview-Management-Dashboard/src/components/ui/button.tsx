import * as React from "react";

import {
  buttonVariants,
  normalizeButtonSize,
  normalizeButtonVariant,
  type ButtonSize,
  type ButtonVariant,
} from "./button-variants";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const safeVariant: ButtonVariant = normalizeButtonVariant(variant);
    const safeSize: ButtonSize = normalizeButtonSize(size);
    return (
      <button
        className={buttonVariants({ variant: safeVariant, size: safeSize, className })}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
