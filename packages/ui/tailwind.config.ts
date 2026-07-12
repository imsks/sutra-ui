import { sutraPreset } from "@sutra/tokens/tailwind";

/**
 * Tailwind config for the Sutra component library (and its Ladle docs). It loads
 * the shared `@sutra/tokens` preset so every product renders identical utilities.
 */
export default {
  presets: [sutraPreset],
  content: ["./src/**/*.{ts,tsx}", "./.ladle/**/*.{ts,tsx}"],
};
