import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { init, registerRemotes } from '@module-federation/runtime';

interface CustomAppProps extends AppProps {
  templateAppUrl: string;
}

function CustomApp({ Component, pageProps, templateAppUrl }: CustomAppProps) {
  return (
    <>
      <Head>
        <title>Welcome to host-app!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
