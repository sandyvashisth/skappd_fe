import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import theme from "src/theme";
import { AuthProvider } from "context/AuthContext";
import { ProtectRoute } from "context/auth";
import { ToastProvider } from "use-toast-mui";
import styled from "@emotion/styled";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const StyledToastProvider = styled(ToastProvider)`
  left: 0;
`;

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthProvider>
          <StyledToastProvider>
            {/* <ProtectRoute router={router}> */}
            <Component {...pageProps} />
            {/* </ProtectRoute> */}
          </StyledToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
