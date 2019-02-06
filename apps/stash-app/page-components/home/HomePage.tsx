import React from "react";
import styled from "@emotion/styled";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import TabIcon from "./TabIcon";
import ItemsCollection from "./ItemsCollection";
import {
    allTabsQueryVariables,
    allTabsQuery,
} from "./models/allTabsQuery";

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

type State = {
    selectedTab?: number,
};

class AllTabsQuery extends Query<allTabsQuery, allTabsQueryVariables> { }
class HomePage extends React.Component<{}, State>{
    public state: State = {};
    public render() {
        const poeInfo = {
            poeSessId: "c4219bf7982b23e3809564e871463147",
            accountName: "Rejechted",
            league: "betrayal",
        };
        return (
            <AllTabsQuery
                query={ALL_TABS_QUERY}
                variables={{
                    tabIndex: this.state.selectedTab,
                    poeInfo,
                }}
            >
                {({ data: { getTabs }, loading, error }) => {
                    if (loading) return <p>Loading stash...</p>; 
                    if (error) return <p>Error loading stash: {error}</p>; 

                    const { tabs, numTabs, items } = getTabs;
                    return (
                        <TabSection>
                            <p>{poeInfo.accountName} has {numTabs} stash tabs.</p>
                            <TabIconContainer>
                                {tabs.map((tab) => <TabIcon
                                    key={tab.index}
                                    color={tab.color}
                                    name={tab.name}
                                    selected={tab.index === this.state.selectedTab}
                                    handleClick={() => this.selectTab(tab.index)}
                                />)}
                            </TabIconContainer>
                            {items &&
                                <ItemsCollection items={items}/>
                            }
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
