const path = require("path");

module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "vue"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(vue)$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub"
  },
  globals: {
    "vue-jest": {
      tsConfig: path.join(__dirname, "tsconfig.dev.json")
    },
    "ts-jest": {
      tsConfig: path.join(__dirname, "tsconfig.dev.json")
    }
  },
  testMatch: ["**/tests/unit/*.spec.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,vue}",
    "!src/index.js",
    "!dist/**",
    "!webpack.*.js",
    "!**/node_modules/**",
    "!jest.config.js",
    "!src/vue-shims.d.ts"
  ],
  coverageReporters: ["text"]
};
