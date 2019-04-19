import React, { useState } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import ItemsCollection from "./items-collection";
import TabPicker from "./tab-picker";
import { PoeInfo } from "../../models/globalTypes";
import { AccountInfoQuery, AccountInfoQueryVariables } from "../../models/accountInfoQuery";

const TabStyles = styled.div`
    margin: 15px;
    text-align: center;
`;

const ACCOUNT_INFO_QUERY = gql`
    query AccountInfoQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
        getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
            numTabs
        }
    }
`;

type Props = {
    poeInfo: PoeInfo,
};

const TabBrowser: React.FC<Props> = ({ poeInfo }) => {
    const [selectedTab, setSelectedTab] = useState<number>(undefined);
    const { data: { getTabs }, loading, error } =
        useQuery<AccountInfoQuery, AccountInfoQueryVariables>(
            ACCOUNT_INFO_QUERY, {
            suspend: false,
            variables: {
                poeInfo,
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
