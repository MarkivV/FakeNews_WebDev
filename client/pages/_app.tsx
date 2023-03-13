import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from "../layouts/Layout";
import {SessionProvider} from "next-auth/react";
import { Analytics } from '@vercel/analytics/react';
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
          <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Layout>
              <Component {...pageProps} />
              <Analytics/>
          </Layout>
      </SessionProvider>
  )
}
