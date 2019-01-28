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
    padding: 10px 10px 0px 10px;
`;

const ItemsContainer = styled.div`
    background-color: #455;
    overflow: auto;
`;

const Item = styled.span`
    color: #EFEFEF;
    background-color: #233;
    border: 4px solid #EFEFEF;
    margin: 10px;
    padding: 5px;
    float: left;
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
            poeSessId: "47fda23f492705c4c2d11dbe6cb74b7a",
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
                if (loading) { return <p>Loading</p>; }
                if (error) { return <p>Error</p>; }

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
                        <ItemsContainer>
                            {items &&
                                items.map((item, index) => 
                                    <Item key={index}>
                                        <img src={item.image} />{item.baseName} {item.stackSize && "x"}{item.stackSize}
                                    </Item>
                            )}
                        </ItemsContainer>
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
