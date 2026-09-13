"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { release } from "@/lib/release";
import { PlaylistCollection } from "@/components/campaign-media";

type AlbumView = "listen" | "story";
const AlbumContext = createContext<(view?: AlbumView, origin?: HTMLElement) => void>(() => {});
export const useAlbum = () => useContext(AlbumContext);

export function AlbumExperience({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<AlbumView>("listen");
  const [playing, setPlaying] = useState(false);
  const origin = useRef<HTMLElement | null>(null);
  const artwork = useRef<HTMLImageElement | null>(null);
  const flightCleanup = useRef<(() => void) | null>(null);
  const closing = useRef(false);
  const flySleeve = useCallback((node: HTMLImageElement, reverse = false, finish?: () => void) => {
    flightCleanup.current?.();
    const source = origin.current;
    if (!source?.isConnected || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !node.animate) { finish?.(); return; }
    const from = source.getBoundingClientRect();
    const to = node.getBoundingClientRect();
    if (!to.width || !to.height || !from.width) { finish?.(); return; }
    const clone = node.cloneNode() as HTMLImageElement;
    clone.className = "album-sleeve-flight";
    clone.alt = "";
    clone.setAttribute("aria-hidden", "true");
    Object.assign(clone.style, { width: `${to.width}px`, height: `${to.height}px`, visibility: "visible" });
    document.body.appendChild(clone);
    node.style.visibility = "hidden";
    const scale = Math.min(from.width / to.width, from.height / to.height, 1);
    const start = { transform: `translate(${from.left + (from.width - to.width * scale) / 2}px, ${from.top + (from.height - to.height * scale) / 2}px) scale(${scale}) rotate(-5deg)`, opacity: .35 };
    const end = { transform: `translate(${to.left}px, ${to.top}px) scale(1) rotate(0deg)`, opacity: 1 };
    const animation = clone.animate(reverse ? [end, start] : [start, end], { duration: reverse ? 260 : 420, easing: "cubic-bezier(.2,.7,.2,1)", fill: "forwards" });
    const cleanup = () => { node.style.visibility = ""; clone.remove(); };
    flightCleanup.current = () => { animation.cancel(); cleanup(); };
    animation.finished.then(() => { cleanup(); flightCleanup.current = null; finish?.(); }).catch(cleanup);
  }, []);
  const mountArtwork = useCallback((node: HTMLImageElement | null) => {
    artwork.current = node;
    if (node) requestAnimationFrame(() => { if (node.isConnected) flySleeve(node); });
  }, [flySleeve]);
  useEffect(() => () => flightCleanup.current?.(), []);
  const openAlbum = (next: AlbumView = "listen", source?: HTMLElement) => { if (closing.current) return; origin.current = source ?? null; setView(next); setOpen(true); };
  const changeOpen = (next: boolean) => {
    if (next) { setOpen(true); return; }
    if (closing.current) return;
    closing.current = true;
    setPlaying(false);
    const finish = () => { setOpen(false); closing.current = false; };
    if (artwork.current) flySleeve(artwork.current, true, finish); else finish();
  };
  return <AlbumContext.Provider value={openAlbum}>
    {children}
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className="album-dialog" showCloseButton={false} onCloseAutoFocus={event => {
        // Programmatic openers are outside DialogTrigger. Restore the active opener.
        const opener = document.querySelector<HTMLElement>("[data-album-opener='active']");
        if (opener) { event.preventDefault(); opener.focus(); opener.removeAttribute("data-album-opener"); }
      }}>
        <DialogClose className="album-close" aria-label="Close album panel"><X size={22} aria-hidden="true" /></DialogClose>
        <div className="album-dialog-art"><img ref={mountArtwork} src={release.artwork} alt="Made In Chicago album cover" width="900" height="900" /><span>Lalah Hathaway / The new album</span></div>
        <div className="album-dialog-body">
          <p className="eyebrow">Lalah Hathaway</p>
          <DialogTitle className="album-dialog-title">Made In<br />Chicago</DialogTitle>
          <DialogDescription className="album-dialog-description">The new album. The city behind the music.</DialogDescription>
          <Tabs value={view} onValueChange={value => setView(value as AlbumView)} className="album-tabs">
            <TabsList className="album-tab-list"><TabsTrigger value="listen">Listen</TabsTrigger><TabsTrigger value="story">The story</TabsTrigger></TabsList>
            <TabsContent value="listen" className="album-tab-content">
              <p>Hear “{release.singleTitle},” the new single from Made In Chicago.</p>
              <a className="cream-button light-sweep" href={release.singleUrl} target="_blank" rel="noopener noreferrer"><Play size={16} fill="currentColor" aria-hidden="true" />Listen to the single<ArrowUpRight size={17} aria-hidden="true" /></a>
              <a className="text-link album-presave" href={release.albumUrl} target="_blank" rel="noopener noreferrer">{release.action}<ArrowUpRight size={17} aria-hidden="true" /></a>
              <button className="album-video-trigger" type="button" onClick={() => setPlaying(value => !value)} aria-expanded={playing}><Play size={17} aria-hidden="true" />{playing ? "Close video" : "Watch “47th Street” feat. J. Ivy"}</button>
              {playing && <div className="album-video"><iframe src="https://www.youtube-nocookie.com/embed/1st8sAyYuCc?autoplay=1" title="Lalah Hathaway, 47th Street featuring J. Ivy, official lyric video" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>}
            </TabsContent>
            <TabsContent value="story" className="album-tab-content"><p className="album-story">{release.story}</p><a className="text-link" href={release.storyUrl} target="_blank" rel="noopener noreferrer">Album release notes<ArrowUpRight size={16} aria-hidden="true" /></a></TabsContent>
          </Tabs>
          <PlaylistCollection />
          <a href="/music" className="album-catalog-link">Explore the full discography<ArrowUpRight size={15} aria-hidden="true" /></a>
        </div>
      </DialogContent>
    </Dialog>
  </AlbumContext.Provider>;
}

export function AlbumButton({ children, className = "", view = "listen", label, style, objectId, objectLabel }: { children: ReactNode; className?: string; view?: AlbumView; label?: string; style?: CSSProperties; objectId?: string; objectLabel?: string }) {
  const open = useAlbum();
  return <button type="button" className={className} style={style} aria-label={label} data-room-object={objectId} data-room-label={objectLabel} aria-haspopup="dialog" onClick={event => {
    document.querySelector("[data-album-opener='active']")?.removeAttribute("data-album-opener");
    event.currentTarget.setAttribute("data-album-opener", "active");
    open(view, event.currentTarget);
  }}>{children}</button>;
}
