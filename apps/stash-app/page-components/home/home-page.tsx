import React, { useContext } from "react";
import styled from "@emotion/styled";
import gql from "graphql-tag";
import { TabBrowser } from "./tab-browser";
import { PoeInfo } from "../../models/globalTypes";
import { AuthForm } from "./auth-form";
import { AuthContext } from "../../context";
import { useQuery } from "react-apollo-hooks";
import { AccountInfoQuery, AccountInfoQueryVariables } from "../../models/AccountInfoQuery";

const ACCOUNT_INFO_QUERY = gql`
    query AccountInfoQuery($poeInfo: PoeInfo!, $tabIndex: Int) {
        getTabs(poeInfo: $poeInfo, tabIndex: $tabIndex) {
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
    const { setLoggedIn, poeCreds } = useContext(AuthContext);
    const { data: { getTabs }, loading, error } =
        useQuery<AccountInfoQuery, AccountInfoQueryVariables>(
            ACCOUNT_INFO_QUERY, {
            suspend: false,
            variables: {
                poeInfo: poeCreds,
            },
        });

    const handleSubmit = (values: PoeInfo) => {
        setLoggedIn(values);
    };

    return (
        <HomeContainer>
            <AuthForm onSubmit={handleSubmit}/>
            {loading && <p>Loading...</p>}
            {error && <p>RIP. Failed to find stash. Please try again!</p>}
            {getTabs && getTabs.tabs && <TabBrowser tabs={getTabs.tabs} />}
        </HomeContainer>
    );
};

export default HomePage;
