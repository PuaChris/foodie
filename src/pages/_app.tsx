import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head'

import '@fortawesome/fontawesome-free/css/all.css';

import '../styles/global.scss';
import 'semantic-ui-css/semantic.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far);

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        {/* Adding titles to the tab */}
        <meta charSet="utf-8"/>
        <title>foodie.io | Restaurants near me</title>
      </Head>

      <Component {...pageProps} />
    </>);
}

export default MyApp;
