import { AppPropsWithLayout } from "@/interface";
import { GlobalProvider } from "@/provider";
import "@/translate";
import "@/styles/globals.scss";

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout;

  if (Layout) {
    return (
      <GlobalProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  } else {
    return (
      <GlobalProvider>
        <Component {...pageProps} />
      </GlobalProvider>
    );
  }
}
