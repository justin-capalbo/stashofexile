import React, { useState } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ItemsCollection from "./ItemsCollection";
import TabsCollection from "./TabsCollection";
import {
    allTabsQueryVariables,
    allTabsQuery,
} from "./models/allTabsQuery";
import { PoeInfo } from "../../models/globalTypes";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

const ALL_TABS_QUERY = gql`
	query allTabsQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
		getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
			numTabs
			tabs {
				index
				name
                color {
                    r
                    g
                    b
                }
			}
            items {
                baseName
                image
                stackSize
            }
		}
	}
`;

type Props = {
    poeInfo: PoeInfo,
};

const TabSelector: React.FC<Props> = ({ poeInfo }) => {
    const [selectedTab, setSelectedTab] = useState<number>(undefined);
    const { data: { getTabs }, loading, error } = useQuery<allTabsQuery, allTabsQueryVariables>(ALL_TABS_QUERY, {
        suspend: false,
        variables: {
            tabIndex: selectedTab,
            poeInfo,
        },
    });

    if (loading) return <p>Loading stash...</p>;
    if (error) return <p>Error loading stash: {error.message}</p>;
    const { tabs, numTabs, items } = getTabs;
    return (
        <TabStyles>
            <p>{poeInfo.accountName} has {numTabs} stash tabs.</p>
            <TabsCollection tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <ItemsCollection items={items} />
        </TabStyles>
    );
};

export default TabSelector;
