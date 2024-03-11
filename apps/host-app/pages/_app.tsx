import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';

interface CustomAppProps extends AppProps {
  templateAppUrl: string;
}

function CustomApp({ Component, pageProps, templateAppUrl }: CustomAppProps) {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.templateAppUrl = templateAppUrl;
  }

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

CustomApp.getInitialProps = async () => {
  return {
    templateAppUrl: '//localhost:3002',
  };
};

export default CustomApp;
