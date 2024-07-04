import axiosClient from "@/helper/call-center";
import store from "@/redux/store";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { SnackbarProvider } from "notistack";
import { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

interface IGlobalProvider {
  children: ReactNode | ReactElement | JSX.Element;
}

export const GlobalProvider = (props: IGlobalProvider) => {
  const { children } = props;

  const emotionCache = createCache({ key: "css" });
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axiosClient.get(url),
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
        </CacheProvider>
      </Provider>
    </SWRConfig>
  );
};
