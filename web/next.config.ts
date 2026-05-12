import type { NextConfig } from "next";
import path from "path";
import { config as loadEnv } from "dotenv";

// Ensure local development can read the API key from the project root `.env`.
// If it's already set (e.g. via the shell), we don't override it.
if (!process.env.OPENROUTER_API_KEY) {
  loadEnv({ path: path.resolve(__dirname, "../.env") });
}

const nextConfig: NextConfig = {};

export default nextConfig;
