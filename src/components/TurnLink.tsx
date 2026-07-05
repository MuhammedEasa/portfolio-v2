"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTurn } from "@/components/PageTurn";

/** Internal link that navigates via the page turn; native for modified clicks. */
export default function TurnLink({
  href,
  onClick,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const { turn } = usePageTurn();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    turn(typeof href === "string" ? href : (href.pathname ?? "/"));
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
