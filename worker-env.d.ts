// Optional bindings match .openai/hosting.json. The database helper checks availability.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
