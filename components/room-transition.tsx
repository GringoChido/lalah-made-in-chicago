"use client";

import { useEffect, useRef, type MouseEvent, type ComponentProps } from "react";

type AnchorProps = ComponentProps<"a">;
export function RoomTransitionLink({ direction, children, ...props }: AnchorProps & { direction: "tour" | "room" }) {
  const busy = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeCover = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const reset = () => {
      if (timer.current) clearTimeout(timer.current);
      activeCover.current?.remove();
      activeCover.current = null;
      busy.current = false;
    };
    // A browser Back action can restore the departing document from its cache.
    window.addEventListener("pageshow", reset);
    return () => { reset(); window.removeEventListener("pageshow", reset); };
  }, []);
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !Element.prototype.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (busy.current) { event.preventDefault(); return; }
    event.preventDefault();
    busy.current = true;
    const destination = event.currentTarget.href;
    const box = event.currentTarget.getBoundingClientRect();
    const cover = document.createElement("div");
    activeCover.current = cover;
    cover.className = "speaker-transition-cover";
    cover.setAttribute("aria-hidden", "true");
    cover.style.transformOrigin = `${box.left + box.width / 2}px ${box.top + box.height / 2}px`;
    document.body.appendChild(cover);
    try { sessionStorage.setItem("lalah-transition", direction); } catch { /* Navigation does not depend on storage. */ }
    cover.animate([{ opacity: 0, transform: "scale(.08)" }, { opacity: 1, transform: "scale(1)" }], { duration: 300, easing: "cubic-bezier(.3,.6,.2,1)", fill: "forwards" });
    timer.current = setTimeout(() => { window.location.assign(destination); }, 300);
  };
  return <a {...props} onClick={navigate}>{children}</a>;
}

export function RoomTransitionArrival() {
  useEffect(() => {
    let direction: string | null = null;
    try { direction = sessionStorage.getItem("lalah-transition"); sessionStorage.removeItem("lalah-transition"); } catch { return; }
    if (!direction || !Element.prototype.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cover = document.createElement("div");
    cover.className = "speaker-transition-cover";
    cover.setAttribute("aria-hidden", "true");
    document.body.appendChild(cover);
    const animation = cover.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: "forwards" });
    animation.finished.then(() => cover.remove()).catch(() => cover.remove());
    return () => { animation.cancel(); cover.remove(); };
  }, []);
  return null;
}
