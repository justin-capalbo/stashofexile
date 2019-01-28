import { TabsArgs, TabData, Tab } from "../models";
import axios, { AxiosRequestConfig } from "axios";
import { PoeTabsResponse } from "poe-models";

const getTabs = async ({ poeInfo }: TabsArgs): Promise<TabData> => {
    const { accountName, league, poeSessId } = poeInfo;
    const url = `${process.env.STASH_API}?accountName=${accountName}&league=${league}&tabs=1`;
    const headers = {
        Referer: process.env.POE_URL,
        Cookie: `POESESSID=${poeSessId}`,
    };
    const request: AxiosRequestConfig = {
        url,
        headers,
    };
    const response = await axios(request);

    if (response.status !== 200) {
        throw new Error(`RIP. Couldn't get a valid response from the server.`);
    }

    if (!response.data) {
        throw new Error(`RIP. Invalid account name or league provided.`);
    }

    const responseData: PoeTabsResponse = response.data;

    return {
        numTabs: responseData.numTabs,
        tabs: responseData.tabs.map((tab): Tab => ({
            name: tab.n,
            index: tab.i,
            type: tab.type.replace("Stash", ""),
            color: { ...tab.colour },
        })),
    };
};

export default getTabs;
