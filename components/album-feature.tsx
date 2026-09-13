import { ArrowUpRight, Play } from "lucide-react";
import { AlbumButton } from "@/components/album-experience";
import { release } from "@/lib/release";
import { AlbumFilmButton } from "@/components/campaign-media";
import { SingleLinks } from "@/components/single-links";

export function AlbumFeature() {
  return <section className="release-feature" aria-label="Made In Chicago, the new album">
    <AlbumButton className="release-artwork" label="Open Made In Chicago listening panel"><img src={release.artwork} alt="Made In Chicago album cover" width="900" height="900" /><span className="release-artwork-action"><Play size={20} fill="currentColor" aria-hidden="true" />Hear the new single</span></AlbumButton>
    <div className="release-feature-copy"><p className="eyebrow">The new album / Lalah Hathaway</p><h2>Made In<br />Chicago</h2><p className="release-intro">{release.intro}</p><p className="release-story">{release.story}</p><p className="single-links-heading">Listen to “{release.singleTitle}”</p><SingleLinks /><div className="release-feature-actions"><a className="text-link" href={release.albumUrl} target="_blank" rel="noopener noreferrer">{release.action}<ArrowUpRight size={16} aria-hidden="true" /></a></div><AlbumFilmButton /></div>
  </section>;
}
