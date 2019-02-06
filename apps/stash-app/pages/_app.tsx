import App, { Container as NextContainer } from "next/app";
import * as React from "react";
import { NextContext } from "next";
import styled from "@emotion/styled";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-boost";
import { withApollo } from "../lib";
import { Footer, Header } from "../shared-components";

type Props = {
    apollo: ApolloClient<any>;
};

const ContainerStyles = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

const FlexContent = styled.div`
	flex: 1;
`;

class MyApp extends App<Props> {
    public static async getInitialProps({ Component, ctx }: { Component: any, ctx: NextContext }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
    }

    public render() {
        const { Component, apollo, pageProps } = this.props;
        return (
            <NextContainer>
                <ApolloProvider client={apollo}>
                    <ContainerStyles>
                        <Header />
                        <FlexContent>
                            <Component {...pageProps} />
                        </FlexContent>
                        <Footer />
                    </ContainerStyles>
                </ApolloProvider>
            </NextContainer>
        );
    }
}

export default withApollo(MyApp);
