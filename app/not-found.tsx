import { PageShell } from "@/components/page-shell";
export default function NotFound() {
  return <PageShell title="Page not found" number="00"><p>This page is not part of the room.</p><a href="/" className="text-link">Return home</a></PageShell>;
}
