import React, { useState } from "react";
import styled from "@emotion/styled";
import { useApolloClient } from "react-apollo-hooks";
import gql from "graphql-tag";
import { PoeInfo } from "../../models/globalTypes";
import {
    AccountInfoQueryVariables,
    AccountInfoQuery,
    AccountInfoQuery_getTabs_tabs
} from "../../models/AccountInfoQuery";

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

type AuthFormProps = {
    onSubmit: (values: PoeInfo, tabs: AccountInfoQuery_getTabs_tabs[]) => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
    const client = useApolloClient();
    const [poeSessId, setPoeSessId] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("Rejechted");
    const [league, setLeague] = useState<string>("Synthesis");

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            if (onSubmit) {
                const res = await client.query<AccountInfoQuery, AccountInfoQueryVariables>({
                    query: ACCOUNT_INFO_QUERY,
                    variables: {
                        poeInfo: { poeSessId, accountName, league },
                    },
                });

                if (res.data && res.data.getTabs && res.data.getTabs.tabs) {
                    onSubmit({
                        poeSessId,
                        accountName,
                        league,
                    }, res.data.getTabs.tabs);
                }
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
    );
};
