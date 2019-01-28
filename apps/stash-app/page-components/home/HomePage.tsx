import React from "react";
import styled from "@emotion/styled";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TabIcon from "./TabIcon";
import {
    allTabsQueryVariables,
    allTabsQuery,
} from "./models/allTabsQuery";

const TabSection = styled.div`
    margin: 15px;
    text-align: center;
`;

const TabIconContainer = styled.div`
    padding: 8px;
`;

const ALL_TABS_QUERY = gql`
	query allTabsQuery($poeInfo: PoeInfo!) {
		getTabs(poeInfo: $poeInfo) {
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
		}
	}
`;

const poeCreds: allTabsQueryVariables = {
    poeInfo: {
        poeSessId: "47fda23f492705c4c2d11dbe6cb74b7a",
        accountName: "Rejechted",
        league: "betrayal",
    },
};

type State = {
    selectedTab: number,
};

class AllTabsQuery extends Query<allTabsQuery, allTabsQueryVariables> { }
class HomePage extends React.Component<{}, State>{
    public state = {
        selectedTab: 0,
    };

    public render() {
        return (
            <AllTabsQuery
                query={ALL_TABS_QUERY}
                variables={poeCreds}
            >
            {({ data: { getTabs }, loading, error }) => {
                if (loading) { return <p>Loading</p>; }
                if (error) { return <p>Error</p>; }

                const { tabs, numTabs } = getTabs;
                return (
                    <TabSection>
                        <p>{poeCreds.poeInfo.accountName} has {numTabs} stash tabs.</p>
                        <TabIconContainer>
                            {tabs.map((tab) => <TabIcon
                                key={tab.index}
                                color={tab.color}
                                name={tab.name}
                                selected={tab.index === this.state.selectedTab}
                                handleClick={() => this.selectTab(tab.index)}
                            />)}
                        </TabIconContainer>
                    </TabSection>
                );
            }}
            </AllTabsQuery>
        );
    }

    protected selectTab = (tabIndex: number) => {
        this.setState({
            selectedTab: tabIndex,
        });
    }
}

export default HomePage;
