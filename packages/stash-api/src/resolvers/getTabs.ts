import { TabsArgs, TabData, Tab, Item } from "../models";
import axios, { AxiosRequestConfig } from "axios";
import { PoeTabsResponse } from "poe-models";

// Gettin pretty big...
const getTabs = async ({ poeInfo, tabIndex }: TabsArgs): Promise<TabData> => {
    const { accountName, league, poeSessId } = poeInfo;
    const includeItems = tabIndex !== undefined ? `&tabIndex=${tabIndex}` : "";
    const url = `${process.env.STASH_API}?accountName=${accountName}&league=${league}&tabs=1${includeItems}`;
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
        throw new Error(`RIP. Couldn't get a valid response from the server. (${response.status})`);
    }

    if (!response.data) {
        throw new Error(`RIP. Invalid account name or league provided.`);
    }

    const responseData: PoeTabsResponse = response.data;

    let items: Item[];
    if (responseData.items) {
        items = responseData.items.map((item) => {
            const mappedItem: Item = {
                baseName: item.typeLine,
                uniqueName: item.name,
                image: item.icon,
                category: item.category[0],
                maxStackSize: item.maxStackSize,
                stackSize: item.stackSize,
            };
            return mappedItem;
        });
    }

    return {
        numTabs: responseData.numTabs,
        tabs: responseData.tabs.map((tab): Tab => ({
            name: tab.n,
            index: tab.i,
            type: tab.type.replace("Stash", ""),
            color: { ...tab.colour },
        })),
        items,
    };
};

export default getTabs;
