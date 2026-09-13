"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

type Label = { id: string; text: string; x: number; y: number; w: number; h: number; ax: number; ay: number; side: "left" | "right" };
const leftSide = new Set(["socials", "music", "tour", "bio"]);

/** Labels use measured screen coordinates so their leaders follow the photo crop. */
export function RoomLabels({ root, activeId, showAll }: { root: RefObject<HTMLElement | null>; activeId: string | null; showAll: boolean }) {
  const [labels, setLabels] = useState<Label[]>([]);
  useLayoutEffect(() => {
    const scene = root.current;
    if (!scene || (!activeId && !showAll)) { setLabels([]); return; }
    const measure = () => {
      scene.style.setProperty("--scene-x", "0px");
      scene.style.setProperty("--scene-y", "0px");
      const bounds = scene.getBoundingClientRect();
      const header = scene.querySelector(".landing-header")?.getBoundingClientRect();
      const footer = scene.querySelector(".landing-footer")?.getBoundingClientRect();
      const narrow = bounds.width < 700;
      const width = narrow ? Math.min(144, (bounds.width - 52) / 2) : 190;
      const height = 44;
      const minY = (header?.bottom ?? bounds.top + 60) - bounds.top + 12;
      const maxY = Math.max(minY, (footer?.top ?? bounds.bottom - 65) - bounds.top - height - 8);
      const found: Label[] = [];
      scene.querySelectorAll<HTMLElement>("[data-room-object]").forEach(node => {
        const id = node.dataset.roomObject!;
        if (!showAll && activeId !== id) return;
        const box = node.getBoundingClientRect();
        const ax = box.left + box.width / 2 - bounds.left;
        const ay = box.top + box.height / 2 - bounds.top;
        // Cropped-out objects remain available through the text menu.
        if (ax < 0 || ax > bounds.width || ay < 0 || ay > bounds.height) return;
        const side = leftSide.has(id) ? "left" : "right";
        const preferredX = side === "left" ? ax - width - 36 : ax + 36;
        const x = showAll && narrow ? (side === "left" ? 12 : bounds.width - width - 12) : Math.min(bounds.width - width - 12, Math.max(12, preferredX));
        found.push({ id, text: node.dataset.roomLabel ?? id, x, y: Math.min(maxY, Math.max(minY, ay - height / 2)), w: width, h: height, ax, ay, side });
      });
      // Resolve each label column, then pull an overflowing column back up.
      for (const side of ["left", "right"]) {
        const column = found.filter(label => label.side === side).sort((a, b) => a.y - b.y);
        const availableStep = column.length > 1 ? (maxY - minY) / (column.length - 1) : height + 10;
        if (availableStep < height + 10) {
          column.forEach((label, i) => { label.y = minY + i * availableStep; label.h = Math.max(24, Math.min(height, availableStep - 4)); });
          continue;
        }
        for (let i = 1; i < column.length; i++) column[i].y = Math.max(column[i].y, column[i - 1].y + height + 10);
        for (let i = column.length - 1; i >= 0; i--) column[i].y = Math.min(column[i].y, i === column.length - 1 ? maxY : column[i + 1].y - height - 10);
      }
      setLabels(found);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(scene);
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, [activeId, showAll, root]);
  if (!labels.length) return null;
  return <div className="room-label-overlay" aria-hidden="true">
    <svg className="room-label-leaders" width="100%" height="100%">
      <defs><marker id="room-leader-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.5" /></marker></defs>
      {labels.map(label => <path key={label.id} d={`M${label.side === "left" ? label.x + label.w : label.x} ${label.y + label.h / 2} L${label.ax} ${label.ay}`} markerEnd="url(#room-leader-arrow)" />)}
    </svg>
    {labels.map(label => <span key={label.id} className="room-object-caption" style={{ left: label.x, top: label.y, width: label.w, minHeight: label.h }}>{label.text}</span>)}
  </div>;
}
