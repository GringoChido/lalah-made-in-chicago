"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Play, Plus, Pause, MoveUpRight } from "lucide-react";
import { SiteMenu } from "@/components/site-menu";
import { AlbumButton } from "@/components/album-experience";
import { destinations } from "@/lib/destinations";
import { release } from "@/lib/release";

// Reveal original photo pixels above the title. Both photo layers share exact
// coordinates, preserving identity and avoiding doubled silhouette edges.
const portraitMask = "M668 270 Q661 264 671 247 L683 229 Q706 221 737 229 L750 232 Q769 230 780 248 L785 282 L775 307 Q777 326 772 346 L783 357 L790 408 L793 451 L803 491 L817 548 L831 567 Q838 574 832 587 L822 604 L809 607 L797 596 L790 583 L781 570 L774 570 L763 604 L754 647 L740 693 L721 729 L711 764 L703 797 L692 829 L680 848 L670 869 L669 888 Q653 904 632 890 L625 893 Q603 913 591 891 L584 865 L578 849 L587 829 L593 800 L598 765 L600 729 L599 702 L596 673 L599 640 L606 596 L615 537 L613 505 L609 489 L600 482 L593 466 L582 445 Q568 423 578 407 L594 391 L613 379 L636 365 L641 343 L642 316 L655 292 Z";

export function LandingScene() {
  const [showLinks, setShowLinks] = useState(false);
  const [paused, setPaused] = useState(false);
  const [returnVisit, setReturnVisit] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    try { setReturnVisit(sessionStorage.getItem("lalah-room-visited") === "true"); sessionStorage.setItem("lalah-room-visited", "true"); } catch { /* Entrance is optional. */ }
  }, []);
  useEffect(() => {
    const node = root.current;
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!node) return;
    let frame = 0;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    const animate = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;
      node.style.setProperty("--scene-x", `${currentX.toFixed(2)}px`);
      node.style.setProperty("--scene-y", `${currentY.toFixed(2)}px`);
      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) frame = requestAnimationFrame(animate);
      else frame = 0;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(animate); };
    const move = (event: PointerEvent) => {
      if (paused || !query.matches || event.pointerType === "touch") return;
      const box = node.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * 10;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * 6;
      queue();
    };
    const leave = () => { targetX = 0; targetY = 0; queue(); };
    const preference = () => { targetX = 0; targetY = 0; currentX = 0; currentY = 0; cancelAnimationFrame(frame); frame = 0; node.style.setProperty("--scene-x", "0px"); node.style.setProperty("--scene-y", "0px"); };
    preference();
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    query.addEventListener("change", preference);
    return () => { cancelAnimationFrame(frame); node.removeEventListener("pointermove", move); node.removeEventListener("pointerleave", leave); query.removeEventListener("change", preference); };
  }, [paused]);

  return <main ref={root} className={`landing album-landing${showLinks ? " show-links" : ""}${paused ? " motion-paused" : ""}${returnVisit ? " return-visit" : ""}`}>
    <a className="skip-link" href="#room-links">Skip to room links</a>
    <div className="room" role="group" aria-label="Interactive record room">
      <img className="room-image" src="/images/landing.webp" width="2400" height="1600" alt="Lalah Hathaway standing among records in a listening room." fetchPriority="high" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-title">
        <p className="eyebrow">The new album</p>
        <h1><span className="title-made">MADE IN</span><span className="title-chicago">CHICAGO</span></h1>
        <p className="hero-intro">{release.intro}</p>
        <div className="hero-actions"><AlbumButton className="cream-button light-sweep"><Play size={16} fill="currentColor" aria-hidden="true" />Listen<ArrowUpRight size={17} aria-hidden="true" /></AlbumButton><AlbumButton className="story-button" view="story">Behind the album<Plus size={17} aria-hidden="true" /></AlbumButton></div>
      </div>
      <svg className="portrait-layer" viewBox="0 0 1500 1000" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="portrait-original-mask"><path d={portraitMask} /></clipPath></defs><image href="/images/landing.webp" width="1500" height="1000" clipPath="url(#portrait-original-mask)" /></svg>
      <svg className="neon-layer" viewBox="0 0 1500 1000" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="neon-original-mask"><path d={destinations.find(d => d.id === "videos")!.path} /></clipPath></defs><image href="/images/landing.webp" width="1500" height="1000" clipPath="url(#neon-original-mask)" /></svg>
      <nav id="room-links" aria-label="Explore the room" tabIndex={-1}>
        {destinations.map(item => {
          const style = { left: `${item.x / 15}%`, top: `${item.y / 10}%`, width: `${item.w / 15}%`, height: `${item.h / 10}%` } as CSSProperties;
          const content = <>
          <svg className="object-glow" viewBox={`${item.x} ${item.y} ${item.w} ${item.h}`} aria-hidden="true" preserveAspectRatio="none"><defs><clipPath id={`clip-${item.id}`}><path d={item.path} /></clipPath></defs><path className="glow-outline" d={item.path} /><image className="glow-image" href="/images/landing.webp" x="0" y="0" width="1500" height="1000" clipPath={`url(#clip-${item.id})`} /></svg>
          <span className="object-label">{item.id === "music" ? "Listen to Made In Chicago" : item.label}<MoveUpRight size={12} aria-hidden="true" /></span>
          </>;
          return item.id === "music"
            ? <AlbumButton key={item.id} className="room-link room-link-music" style={style} label="Listen to Made In Chicago, the records">{content}</AlbumButton>
            : <a key={item.id} href={`/${item.id}`} className={`room-link room-link-${item.id}`} aria-label={`${item.label}, ${item.object}`} style={style}>{content}</a>;
        })}
      </nav>
    </div>
    <header className="landing-header"><a className="home-identity" href="/" aria-label="Lalah Hathaway home">Lalah Hathaway</a><SiteMenu /></header>
    <div className="mobile-release" aria-hidden="true"><p className="eyebrow">The new album</p><div className="mobile-album-title">MADE IN<br />CHICAGO</div><p>{release.intro}</p></div>
    <div className="record-feature"><span className="record-kicker">On the record</span><AlbumButton className="record-sleeve" label="Open Made In Chicago listening panel"><img src={release.artwork} alt="Made In Chicago album cover" width="300" height="300" /><span className="sleeve-play"><Play size={23} fill="currentColor" aria-hidden="true" /></span></AlbumButton><AlbumButton className="record-caption">Made In Chicago<ArrowUpRight size={16} aria-hidden="true" /></AlbumButton><span className="record-subtitle">The new album from Lalah Hathaway</span></div>
    <div className="mobile-album-actions"><AlbumButton className="cream-button light-sweep"><Play size={16} fill="currentColor" aria-hidden="true" />Listen</AlbumButton><AlbumButton className="story-button" view="story">The story<Plus size={16} aria-hidden="true" /></AlbumButton></div>
    <footer className="landing-footer"><p className="desktop-instruction">Explore the room.</p><p className="touch-instruction">Tap a glowing object.</p><div className="room-controls"><button type="button" className="motion-button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume room motion" : "Pause room motion"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}</button><button type="button" className="show-links-button" aria-pressed={showLinks} onClick={() => setShowLinks(value => !value)}>{showLinks ? "Hide labels" : "Explore links"}<Plus size={15} aria-hidden="true" /></button></div></footer>
  </main>;
}
