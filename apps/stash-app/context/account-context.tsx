import React from "react";
import { AccountInfoQuery_getTabs_tabs } from "../models/AccountInfoQuery";

type PoeCreds = {
    poeSessId: string;
    accountName: string;
    league: string;
};

type AccountState = {
    loggedIn: boolean;
    validCredentials: PoeCreds | null;
    tabs: AccountInfoQuery_getTabs_tabs[] | null;
};

type AccountContextProps = {
    poeCreds: PoeCreds;
    tabs: AccountInfoQuery_getTabs_tabs[];
    loggedIn: boolean;
    setLoggedIn: (creds: PoeCreds, tabs: AccountInfoQuery_getTabs_tabs[]) => void;
};

export const AccountContext = React.createContext<AccountContextProps>(null!);
export class AccountProvider extends React.Component<{}, AccountState> {
    public state: AccountState = {
        loggedIn: false,
        validCredentials: null,
        tabs: null,
    };

    constructor(props: AccountContextProps) {
        super(props);
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    public setLoggedIn(creds: PoeCreds, tabs: AccountInfoQuery_getTabs_tabs[]) {
        this.setState({
            loggedIn: true,
            validCredentials: { ...creds },
            tabs,
        });
    }

    public render() {
        return (
            <AccountContext.Provider value={{
                poeCreds: this.state.validCredentials,
                loggedIn: this.state.loggedIn,
                tabs: this.state.tabs,
                setLoggedIn: this.setLoggedIn,
            }}>
                {this.props.children}
            </AccountContext.Provider>
        );
    }
}
