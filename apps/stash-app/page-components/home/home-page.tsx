import React, { useState } from "react";
import styled from "@emotion/styled";
import { TabBrowser } from "./tab-browser";
import { PoeInfo } from "../../models/globalTypes";
import { AuthForm } from "./auth-form";

const HomeContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;

const HomePage: React.FC = () => {
    const [poeCreds, setPoeCreds] = useState<PoeInfo>(null);

    const handleSubmit = (values: PoeInfo) => {
        setPoeCreds(values);
    };

    return (
        <HomeContainer>
            <AuthForm onSubmit={handleSubmit}/>
            { poeCreds && <TabBrowser poeInfo={poeCreds} /> }
        </HomeContainer>
    );
};

export default HomePage;
