module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  }
  ,globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/../tsconfig.jest.json"
    }
  }
};
