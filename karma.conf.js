module.exports = function (config) {
    config.set({
        frameworks: ["karma-typescript"],
        files: [
            "src/**/*.ts" // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"]
    });
};