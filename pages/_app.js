function GlobalStyle() {
  return (
    <style global jsx>{`
      @font-face {
        font-family: 'fleshandbloodmedium';
        src: url('/fonts/fleshandblood/fleshandblood-mva5x-webfont.woff2') format('woff2'),
             url('/fonts/fleshandblood/fleshandblood-mva5x-webfont.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        src: url("/fonts/Fleshandblood/Fleshandblood-MVA5x.ttf");
      }

      @font-face {
        font-family: "liberation-serif";
        src: url("https://use.typekit.net/af/e76aaf/000000000000000077359520/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/e76aaf/000000000000000077359520/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/e76aaf/000000000000000077359520/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
        font-display: auto;
        font-style:normal;
        font-weight:400;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'liberation-serif', 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

export default function App({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}