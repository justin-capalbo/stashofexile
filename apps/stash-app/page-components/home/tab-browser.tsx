import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ItemsCollection from "./items-collection";
import { TabPicker } from "./tab-picker";
import { PoeInfo } from "../../models/globalTypes";
import { AllItemsQuery, AllItemsQueryVariables } from "../../models/AllItemsQuery";
import { AuthContext } from "../../context";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

const ACCOUNT_INFO_QUERY = gql`
    query AllItemsQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
        getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
            numTabs
            tabs {
                name
                index
                color {
                    r
                    g
                    b
                }
            }
            items {
                image
                baseName
                stackSize
            }
        }
    }
`;

export const TabBrowser: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<number>(undefined);
    const { poeCreds } = useContext(AuthContext);

    const { data: { getTabs }, loading, error } =
        useQuery<AllItemsQuery, AllItemsQueryVariables>(
            ACCOUNT_INFO_QUERY, {
            suspend: false,
            variables: {
                poeInfo: poeCreds,
                tabIndex: selectedTab,
            },
        });

    if (loading) return <p>Loading stash...</p>;
    if (error) return <p>Error loading stash: {error.message}</p>;
    const { tabs, numTabs, items } = getTabs;
    return (
        <TabStyles>
            <p>{poeCreds.accountName} has {numTabs} stash tabs.</p>
            <TabPicker tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <ItemsCollection items={items} />
        </TabStyles>
    );
};
