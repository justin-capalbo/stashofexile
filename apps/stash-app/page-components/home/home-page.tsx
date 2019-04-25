import React, { useContext } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { TabBrowser } from "./tab-browser";
import { PoeInfo } from "../../models/globalTypes";
import { AuthForm as AccountForm } from "./auth-form";
import { AccountContext } from "../../context";
import { useQuery } from "react-apollo-hooks";
import { AccountInfoQuery, AccountInfoQueryVariables, AccountInfoQuery_getTabs_tabs } from "../../models/AccountInfoQuery";

const ACCOUNT_INFO_QUERY = gql`
    query AccountInfoQuery($poeInfo: PoeInfo!) {
        getTabs(poeInfo: $poeInfo) {
            tabs {
                name
                index
                color {
                    r
                    g
                    b
                }
            }
        }
    }
`;

const HomeContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;

const HomePage: React.FC = () => {
    const { loggedIn, poeCreds, tabs } = useContext(AccountContext);
    return (
        <HomeContainer>
            <AccountForm />
            {loggedIn && (
                <>
                    <p>{poeCreds.accountName} has {tabs.length} stash tabs.</p>
                    <TabBrowser tabData={tabs} />
                </>
            )}
        </HomeContainer>
    );
};

export default HomePage;
