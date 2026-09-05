// The starter's unused database helper checks this optional binding at runtime.
// This review has no database configured and collects no form submissions.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
