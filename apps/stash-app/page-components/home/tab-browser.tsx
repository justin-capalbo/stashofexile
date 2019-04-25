import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ItemsCollection from "./items-collection";
import { TabPicker } from "./tab-picker";
import { AccountContext } from "../../context";
import { AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";
import { SingleTabItemsQuery, SingleTabItemsQueryVariables } from "../../models/SingleTabItemsQuery";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

const SINGLE_TAB_ITEMS_QUERY = gql`
    query SingleTabItemsQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
        getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
            items {
                image
                baseName
                stackSize
            }
        }
    }
`;

type Props = {
    tabData: AccountInfoQuery_getTabs_tabs[];
};

export const TabBrowser: React.FC<Props> = ({ tabData }) => {
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { poeCreds } = useContext(AccountContext);

    const { data: { getTabs }, loading, error } =
        useQuery<SingleTabItemsQuery, SingleTabItemsQueryVariables>(
            SINGLE_TAB_ITEMS_QUERY, {
            suspend: false,
            variables: {
                poeInfo: poeCreds,
                tabIndex: selectedTab,
            },
        });

    const itemsCollection =
        loading ? <p>Loading items...</p>
        : error ? <p>Error loading stash: {error.message}</p>
        : getTabs && <ItemsCollection items={getTabs.items} />;

    return (
        <TabStyles>
            <TabPicker tabs={tabData} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            {itemsCollection}
        </TabStyles>
    );
};
