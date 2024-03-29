import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return(
        <Html lang='en'>
            <Head>
                <meta name="description" content="Levi Terry's Developer Portfolio" />
                <meta property="og:description" content="Levi Terry's Developer Portfolio" />
                <meta property='og:url' content="https://leviterry.dev"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}