import { revalidate } from '@module-federation/nextjs-mf/utils';
import React, { Suspense, lazy } from 'react';
import { registerRemotes, loadRemote } from '@module-federation/runtime';

export async function getServerSideProps({ res, req }) {
  //can be a common function
  // if (process.env.NODE_ENV === 'development' && !req.url.includes('_next')) {
  //   await revalidate().then((shouldReload) => {
  //     if (shouldReload) {
  //       res.writeHead(302, { Location: req.url });
  //       res.end();
  //     }
  //   });
  // } else {
  //   res?.on('finish', () => {
  //     revalidate();
  //   });
  // }

  registerRemotes([
    {
      name: 'template-app',
      entry: 'http://localhost:3002/_next/static/ssr/remoteEntry.js',
    },
  ]);

  return {
    props: {},
  };
}

export default function Directories() {
  if (typeof window !== 'undefined') {
    registerRemotes([
      {
        name: 'template-app',
        entry: 'http://localhost:3002/_next/static/chunks/remoteEntry.js',
      },
    ]);
  }

  const DirectoriesRemote = lazy(() => loadRemote('template-app/directories'));

  return (
    <div>
      <Suspense>
        <DirectoriesRemote />
      </Suspense>
    </div>
  );
}
