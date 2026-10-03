import "dotenv/config";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

let instance: ReturnType<typeof createOpenAICompatible> | undefined;

export function getGroq() {
  if (!instance) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("Missing environment variable: GROQ_API_KEY");
    instance = createOpenAICompatible({
      name: "groq",
      baseURL: "https://api.groq.com/openai/v1",
      apiKey,
    });
  }
  return instance;
}

export const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";