module.exports = {
    service: {
        includes: [
            __dirname + "/**/*.tsx",
        ],
        name: "stash-api",
        endpoint: {
            url: "http://localhost:4000",
        },
    },
};
