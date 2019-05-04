import React from "react";
import styled from "@emotion/styled";
import { AuthForm } from "./auth-form";

const ConnectContainer = styled.div`
    text-align: center;
`;

const Connect: React.FC = () => {
    return (
        <ConnectContainer>
            <AuthForm />
        </ConnectContainer>
    );
};

export default Connect;
