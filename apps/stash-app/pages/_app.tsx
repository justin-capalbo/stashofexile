import App, { Container as NextContainer } from "next/app";
import * as React from "react";
import { NextContext } from "next";
import styled from "@emotion/styled";
import { Footer, Header } from "../components";

const ContainerStyles = styled.div`
	display: flex;
	min-height: 100vh;
	flex-direction: column;
`;

const FlexContent = styled.div`
	flex: 1;
`;

class MyApp extends App {
	public static async getInitialProps({ Component, ctx }: { Component: any, ctx: NextContext }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	public render() {
		const { Component, pageProps } = this.props;
		return (
			<NextContainer>
				<ContainerStyles>
					<Header />
						<FlexContent>
							<Component {...pageProps} />
						</FlexContent>
					<Footer />
				</ContainerStyles>
			</NextContainer>
		);
	}
}

export default MyApp;
