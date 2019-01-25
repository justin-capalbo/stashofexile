import getTabs from "./getTabs";
import { TabsArgs, Tab } from "../models";

const Query = {
	hello: () => "world",
	getTabs: async (_: undefined, args: TabsArgs, ctx: any): Promise<Tab[]> => await getTabs(args),
};

export default Query;
