import React, { useContext } from "react";
import styled from "@emotion/styled";
import { TabBrowser } from "./tab-browser";
import { PoeInfo } from "../../models/globalTypes";
import { AuthForm } from "./auth-form";
import { AuthContext } from "../../context";

const HomeContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;

const HomePage: React.FC = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);

    const handleSubmit = (values: PoeInfo) => {
        setLoggedIn(values);
    };

    return (
        <HomeContainer>
            <AuthForm onSubmit={handleSubmit}/>
            {loggedIn && <TabBrowser />}
        </HomeContainer>
    );
};

export default HomePage;
