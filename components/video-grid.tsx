"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { videos } from "@/lib/media";

function VideoThumbnail({ video }: { video: typeof videos[number] }) {
  const [failed, setFailed] = useState(false);
  return <a href={video.href} className="video-card" target="_blank" rel="noopener noreferrer" aria-label={`Watch ${video.title} on YouTube, opens in a new tab`}>
    <div className="video-artwork">
      {!failed && <img src={video.image} alt="" width="1280" height="720" loading="lazy" onError={() => setFailed(true)} />}
      {failed && <span className="thumbnail-fallback">Watch on YouTube</span>}
      <span className="play-button"><Play size={25} fill="currentColor" aria-hidden="true" /></span>
    </div>
    <h2>{video.title}</h2><p>{video.detail}</p>
  </a>;
}
export function VideoGrid() {
  return <div className="video-grid">{videos.map(video => <VideoThumbnail key={video.href} video={video} />)}</div>;
}
