module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.jest.json" }]
  },
  // ignore vite/other ESM deps (default is fine), adjust if you need to transform node_modules
  transformIgnorePatterns: ["/node_modules/"],
  // Ignore test files written for Vitest or other frameworks
  testPathIgnorePatterns: ["/node_modules/", "/Components/Exercise1/"],
  // Include Components/Exercise3 for testing
  testMatch: ["**/Components/Exercise3/**/*.test.(ts|tsx)"]
};
