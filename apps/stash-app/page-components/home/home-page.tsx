import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TabBrowser } from "./tab-browser";
import { AuthForm } from "./auth-form";
import { AccountContext } from "../../context";

const HomeContainer = styled.div`
    margin-top: 16px;
    text-align: center;
`;

const StashTitle = styled.p`
    font-size: 16px;
    margin-top: 4px;
`;

const HomePage: React.FC = () => {
    const { loggedIn, poeCreds, tabs } = useContext(AccountContext);
    return (
        <HomeContainer>
            <AuthForm />
            {loggedIn && (
                <>
                    <StashTitle>{poeCreds.accountName} has {tabs.length} stash tabs.</StashTitle>
                    <TabBrowser tabData={tabs} />
                </>
            )}
        </HomeContainer>
    );
};

export default HomePage;
