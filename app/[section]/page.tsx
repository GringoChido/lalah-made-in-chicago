import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { ContactForm, SignupForm } from "@/components/preview-forms";
import { TourWidget } from "@/components/tour-widget";
import { VideoGrid } from "@/components/video-grid";
import { destinations } from "@/lib/destinations";
import { albums, socials } from "@/lib/media";
import { AlbumFeature } from "@/components/album-feature";
import { Reveal } from "@/components/reveal";
import { PlaylistCollection } from "@/components/campaign-media";
import { Biography } from "@/components/biography";

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
    {section === "bio" && <Biography />}
    {section === "music" && <>
      <AlbumFeature />
      <PlaylistCollection />
      <div className="catalog-heading"><p className="eyebrow">Through the years</p><h2>The discography</h2></div>
      <nav className="platform-links" aria-label="Music platforms"><a className="text-link" href="https://open.spotify.com/artist/0uNEy4544VZq2KOl7BsLuo" target="_blank" rel="noopener noreferrer">Spotify <ArrowUpRight size={16} aria-hidden="true" /></a><a className="text-link" href="https://music.apple.com/us/artist/lalah-hathaway/3895759" target="_blank" rel="noopener noreferrer">Apple Music <ArrowUpRight size={16} aria-hidden="true" /></a></nav>
      <div className="album-grid">{albums.map(album => <Reveal key={album.href}><a className="album-card" href={album.href} target="_blank" rel="noopener noreferrer" aria-label={`Listen to ${album.title} on Apple Music, opens in a new tab`}><div className={`album-artwork${album.crop ? ` artwork-${album.crop}` : ""}`}><img src={`/images/${album.image}`} alt={`${album.title} album cover`} width="600" height="600" loading="lazy" /><span className="album-listen">Listen <ArrowUpRight size={18} aria-hidden="true" /></span></div><h2>{album.title}</h2>{album.artist && <p className="album-credit">{album.artist}</p>}</a></Reveal>)}</div>
    </>}
    {section === "videos" && <VideoGrid />}
    {section === "tour" && <TourWidget />}
    {section === "merch" && <>
      <div className="merch-intro">
        <p>Bring a little Made in Chicago home.</p>
        <p className="merch-availability">Online ordering is coming soon. All prices in USD.</p>
      </div>
      <section className="merch-grid" aria-label="Made in Chicago merchandise">
        <article className="merch-product" aria-labelledby="vinyl-title">
          <div className="merch-product-image"><img src="/images/merch/made-in-chicago-vinyl.jpg" width="1200" height="1200" alt="Mockup of the Made in Chicago vinyl sleeve with Lalah’s listening-room photograph and a partially visible record." /></div>
          <div className="merch-product-heading"><h2 id="vinyl-title">Made in Chicago vinyl</h2><p className="merch-price">$40</p></div>
          <p className="merch-description">Made in Chicago on vinyl, featuring Lalah’s listening-room artwork.</p>
        </article>
        <article className="merch-product" aria-labelledby="tshirt-title">
          <div className="merch-product-image"><img src="/images/merch/black-portrait-tshirt.jpg" width="1200" height="1200" alt="Mockup of a black Lalah Hathaway T-shirt with her portrait printed on the front." /></div>
          <div className="merch-product-heading"><h2 id="tshirt-title">Lalah Hathaway T-shirt</h2><p className="merch-price">$50</p></div>
          <p className="merch-description">A black T-shirt featuring Lalah’s portrait, printed on the front.</p>
          <p className="merch-size-label">Black only · Sizes</p>
          <ul className="merch-sizes" aria-label="T-shirt sizes">{["S", "M", "L", "XL", "2XL"].map(size => <li key={size}>{size}</li>)}</ul>
        </article>
      </section>
      <p className="merch-image-note">Product mockups shown.</p>
      <section className="merch-shipping" aria-labelledby="shipping-heading">
        <h2 id="shipping-heading">Shipping &amp; dispatch</h2>
        <dl>
          <div><dt>Destinations</dt><dd>United States only</dd></div>
          <div><dt>Flat-rate shipping</dt><dd>$8 per order<span>One shipping charge, including orders with both products.</span></dd></div>
          <div><dt>Expected dispatch</dt><dd>Ships in 2–3 weeks<span>Delivery time is additional.</span></dd></div>
        </dl>
        <a className="text-link" href="/contact">Questions about merch? <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>
      <section id="returns" className="merch-returns" aria-labelledby="returns-heading">
        <h2 id="returns-heading">Returns &amp; exchanges</h2>
        <p>Returns may be requested within 30 days of delivery. T-shirts must be unworn and unwashed, and vinyl must be unopened.</p>
        <p>Customers cover return shipping for changes of mind or size. Original shipping charges are not refunded for these returns. Size exchanges depend on availability.</p>
        <p>If an item arrives damaged, defective or incorrect, contact us with your order number and photos. We’ll arrange a replacement or refund and cover any required return shipping.</p>
        <p>Please contact us before sending anything back. Refunds are issued to the original payment method after the return is received and checked.</p>
        <a className="text-link" href="/contact">Contact us about a return <ArrowUpRight size={16} aria-hidden="true" /></a>
      </section>
    </>}
  </PageShell>;
}
