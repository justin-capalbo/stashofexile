import { TabsArgs, TabData, Tab } from "../models";
import axios, { AxiosRequestConfig } from "axios";
import { PoeTabsResponse } from "poe-models";

const getTabs = async (args: TabsArgs): Promise<TabData> => {
	const { accountName, league, poeSessId } = args.poeInfo;
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
