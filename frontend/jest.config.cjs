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
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.ts",
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
    setupFilesAfterEnv: ["<rootDir>../setupTests.ts"],
};