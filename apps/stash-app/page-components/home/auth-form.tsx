import React, { useState } from "react";
import { PoeInfo } from "../../models/globalTypes";
import styled from "@emotion/styled";

const SubmitButton = styled.button`
    margin-left: 4px;
`;

type AuthFormProps = {
    onSubmit: (values: PoeInfo) => void;
};

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
    const [poeSessId, setPoeSessId] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("Rejechted");
    const [league, setLeague] = useState<string>("Synthesis");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (onSubmit) {
                onSubmit({
                    poeSessId,
                    accountName,
                    league,
                });
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
