import styled from "@emotion/styled";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const MyButton = styled.button`
	border-radius: 3px;
	background-color: #7fffd4;
	padding: .5em 1em;
`;

type PoeInfo = {
	poeSessId: string,
	accountName: string,
	league: string,
};

type TabCountResponse = {
	getTabs: TabCountData,
};

type TabCountData = {
	numTabs: number,
	tabs: Tab[],
};

type Tab = {
	name: string,
	index: number,
	type: string,
};

const TAB_COUNT_QUERY = gql`
	query TAB_COUNT_QUERY($poeInfo: PoeInfo!) {
		getTabs(poeInfo: $poeInfo) {
			numTabs
			tabs {
				index
				name
				type
			}
		}
	}
`;

const poeInfo: PoeInfo = {
	poeSessId: "47fda23f492705c4c2d11dbe6cb74b7a",
	accountName: "rejechted",
	league: "betrayal",
};

const TabText = ({ tab }: { tab: Tab }) => (
	<p><strong>{tab.name}: {tab.type}</strong></p>
);

export default () => (
	<div>
		<p>Welcome to next.js!</p>
		<Query<TabCountResponse, { poeInfo: PoeInfo }>
			query={TAB_COUNT_QUERY}
			variables={{poeInfo}}
		>
		{({ data: { getTabs }, loading, error }) => {
			if (loading) { return <p>Loading</p>; }
			if (error) { return <p>Error</p>; }

			return (
				<div>
					<p>{poeInfo.accountName} has {getTabs.numTabs} stash tabs.</p>
					{getTabs.tabs.map((tab) => <TabText key={tab.index} tab={tab} />)}
				</div>
			);
		}}
		</Query>
	</div>
);
