import PoeTab from "./PoeTab";
import { PoeItem } from ".";

type PoeTabsResponse = {
    numTabs: number,
    tabs: PoeTab[],
    items?: PoeItem[],
};

export default PoeTabsResponse;
