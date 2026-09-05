"use client";

import { useState, type CSSProperties } from "react";
import { SiteMenu } from "@/components/site-menu";
import { destinations } from "@/lib/destinations";

export function LandingScene() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <main className={`landing${showLinks ? " show-links" : ""}`}>
      <a className="skip-link" href="#room-links">Skip to room links</a>
      <div className="room" role="group" aria-label="Interactive record room">
        <img className="room-image" src="/images/landing.webp" width="2400" height="1600"
          alt="Lalah Hathaway in a record room. Seven objects link to contact, socials, bio, music, videos, tour, and merch."
          fetchPriority="high" />
        <nav id="room-links" aria-label="Explore the room" tabIndex={-1}>
          {destinations.map(item => (
            <a key={item.id} href={`/${item.id}`} className={`room-link room-link-${item.id}`}
              aria-label={`${item.label}, ${item.object}`}
              style={{
                left: `${item.x / 15}%`, top: `${item.y / 10}%`,
                width: `${item.w / 15}%`, height: `${item.h / 10}%`,
              } as CSSProperties}>
              <svg className="object-glow" viewBox={`${item.x} ${item.y} ${item.w} ${item.h}`}
                aria-hidden="true" preserveAspectRatio="none">
                <defs><clipPath id={`clip-${item.id}`}><path d={item.path} /></clipPath></defs>
                <path className="glow-outline" d={item.path} />
                <image className="glow-image" href="/images/landing.webp" x="0" y="0" width="1500" height="1000"
                  clipPath={`url(#clip-${item.id})`} />
              </svg>
              <span className="object-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <header className="landing-header">
        <h1 className="home-identity"><span>Lalah Hathaway</span><span className="home-project">Made in Chicago</span></h1>
        <SiteMenu />
      </header>
      <div className="landing-footer">
        <p className="desktop-instruction">Explore the room. Hover, then click.</p>
        <p className="touch-instruction">Tap a glowing object to explore.</p>
        <button type="button" className="show-links-button" aria-pressed={showLinks}
          onClick={() => setShowLinks(value => !value)}>{showLinks ? "Hide labels" : "Show links"}</button>
      </div>
    </main>
  );
}
