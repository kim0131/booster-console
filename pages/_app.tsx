import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";
import { MordalPortal, ToastPortal } from "@components/templates/portal";
import useToast from "@core/hook/use-toast";
import Header from "@components/templates/header";

import SideBar from "@components/templates/sidebar";
import styled from "@emotion/styled";
import { useEffect } from "react";
import * as gtag from "../lib/gtag";
import { useRouter } from "next/router";
const isProduction = process.env.NODE_ENV === "production";
const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const { message } = useToast();
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <Global styles={global} />
        <Header />
        <Flex>
          <SideBar />
          <Component {...pageProps} />
        </Flex>

        <div>{message}</div>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MyApp;
