import { ArrowLeft } from "lucide-react";
import { SiteMenu } from "@/components/site-menu";

export function PageShell({ title, number, variant = "brown", children }: {
  title: string; number: string; variant?: "brown" | "bio" | "tour"; children: React.ReactNode;
}) {
  return (
    <div className={`page-shell page-${variant}`}>
      <a className="skip-link" href="#page-content">Skip to content</a>
      {variant !== "brown" && <img className="page-background" src={`/images/${variant}.webp`} alt="" width="2400" height="1600" fetchPriority="high" />}
      <header className="page-header">
        <a href="/" className="back-home"><ArrowLeft size={18} aria-hidden="true" /><span>Back to the room</span></a>
        <a href="/" className="page-wordmark">Lalah Hathaway</a>
        <SiteMenu />
      </header>
      <main id="page-content" className="page-content">
        <div className="page-title"><p>{number} / Made in Chicago</p><h1>{title}</h1></div>
        {children}
      </main>
      <footer className="page-footer"><a href="/">Lalah Hathaway</a><span>Made in Chicago</span></footer>
    </div>
  );
}
