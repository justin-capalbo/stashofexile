import React, { useState } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ItemsCollection from "./items-collection";
import TabPicker from "./tab-picker";
import { PoeInfo } from "../../models/globalTypes";
import { AllItemsQuery, AllItemsQueryVariables } from "../../models/AllItemsQuery";

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

type Props = {
    poeInfo: PoeInfo,
};

const TabBrowser: React.FC<Props> = ({ poeInfo }) => {
    const [selectedTab, setSelectedTab] = useState<number>(undefined);
    const { data: { getTabs }, loading, error } =
        useQuery<AllItemsQuery, AllItemsQueryVariables>(
            ACCOUNT_INFO_QUERY, {
            suspend: false,
            variables: {
                poeInfo,
                tabIndex: selectedTab,
            },
        });

    if (loading) return <p>Loading stash...</p>;
    if (error) return <p>Error loading stash: {error.message}</p>;
    const { tabs, numTabs, items } = getTabs;
    return (
        <TabStyles>
            <p>{poeInfo.accountName} has {numTabs} stash tabs.</p>
            <TabPicker tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <ItemsCollection items={items} />
        </TabStyles>
    );
};

export default TabBrowser;
