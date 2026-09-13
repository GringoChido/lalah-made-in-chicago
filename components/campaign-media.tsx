"use client";

import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { campaign } from "@/lib/campaign";

export function AlbumFilmButton({ className = "story-button", label = "Behind the album" }: { className?: string; label?: string }) {
  const film = campaign.albumFilm;
  if (!film) return null;
  return <Dialog><DialogTrigger className={className}>{label}<Play size={16} aria-hidden="true" /></DialogTrigger>
    <DialogContent className="campaign-dialog"><DialogTitle>{film.title}</DialogTitle><DialogDescription>Lalah Hathaway on Made In Chicago.</DialogDescription>
      <video controls playsInline preload="metadata" poster={film.poster} aria-label={film.title}><source src={film.src} />{film.captions && <track default kind="captions" src={film.captions} srcLang="en" label="English" />}</video>
    </DialogContent>
  </Dialog>;
}

export function ChicagoMemory({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const recording = campaign.chicagoMemory;
  if (!recording) return null;
  return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger className="memory-trigger" aria-label="Hear Lalah's Chicago memory">{children}</DialogTrigger>
    <DialogContent className="campaign-dialog"><DialogTitle>{recording.title}</DialogTitle><DialogDescription>A Chicago memory, in Lalah’s own voice.</DialogDescription>
      <audio controls preload="none" src={recording.src}>Your browser does not support audio playback.</audio><p className="memory-transcript">{recording.transcript}</p>
    </DialogContent>
  </Dialog>;
}

export function PlaylistCollection() {
  if (!campaign.playlists.length) return null;
  return <section className="playlist-collection" aria-label="Playlists selected by Lalah"><h2>Selected by Lalah</h2><div className="playlist-grid">
    {campaign.playlists.map(playlist => <a key={playlist.url} className="playlist-sleeve" href={playlist.url} target="_blank" rel="noopener noreferrer"><span className="playlist-record" aria-hidden="true" /><h3>{playlist.title}</h3><p>{playlist.description}</p><span className="text-link">Open in Spotify<ArrowUpRight size={17} aria-hidden="true" /></span></a>)}
  </div></section>;
}
