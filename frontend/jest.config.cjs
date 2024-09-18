module.exports = {
    rootDir: "src",
    preset: "ts-jest",
    testEnvironment: "jsdom",
    collectCoverage: true,
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/__tests__/**",
        "!**/node_modules/**",
    ],
    coverageDirectory: "coverage",
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    moduleNameMapper: {
        "\\.svg$": 'jest-svg-transformer',
        "\\.css$": "identity-obj-proxy",
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    setupFilesAfterEnv: ["<rootDir>/../setupTests.ts"],
};