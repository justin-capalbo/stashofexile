module.exports = {
    client: {
        name: "stash-app",
        includes: [
            __dirname + "/**/*.tsx",
        ],
        service: {
            name: "myaccount",
            localSchemaFile: "./models/schema.json",
            endpoint: {
                url: "http://localhost:4000",
            },
        },
    },
};
