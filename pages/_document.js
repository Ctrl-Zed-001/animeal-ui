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
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <script type="application/javascript" crossorigin="anonymous" src=" https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/MFnAiE15203301692155.js"> </script>
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
