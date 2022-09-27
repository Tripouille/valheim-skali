import { Head, Html, Main, NextScript } from 'next/document';

function GoogleTagManagerNoScript() {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5B8BJ5J"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
      }}
    />
  );
}

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <GoogleTagManagerNoScript />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
