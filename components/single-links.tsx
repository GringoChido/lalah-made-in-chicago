import { ArrowUpRight } from "lucide-react";
import { release } from "@/lib/release";

/** Plain links let each service handle playback and opening its own app. */
export function SingleLinks() {
  const primary = release.singleServices.slice(0, 2);
  const additional = release.singleServices.slice(2);
  return <nav className="single-links" aria-label={`Listen to ${release.singleTitle}`}>
    <div className="single-links-primary">{primary.map(service => <a key={service.name} className="service-logo-link service-logo-primary light-sweep" href={service.href} target="_blank" rel="noopener noreferrer" title={service.name} aria-label={`Listen to ${release.singleTitle} by Lalah Hathaway on ${service.name}`}><img className="service-logo" src={`/images/platforms/${service.name.toLowerCase().replaceAll(" ", "")}.svg`} alt="" aria-hidden="true" width={150} height={40} /><ArrowUpRight size={17} aria-hidden="true" /></a>)}</div>
    <details className="single-links-more"><summary>More music services</summary><div>{additional.map(service => <a key={service.name} className="service-logo-link service-logo-secondary" href={service.href} target="_blank" rel="noopener noreferrer" title={service.name} aria-label={`Listen to ${release.singleTitle} by Lalah Hathaway on ${service.name}`}><img className="service-logo" src={`/images/platforms/${service.name.toLowerCase().replaceAll(" ", "")}.svg`} alt="" aria-hidden="true" width={150} height={40} /><ArrowUpRight size={15} aria-hidden="true" /></a>)}</div></details>
  </nav>;
}
