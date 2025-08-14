// src/components/ui/CardBase.tsx
import type { ReactNode } from "react";
import {
  CardRoot,
  CardBody,
  CardFooter,
} from "./Card";

interface CardBaseProps {
  header?: ReactNode;   // contenido libre para el header (ej: imagen)
  content?: ReactNode;  // contenido principal
  footer?: ReactNode;   // CTA / meta
  className?: string;
}

/**
 * CardBase usa TUS primitivas (CardRoot/CardBody/CardFooter).
 * Si en algún caso querés un "header visual", pasalo en `header`
 * y adentro poné una imagen o lo que quieras.
 */
export function CardBase({ header, content, footer, className }: CardBaseProps) {
  return (
    <CardRoot as="article" className={className}>
      {header}
      {content && <CardBody>{content}</CardBody>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardRoot>
  );
}
