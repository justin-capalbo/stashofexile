import React, { useState } from "react";
import styled from "@emotion/styled";
import TabSelector from "./TabSelector";

const HomeContainer = styled.div`
    margin-top: 15px;
    text-align: center;
`;

const HomePage: React.FC = () => {
    const [poeSessId, setPoeSessId] = useState<string>("");
    const [accountName, setAccountName] = useState<string>("Rejechted");
    const [league, setLeague] = useState<string>("Betrayal");

    return (
        <HomeContainer> 
            <form>
                <input 
                    type="text" 
                    onChange={e => setPoeSessId(e.target.value)} 
                    placeholder="POE Session Id"
                    required
                />
                <input 
                    type="text" 
                    defaultValue={accountName} 
                    onChange={e => setAccountName(e.target.value)} 
                    placeholder="Account Name" 
                    required
                />
                <input 
                    type="text" 
                    defaultValue={league}
                    onChange={e => setLeague(e.target.value)} 
                    placeholder="League"
                />
            </form>
            <TabSelector poeInfo={{ poeSessId, accountName, league }} />
        </HomeContainer>
    );
}

export default HomePage;
