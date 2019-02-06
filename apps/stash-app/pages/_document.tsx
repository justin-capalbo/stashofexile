import Document, { Head, Main, NextScript, NextDocumentContext } from "next/document";
import { extractCritical } from "emotion-server";

type Props = {
    css: string;
};

export default class MyDocument extends Document<Props> {
    public static async getInitialProps(ctx: NextDocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const page = ctx.renderPage();
        const styles = extractCritical(page.html);
        return { ...initialProps, ...page, ...styles };
    }

    public render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
                    <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}
