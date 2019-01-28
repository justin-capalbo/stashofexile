import styled from "@emotion/styled";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import {
    tabCountQueryVariables,
    tabCountQuery_getTabs_tabs,
    tabCountQuery,
    tabCountQuery_getTabs_tabs_color,
} from "./models/tabCountQuery";

const TabCardStyles = styled.div`
    padding-left: 30px;
`;

const TabName = styled.span<tabCountQuery_getTabs_tabs_color>`
	font-weight: bold;
	border-radius: 12% 12% 2% 2%;
	border: 1px solid black;
	text-align: center;
    padding: 7px;
    margin-right: 1px;
	background-color: rgb(${(props) => props.r} ${(props) => props.g} ${(props) => props.b});
	color: ${(props) => {
        const luma = (0.2126 * props.r + 0.7152 * props.g + 0.0722 * props.b);
        return luma > 123.5 ? "black" : "gold";
    }};
`;

const TabSection = styled.div`
    margin: 15px;
`;

const TAB_COUNT_QUERY = gql`
	query tabCountQuery($poeInfo: PoeInfo!) {
		getTabs(poeInfo: $poeInfo) {
			numTabs
			tabs {
				index
				name
				type
                color {
                    r
                    g
                    b
                }
			}
		}
	}
`;

const poeCreds: tabCountQueryVariables = {
    poeInfo: {
        poeSessId: "47fda23f492705c4c2d11dbe6cb74b7a",
        accountName: "Rejechted",
        league: "betrayal",
    },
};

const TabHeader = ({ tab }: { tab: tabCountQuery_getTabs_tabs }) => (
    <TabName {...tab.color}>{tab.name}</TabName>
);

class TabCountQuery extends Query<tabCountQuery, tabCountQueryVariables> { }

const HomePage = () => (
    <TabCountQuery
        query={TAB_COUNT_QUERY}
        variables={poeCreds}
    >
        {({ data: { getTabs }, loading, error }) => {
            if (loading) { return <p>Loading</p>; }
            if (error) { return <p>Error</p>; }

            const { tabs, numTabs } = getTabs;
            return (
                <TabSection>
                    <p>{poeCreds.poeInfo.accountName} has {numTabs} stash tabs.</p>
                    <TabCardStyles>
                        {tabs.map((tab) => <TabHeader key={tab.index} tab={tab} />)}
                    </TabCardStyles>
                </TabSection>
            );
        }}
    </TabCountQuery>
);

export default HomePage;
