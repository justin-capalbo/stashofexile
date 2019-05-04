import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import { useApolloClient } from "react-apollo-hooks";
import gql from "graphql-tag";
import {
    AccountInfoQueryVariables,
    AccountInfoQuery,
} from "../../models/AccountInfoQuery";
import { AccountContext } from "../../context";

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

const SubmitButton = styled.button`
    margin-left: 4px;
`;

export const AuthForm: React.FC = () => {
    const client = useApolloClient();
    const { setLoggedIn } = useContext(AccountContext);
    const [poeSessId, setPoeSessId] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("Rejechted");
    const [league, setLeague] = useState<string>("Synthesis");
    const [loading, setLoading] = useState(false);

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();

                setLoading(true);
                const res = await client.query<AccountInfoQuery, AccountInfoQueryVariables>({
                    query: ACCOUNT_INFO_QUERY,
                    variables: {
                        poeInfo: { poeSessId, accountName, league },
                    },
                });
                setLoading(false);

                if (res.data && res.data.getTabs && res.data.getTabs.tabs) {
                    setLoggedIn({
                        poeSessId,
                        accountName,
                        league,
                    }, res.data.getTabs.tabs);
                }
            }}>
                <input
                    type="text"
                    value={poeSessId}
                    onChange={(e) => setPoeSessId(e.target.value)}
                    placeholder="POE Session Id"
                    required
                />
                <input
                    type="text"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Account Name"
                    required
                />
                <input
                    type="text"
                    value={league}
                    onChange={(e) => setLeague(e.target.value)}
                    placeholder="League"
                />
                <SubmitButton type="submit">Find My Stash</SubmitButton>
            </form>
            {loading && <p>Looking for this account...</p>}
        </>
    );
};
