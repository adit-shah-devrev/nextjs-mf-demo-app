// import { revalidate } from '@module-federation/nextjs-mf/utils';
import dynamic from 'next/dynamic';
import React from 'react';

// import { Directories as DirectoriesMF } from '@mf-types/template-app/directories';

const DirectoriesRemote = dynamic(
  () => import('template-app/directories').then((mod) => mod.Directories),
  {
    ssr: false,
  }
);

// export async function getServerSideProps({ res, req }) {
//   //can be a common function
//   if (process.env.NODE_ENV === 'development' && !req.url.includes('_next')) {
//     await revalidate().then((shouldReload) => {
//       if (shouldReload) {
//         res.writeHead(302, { Location: req.url });
//         res.end();
//       }
//     });
//   } else {
//     res?.on('finish', () => {
//       revalidate();
//     });
//   }

//   return {
//     props: {},
//   };
// }

export default function Directories() {
  return (
    <div>
      <DirectoriesRemote />
    </div>
  );
}
