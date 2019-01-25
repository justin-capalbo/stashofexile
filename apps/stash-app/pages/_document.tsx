import Document, { Head, Main, NextScript, NextDocumentContext } from "next/document";

export default class MyDocument extends Document {
	public static async getInitialProps(ctx: NextDocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	public render() {
		return (
			<html>
				<Head>
					<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
