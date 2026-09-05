import { ArrowUpRight, Play, Plus } from "lucide-react";
import { AlbumButton } from "@/components/album-experience";
import { release } from "@/lib/release";

export function AlbumFeature() {
  return <section className="release-feature" aria-label="Made In Chicago, the new album">
    <AlbumButton className="release-artwork" label="Open Made In Chicago listening panel"><img src={release.artwork} alt="Made In Chicago album cover" width="900" height="900" /><span className="release-artwork-action"><Play size={20} fill="currentColor" aria-hidden="true" />Hear the new single</span></AlbumButton>
    <div className="release-feature-copy"><p className="eyebrow">The new album / Lalah Hathaway</p><h2>Made In<br />Chicago</h2><p className="release-intro">{release.intro}</p><p className="release-story">{release.story}</p><div className="release-feature-actions"><a className="cream-button light-sweep" href={release.singleUrl} target="_blank" rel="noopener noreferrer"><Play size={16} fill="currentColor" aria-hidden="true" />Listen to the single</a><a className="text-link" href={release.albumUrl} target="_blank" rel="noopener noreferrer">{release.action}<ArrowUpRight size={16} aria-hidden="true" /></a></div><AlbumButton className="story-button" view="story">Behind the album<Plus size={17} aria-hidden="true" /></AlbumButton></div>
  </section>;
}
