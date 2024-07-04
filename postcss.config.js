module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    ...(env.mode === "production" ? { cssnano: {} } : {}),
  },
};
