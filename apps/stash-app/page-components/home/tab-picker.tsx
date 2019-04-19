import React from "react";
import styled from "@emotion/styled";
import TabIcon from "./tab-icon";
import { AllItemsQuery_getTabs_tabs } from "../..//models/AllItemsQuery";

const TabIcons = styled.div`
    padding: 10px 10px 0px 10px;
`;

type Props = {
    tabs: AllItemsQuery_getTabs_tabs[],
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
