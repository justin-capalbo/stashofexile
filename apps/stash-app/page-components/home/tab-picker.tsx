import React from "react";
import { TabIcon } from "./tab-icon";
import { AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";

type Props = {
    tabs: AccountInfoQuery_getTabs_tabs[],
    selectedTab: number,
    setSelectedTab: (tabIndex: number) => void,
};

export const TabPicker: React.FC<Props> = React.memo(({ tabs, selectedTab, setSelectedTab }) => (
    <>
        {tabs.map((tab) => <TabIcon
            key={tab.index}
            color={tab.color}
            name={tab.name}
            selected={tab.index === selectedTab}
            handleClick={() => setSelectedTab(tab.index)}
        />)}
    </>
));
