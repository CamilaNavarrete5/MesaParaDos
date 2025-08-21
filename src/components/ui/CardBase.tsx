
import type { ReactNode } from "react";
import { CardRoot, CardBody, CardFooter } from "./Card";

interface CardBaseProps {
  header?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

/**
 * Card con altura fija y footer pegado abajo.
 * Ajustr h-[420px] para el alto.
 */
export function CardBase({ header, content, footer, className }: CardBaseProps) {
  return (
    <CardRoot
      as="article"
      className={`flex flex-col h-[420px] ${className ?? ""}`} // <- alto fijo + columna
    >
      {header}
      {content && <CardBody>{content}</CardBody>}
      {footer && <CardFooter className="mt-auto">{footer}</CardFooter>} 
    </CardRoot>
  );
}
