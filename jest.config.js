var preset = require("jest-preset-angular/jest-preset");
module.exports = {
  ...preset,
  preset: "jest-preset-angular",
  setupFilesAfterEnv: [
    "<rootDir>/node_modules/jest-preset-angular/build/setupJest.js"
  ],
  testMatch: ["**/*.test.ts"],
  globals: {
    ...preset.globals,
    "ts-jest": {
      ...preset.globals["ts-jest"],
      tsConfig: "src/tsconfig.test.json",
      isolatedModules: true
    }
  }
};
