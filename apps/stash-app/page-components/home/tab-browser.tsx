import React, { useState } from "react";
import styled from "@emotion/styled";
import ItemsForTab from "./items-collection";
import { TabPicker } from "./tab-picker";
import { AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";

const TabStyles = styled.div`
    margin: 8px;
    text-align: center;
`;

type Props = {
    tabData: AccountInfoQuery_getTabs_tabs[];
};
export const TabBrowser: React.FC<Props> = React.memo(({ tabData }) => {
    const [selected, setSelected] = useState<number>(0);
    return (
        <TabStyles>
            <>
                <TabPicker tabs={tabData} selectedTab={selected} setSelectedTab={setSelected} />
                <ItemsForTab tabIndex={selected} tabName={tabData[selected].name} />
            </>
        </TabStyles>
    );
});
