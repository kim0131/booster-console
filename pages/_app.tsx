import "@public/fonts/spoqahansansneo.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Global, ThemeProvider } from "@emotion/react";
import theme from "@components/styles/theme";
import global from "@components/styles/global";
import { MordalPortal, ToastPortal } from "@components/templates/portal";
import useToast from "@core/hook/use-toast";
import Header from "@components/templates/header";

import SideBar from "@components/templates/sidebar";
import styled from "@emotion/styled";

const Flex = styled.div`
  display: flex;
  justify-content: center;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const { message } = useToast();
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
