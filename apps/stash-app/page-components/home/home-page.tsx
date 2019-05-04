import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { TabBrowser } from "./tab-browser";
import { AccountContext } from "../../context";

const HomeContainer = styled.div`
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
            {!loggedIn && (
                <Link href="/connect">
                    <p>Please <a style={{cursor: "pointer"}}>connect</a> with your POE info.</p>
                </Link>
            )}
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
