declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    OPENAI_API_KEY?: string;
    OPENAI_MODEL?: string;
    ENABLE_AI?: string;
    BUCKET?: R2Bucket;
  }
}
