import React, { useState } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import TabIcon from "./TabIcon";
import ItemsCollection from "./ItemsCollection";
import {
    allTabsQueryVariables,
    allTabsQuery,
} from "./models/allTabsQuery";
import { useQuery } from "react-apollo-hooks";
import { PoeInfo } from "../../models/globalTypes";

const TabSection = styled.div`
    margin: 15px;
    text-align: center;
`;

const TabIconContainer = styled.div`
    padding: 10px 10px 0px 10px;
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
            poeInfo
        },
    });

    if (loading) return <p>Loading stash...</p>;
    if (error) return <p>Error loading stash: {error.message}</p>;
    const { tabs, numTabs, items } = getTabs;
    return (
        <TabSection>
            <p>{poeInfo.accountName} has {numTabs} stash tabs.</p>
            <TabIconContainer>
                {tabs.map((tab) => <TabIcon
                    key={tab.index}
                    color={tab.color}
                    name={tab.name}
                    selected={tab.index === selectedTab}
                    handleClick={() => setSelectedTab(tab.index)}
                />)}
            </TabIconContainer>
            {items &&
                <ItemsCollection items={items} />
            }
        </TabSection>
    );
}

export default TabSelector;
