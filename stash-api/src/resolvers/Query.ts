import axios, { AxiosRequestConfig } from "axios";
import PoeTabsResponse from "../models/PoeStashResponse";

// GraphQL input/respose types, move these
type TabsArgs = {
	input: {
		creds: {
			poeSessId: string;
			accountName: string;
			league: string;
		},
	},
};

type Tab = {
	name: string;
	index: number;
	type: string;
	color: Color;
};

type Color = {
	r: number;
	g: number;
	b: number;
};

const Query = {
	hello: () => "world",
	async tabs(_: undefined, args: TabsArgs, ctx: any): Promise<Tab[]> {
		const { accountName, league, poeSessId } = args.input.creds;
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
		const tabData: PoeTabsResponse = response.data;

		return tabData.tabs.map((tab): Tab => ({
			name: tab.n,
			index: tab.i,
			type: tab.type,
			color: { ...tab.colour },
		}));
	},
};

export default Query;
