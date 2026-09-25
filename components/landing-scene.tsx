"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowUpRight, Play, Plus, Pause } from "lucide-react";
import { SiteMenu } from "@/components/site-menu";
import { AlbumButton } from "@/components/album-experience";
import { destinations } from "@/lib/destinations";
import { release } from "@/lib/release";
import { RoomLabels } from "@/components/room-labels";
import { AlbumFilmButton, ChicagoMemory } from "@/components/campaign-media";
import { RoomTransitionLink } from "@/components/room-transition";
import { SiteCredit } from "@/components/site-credit";
import { campaign, memoryObject } from "@/lib/campaign";

// Reveal original photo pixels above the title. Both photo layers share exact
// coordinates, preserving identity and avoiding doubled silhouette edges.
const portraitMask = "M668 270 Q661 264 671 247 L683 229 Q706 221 737 229 L750 232 Q769 230 780 248 L785 282 L775 307 Q777 326 772 346 L783 357 L790 408 L793 451 L803 491 L817 548 L831 567 Q838 574 832 587 L822 604 L809 607 L797 596 L790 583 L781 570 L774 570 L763 604 L754 647 L740 693 L721 729 L711 764 L703 797 L692 829 L680 848 L670 869 L669 888 Q653 904 632 890 L625 893 Q603 913 591 891 L584 865 L578 849 L587 829 L593 800 L598 765 L600 729 L599 702 L596 673 L599 640 L606 596 L615 537 L613 505 L609 489 L600 482 L593 466 L582 445 Q568 423 578 407 L594 391 L613 379 L636 365 L641 343 L642 316 L655 292 Z";

export function LandingScene() {
  const [showLinks, setShowLinks] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeObject, setActiveObject] = useState<string | null>(null);
  const [returnVisit, setReturnVisit] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    try { setReturnVisit(sessionStorage.getItem("lalah-room-visited") === "true"); sessionStorage.setItem("lalah-room-visited", "true"); } catch { /* Entrance is optional. */ }
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px), (hover: none), (pointer: coarse)");
    const resetMobileNavigation = () => {
      if (query.matches) { setShowLinks(false); setActiveObject(null); }
    };
    resetMobileNavigation();
    query.addEventListener("change", resetMobileNavigation);
    return () => query.removeEventListener("change", resetMobileNavigation);
  }, []);
  useEffect(() => {
    const node = root.current;
    const query = window.matchMedia("(min-width: 761px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
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
      if (paused || showLinks || activeObject || !query.matches || event.pointerType === "touch") return;
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
  }, [paused, showLinks, activeObject]);

  return <main ref={root} className={`landing album-landing${showLinks ? " show-links" : ""}${paused ? " motion-paused" : ""}${returnVisit ? " return-visit" : ""}`}>
    <a className="skip-link" href="#site-navigation">Skip to site menu</a>
    <div className="room" role="group" aria-label="Made in Chicago record room">
      <img className="room-image" src="/images/landing.webp" width="2400" height="1600" alt="Lalah Hathaway standing among records in a listening room." fetchPriority="high" />
      <div className="scene-shade" aria-hidden="true" />
      <div className="scene-title">
        <p className="eyebrow">The new album</p>
        <h1><span className="title-made">Made In</span><span className="title-chicago">Chicago</span></h1>
        <p className="hero-intro">{release.intro}</p>
        <div className="hero-actions"><AlbumButton className="cream-button light-sweep"><Play size={16} fill="currentColor" aria-hidden="true" />Listen<ArrowUpRight size={17} aria-hidden="true" /></AlbumButton><AlbumFilmButton /></div>
      </div>
      <svg className="portrait-layer" viewBox="0 0 1500 1000" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="portrait-original-mask"><path d={portraitMask} /></clipPath></defs><image href="/images/landing.webp" width="1500" height="1000" clipPath="url(#portrait-original-mask)" /></svg>
      <svg className="neon-layer" viewBox="0 0 1500 1000" preserveAspectRatio="none" aria-hidden="true"><defs><clipPath id="neon-original-mask"><path d={destinations.find(d => d.id === "videos")!.path} /></clipPath></defs><image href="/images/landing.webp" width="1500" height="1000" clipPath="url(#neon-original-mask)" /></svg>
      <nav id="room-links" aria-label="Explore the room" tabIndex={-1} onPointerOver={event => {
        const target = (event.target as Element).closest<HTMLElement>("[data-room-object]");
        if (event.pointerType !== "touch") setActiveObject(target?.dataset.roomObject ?? null);
      }} onPointerLeave={() => setActiveObject(null)} onFocus={event => setActiveObject(event.target.closest<HTMLElement>("[data-room-object]")?.dataset.roomObject ?? null)} onBlur={() => setActiveObject(null)}>
        {destinations.map(item => {
          const style = { left: `${item.x / 15}%`, top: `${item.y / 10}%`, width: `${item.w / 15}%`, height: `${item.h / 10}%` } as CSSProperties;
          const content = <>
          <svg className="object-halo" viewBox={`${item.x} ${item.y} ${item.w} ${item.h}`} aria-hidden="true" preserveAspectRatio="none"><path d={item.path} /></svg>
          </>;
          return item.id === "tour"
              ? <RoomTransitionLink key={item.id} direction="tour" href="/tour" className="room-link room-link-tour" aria-label="Tour, the speaker" data-room-object={item.id} data-room-label={item.label} style={style}>{content}</RoomTransitionLink>
              : <a key={item.id} href={`/${item.id}`} className={`room-link room-link-${item.id}`} aria-label={`${item.label}, ${item.object}`} data-room-object={item.id} data-room-label={item.label} style={style}>{content}</a>;
        })}
        {campaign.chicagoMemory && <div className="room-link room-link-memory" data-room-object="memory" data-room-label="A Chicago memory" style={{ left: `${memoryObject.x / 15}%`, top: `${memoryObject.y / 10}%`, width: `${memoryObject.w / 15}%`, height: `${memoryObject.h / 10}%` }}><ChicagoMemory><svg className="object-halo" viewBox={`${memoryObject.x} ${memoryObject.y} ${memoryObject.w} ${memoryObject.h}`} aria-hidden="true" preserveAspectRatio="none"><path d={memoryObject.path} /></svg></ChicagoMemory></div>}
      </nav>
    </div>
    <header id="site-navigation" className="landing-header" tabIndex={-1}><a className="home-identity" href="/" aria-label="Lalah Hathaway home">Lalah Hathaway</a><SiteMenu /></header>
    <div className="mobile-release" aria-hidden="true"><p className="eyebrow">The new album</p><div className="mobile-album-title">Made In<br />Chicago</div><p>{release.intro}</p></div>
    <RoomLabels root={root} activeId={activeObject} showAll={showLinks} />
    <div className="mobile-album-actions"><AlbumButton className="cream-button light-sweep"><Play size={16} fill="currentColor" aria-hidden="true" />Listen</AlbumButton><AlbumFilmButton label="Behind the album" /></div>
    <footer className="landing-footer"><div className="landing-footer-text"><p className="desktop-instruction">Explore the room.</p><p className="touch-instruction">Use the menu to explore.</p><SiteCredit /></div><div className="room-controls"><button type="button" className="motion-button" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? "Resume room motion" : "Pause room motion"}>{paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}</button><button type="button" className="show-links-button" aria-pressed={showLinks} onClick={() => setShowLinks(value => !value)}>{showLinks ? "Hide labels" : "Explore links"}<Plus size={15} aria-hidden="true" /></button></div></footer>
  </main>;
}
