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
                <Head>
                    {CssBaseline.flush()}
                    <meta name="facebook-domain-verification" content="7f2cw67reip9k4asxormejzi0vkh1p" />
                    <script src="/js/pixel.js"></script>
                    <meta name="ahrefs-site-verification" content="8fedb0969abe40ef3a34473d8ad8db2fc4ef640626a4cb3c581533764b3bad57"></meta>
                    <link rel="canonical" href={window.location.href} />
                </Head>
                <script src='/js/jquery-3.3.1.min.js' />
                <script type="application/javascript" crossOrigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_MID}.js`}> </script>
                {/* <script src="//code.tidio.co/5zzfp9wo8jthjunqp8zodiz3lw5mqqv4.js" async></script> */}
                <script async src="https://www.googletagmanager.com/gtag/js?id=UA-179635883-1"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-610455455"></script>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-6G0X6LY5BT"></script>
                <body>
                    <Main />
                    <NextScript />
                </body>
                <script src="/js/main.js" />
                <noscript><img height="1" width="1" style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=495640675103737&ev=PageView&noscript=1"
                /></noscript>
            </Html>
        );
    }
}

export default MyDocument;
