import React from "react";
import { AccountInfoQuery_getTabs_tabs } from "../models/AccountInfoQuery";
import { PoeInfo } from "../models/globalTypes";

type AccountState = {
    loggedIn: boolean;
    validCredentials: PoeInfo | null;
    tabs: AccountInfoQuery_getTabs_tabs[] | null;
};

type AccountContextProps = {
    poeCreds: PoeInfo;
    tabs: AccountInfoQuery_getTabs_tabs[];
    loggedIn: boolean;
    setLoggedIn: (creds: PoeInfo, tabs: AccountInfoQuery_getTabs_tabs[]) => void;
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

    public setLoggedIn(creds: PoeInfo, tabs: AccountInfoQuery_getTabs_tabs[]) {
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
