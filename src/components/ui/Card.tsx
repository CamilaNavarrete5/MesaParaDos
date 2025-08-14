import Image from "next/image";
import type { ReactNode, HTMLAttributes } from "react";

type WithClassName = { className?: string };

// Contenedor base
export function CardRoot({ as = "article", className = "", children, ...rest }:{
  as?: "article" | "div" | "section";
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const Comp: any = as;
  return (
    <Comp
      className={[
        "group overflow-hidden rounded-2xl bg-card border border-border shadow-sm",
        "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </Comp>
  );
}

// Imagen principal 16:9

export function CardMedia({
  src,
  alt,
  className = "",
  sizes = "(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw",
  priority = false,
  ...rest
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "relative aspect-[16/9] w-[calc(100%-1rem)] mx-auto mt-3 overflow-hidden rounded-xl",
        className,
      ].join(" ")}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

// Cuerpo con padding
export function CardBody({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLDivElement>) {
  return <div className={["p-4", className].join(" ")} {...rest}>{children}</div>;
}

// Fila horizontal
export function CardRow({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLDivElement>) {
  return <div className={["flex items-center gap-2", className].join(" ")} {...rest}>{children}</div>;
}

// Título y textos (ahora aceptan className)
export function CardTitle({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={["line-clamp-2 text-xl font-bold leading-tight text-brown", className].join(" ")}
      {...rest}
    >
      {children}
    </h3>
  );
}

export function CardText({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLParagraphElement>) {
  return <p className={["text-foreground", className].join(" ")} {...rest}>{children}</p>;
}

export function CardMuted({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLParagraphElement>) {
  return <p className={["text-sm text-muted", className].join(" ")} {...rest}>{children}</p>;
}

// Footer
export function CardFooter({
  children,
  className = "",
  ...rest
}: { children: ReactNode } & WithClassName & HTMLAttributes<HTMLDivElement>) {
  return <div className={["mt-3 mb-3 px-4", className].join(" ")} {...rest}>{children}</div>;
}
