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
	background-color: rgb(${(props) => props.r} ${(props) => props.g} ${(props) => props.b});
	border-radius: 8%;
	border: 1px solid;
	color: black;
	text-align: center;
	padding: 6px;
`;

const TabSection = styled.div`
    margin: 15px;
`;

const MyButton = styled.button`
	border-radius: 5px;
	background-color: #7fffd4;
	padding: .5em 1em;
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

const TabCard = ({ tab }: { tab: tabCountQuery_getTabs_tabs }) => (
	<p>
		<TabName {...tab.color}>{tab.name}</TabName> {tab.type}
	</p>
);

class TabCountQuery extends Query<tabCountQuery, tabCountQueryVariables> { }

const Home = () => (
	<div>
		<MyButton>Hello Next JS</MyButton>
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
							{tabs.map((tab) => <TabCard key={tab.index} tab={tab} />)}
						</TabCardStyles>
					</TabSection>
				);
			}}
		</TabCountQuery>
	</div>
);

export default Home;
