/** @type {import('@ladle/react').UserConfig} */
export default {
  stories: "src/**/*.stories.{ts,tsx}",
  addons: {
    theme: {
      enabled: true,
      defaultState: "light",
    },
    width: {
      enabled: false,
    },
  },
};
