import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TabBrowser } from "./tab-browser";
import { AuthForm as AccountForm } from "./auth-form";
import { AccountContext } from "../../context";

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
