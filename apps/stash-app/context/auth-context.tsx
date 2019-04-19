import React from "react";

type PoeCreds = {
    poeSessId: string;
    accountName: string;
    league: string;
};

type AuthState = {
    validCredentials: PoeCreds | null;
};

type AuthContextProps = {
    poeCreds: PoeCreds;
    setLoggedIn: (creds: PoeCreds) => void;
};

const AuthContext = React.createContext<AuthContextProps>(null!);
export class AuthProvider extends React.Component<{}, AuthState> {
    public state: AuthState = {
        validCredentials: null,
    };

    public setLoggedIn(creds: PoeCreds) {
        this.setState({
            validCredentials: { ...creds },
        });
    }

    public render() {
        return (
            <AuthContext.Provider value={{
                poeCreds: this.state.validCredentials,
                setLoggedIn: this.setLoggedIn,
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
