import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: <>{initialProps.styles}</>
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>{CssBaseline.flush()}</Head>
                <script src='/js/jquery-3.3.1.min.js' />
                <script type="application/javascript" crossOrigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}> </script>
                <script src="//code.tidio.co/5zzfp9wo8jthjunqp8zodiz3lw5mqqv4.js" async></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-179635883-1"></script>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="/js/main.js" />
            </Html>
        );
    }
}

export default MyDocument;
