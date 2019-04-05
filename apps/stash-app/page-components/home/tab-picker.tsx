import React from "react";
import styled from "@emotion/styled";
import TabIcon from "./tab-icon";
import { allTabsQuery_getTabs_tabs } from "./models/allTabsQuery";

const TabIcons = styled.div`
    padding: 10px 10px 0px 10px;
`;

type Props = {
    tabs: allTabsQuery_getTabs_tabs[],
    selectedTab: number,
    setSelectedTab: (tabIndex: number) => void,
};

const TabPicker: React.FC<Props> = React.memo(({ tabs, selectedTab, setSelectedTab }) => (
    <TabIcons>
        {tabs.map((tab) => <TabIcon
            key={tab.index}
            color={tab.color}
            name={tab.name}
            selected={tab.index === selectedTab}
            handleClick={() => setSelectedTab(tab.index)}
        />)}
    </TabIcons>
));

export default TabPicker;
