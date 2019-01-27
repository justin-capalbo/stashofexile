type Settings = {
    gqlEndpoint: string,
};

type SettingsCollection = {
    [index: string]: Settings,
};

const settingsCollection: SettingsCollection = {
    development: {
        gqlEndpoint: "http://localhost:4000",
    },
};

const settings: Settings = settingsCollection[process.env.NODE_ENV];
export default settings;
