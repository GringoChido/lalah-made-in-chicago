import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm, SignupForm } from "@/components/preview-forms";
import { TourWidget } from "@/components/tour-widget";
import { VideoGrid } from "@/components/video-grid";
import { destinations } from "@/lib/destinations";
import { albums, socials } from "@/lib/media";

type Props = { params: Promise<{ section: string }> };
export function generateStaticParams() {
  return destinations.map(item => ({ section: item.id }));
}
export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const item = destinations.find(destination => destination.id === section);
  return { title: item?.label ?? "Page not found" };
}
export default async function SectionPage({ params }: Props) {
  const { section } = await params;
  const item = destinations.find(destination => destination.id === section);
  if (!item) notFound();
  const variant = section === "bio" || section === "tour" ? section : "brown";
  return <PageShell title={item.label} number={item.number} variant={variant}>
    {section === "contact" && <ContactForm />}
    {section === "socials" && <div className="socials-layout">
      <nav className="social-links" aria-label="Lalah's social profiles">{socials.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer"><span>{social.name}</span><ArrowUpRight size={24} aria-hidden="true" /></a>)}</nav>
      <SignupForm />
    </div>}
    {section === "bio" && <div className="bio-copy"><h2>Lalah Hathaway</h2><p>Biography coming soon.</p></div>}
    {section === "music" && <>
      <nav className="platform-links" aria-label="Music platforms"><a className="text-link" href="https://open.spotify.com/artist/0uNEy4544VZq2KOl7BsLuo" target="_blank" rel="noopener noreferrer">Spotify <ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href="https://music.apple.com/us/artist/lalah-hathaway/3895759" target="_blank" rel="noopener noreferrer">Apple Music <ArrowUpRight size={16} aria-hidden="true" /></a></nav>
      <div className="album-grid">{albums.map(album => <a className="album-card" key={album.href} href={album.href} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${album.title} on Apple Music, opens in a new tab`}><div className="album-artwork"><img src={`/images/${album.image}`} alt={`${album.title} album cover`} width="600" height="600" loading="lazy" /><span className="album-listen">Listen <ArrowUpRight size={18} aria-hidden="true" /></span></div><h2>{album.title}</h2></a>)}</div>
    </>}
    {section === "videos" && <VideoGrid />}
    {section === "tour" && <TourWidget />}
    {section === "merch" && <div className="merch-panel"><h2>The official shop</h2><p>Visit Lalah’s store for merchandise and availability.</p><a className="cream-button inline-button" href="https://lalahhathaway.com/home" target="_blank" rel="noopener noreferrer">Visit the store <ArrowUpRight size={19} aria-hidden="true" /></a></div>}
  </PageShell>;
}
