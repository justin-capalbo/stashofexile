import React, { useState } from "react";
import styled from "@emotion/styled";
import ItemsCollection from "./items-collection";
import { TabPicker } from "./tab-picker";
import { AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";
import { useStashTab } from "../../hooks/use-stash-tab";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

type Props = {
    tabData: AccountInfoQuery_getTabs_tabs[];
};
export const TabBrowser: React.FC<Props> = React.memo(({ tabData }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { itemsLoading, items, error } = useStashTab(selectedTab);
    return (
        <TabStyles>
            <>
                <TabPicker tabs={tabData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                {error && <p>{error}</p>}
                {itemsLoading
                    ? <p>Loading...</p>
                    : <ItemsCollection items={items} />
                }
            </>
        </TabStyles>
    );
});
