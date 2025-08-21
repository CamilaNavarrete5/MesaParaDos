"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: number;
};

export default function CustomCheckbox({
  size = 16,
  className = "",
  ...rest
}: Props) {
  return (
    <input
      type="checkbox"
      {...rest}
      className={[
        "h-4 w-4 rounded border border-border",
        // color del check
        "accent-[#B5C18E]",
        // foco consistente
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        className,
      ].join(" ")}
      style={{ width: size, height: size }}
    />
  );
}
