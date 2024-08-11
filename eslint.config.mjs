// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    "vue/no-setup-props-reactivity-loss": "warn",
    "vue/html-self-closing": "off",
  },
});
