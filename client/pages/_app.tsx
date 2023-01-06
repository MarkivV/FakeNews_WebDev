import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import {SessionProvider, useSession} from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </SessionProvider>
  )
}
