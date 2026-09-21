"use client";

import { useEffect, useRef, useState } from "react";
import { bandsintownUrl } from "@/lib/destinations";

export function TourWidget() {
  const container = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const target = container.current;
    if (!target) return;
    // Bandsintown renders an empty schedule as its play-my-city prompt, not as a
    // no-dates container, so match the widget shell rather than the date rows.
    const observer = new MutationObserver(() => {
      if (target.querySelector(".bit-event, .bit-no-dates-container, .bit-events-container, .bit-play-my-city-wrapper")) setState("ready");
    });
    observer.observe(target, { childList: true, subtree: true });
    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.async = true;
    script.charset = "utf-8";
    script.onerror = () => setState("error");
    document.body.appendChild(script);
    const timer = window.setTimeout(() => setState(current => current === "ready" ? current : "error"), 18000);
    return () => { observer.disconnect(); window.clearTimeout(timer); script.remove(); };
  }, []);
  return (
    <section className="tour-panel" aria-label="Upcoming shows">
      <h2>Upcoming shows</h2>
      {state === "loading" && <p className="widget-message" role="status">Loading dates from Bandsintown…</p>}
      {state === "error" && <p className="widget-message" role="status">The dates feed is unavailable here. View Lalah’s schedule on Bandsintown below.</p>}
      <div ref={container} className="widget-container">
        <a className="bit-widget-initializer" href={bandsintownUrl} data-artist-name="id_34100"
          data-background-color="rgba(0,0,0,0)" data-separator-color="rgba(255,243,220,0.3)"
          data-text-color="rgba(255,243,220,1)" data-font="Arial" data-auto-style="false"
          data-layout-style="classic" data-event-row-redirection="false" data-standalone-date-col="true"
          data-button-label-capitalization="none" data-date-capitalization="none"
          data-location-capitalization="none" data-venue-capitalization="none"
          data-display-local-dates="false" data-display-past-dates="false"
          data-display-limit="all" data-display-start-time="false"
          data-link-color="rgba(255,243,220,1)" data-display-lineup="false"
          data-display-details="false" data-show-logo="true" data-display-logo="true"
          data-follow-section-position="hidden" data-display-play-my-city="false"
          data-tickets-cta-text="Tickets" data-event-ticket-text="Tickets" data-event-rsvp-cta-text="RSVP"
          data-sold-out-cta-text="Sold out" data-presale-cta-text="Presale"
          data-event-ticket-text-color="rgba(30,52,43,1)" data-event-ticket-bg-color="rgba(255,243,220,1)"
          data-event-ticket-border-color="rgba(255,243,220,1)"
          data-event-rsvp-text-color="rgba(255,243,220,1)"
          data-event-rsvp-border-color="rgba(255,243,220,0.5)" />
      </div>
      <a className="text-link tour-fallback" href={bandsintownUrl} target="_blank" rel="noopener noreferrer">All dates & tickets on Bandsintown</a>
    </section>
  );
}
