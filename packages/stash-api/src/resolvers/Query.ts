import getTabs from "./getTabs";
import { TabsArgs, TabData } from "../models";

const Query = {
    hello: () => "world",
    getTabs: async (_: undefined, args: TabsArgs, ctx: any): Promise<TabData> => await getTabs(args),
};

export default Query;
