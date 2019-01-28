import Tab from "./Tab";
import Item from "./Item";

export type TabData = {
    numTabs: number,
    tabs: Tab[],
    items?: Item[],
};

export default TabData;
