import App, { Container as NextContainer } from "next/app";
import * as React from "react";
import { NextContext } from "next";
import { Footer, Header } from "../components";

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
				<Header />
					<Component {...pageProps} />
				<Footer />
			</NextContainer>
		);
	}
}

export default MyApp;
