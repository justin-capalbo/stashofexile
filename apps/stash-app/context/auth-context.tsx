import React from "react";

type PoeCreds = {
    poeSessId: string;
    accountName: string;
    league: string;
};

type AuthState = {
    loggedIn: boolean;
    validCredentials: PoeCreds | null;
};

type AuthContextProps = {
    poeCreds: PoeCreds;
    loggedIn: boolean;
    setLoggedIn: (creds: PoeCreds) => void;
};

export const AuthContext = React.createContext<AuthContextProps>(null!);
export class AuthProvider extends React.Component<{}, AuthState> {
    public state: AuthState = {
        validCredentials: null,
        loggedIn: false,
    };

    constructor(props: AuthContextProps) {
        super(props);
        this.setLoggedIn = this.setLoggedIn.bind(this);
    }

    public setLoggedIn(creds: PoeCreds) {
        this.setState({
            loggedIn: true,
            validCredentials: { ...creds },
        });
    }

    public render() {
        return (
            <AuthContext.Provider value={{
                poeCreds: this.state.validCredentials,
                loggedIn: this.state.loggedIn,
                setLoggedIn: this.setLoggedIn,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
