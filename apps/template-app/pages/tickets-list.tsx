import { revalidate } from '@module-federation/nextjs-mf/utils';
import dynamic from 'next/dynamic';
import React from 'react';
import { TicketsList as TicketsListMF } from '@mf-types/remote-app/tickets-list';

const TicketsListRemote = dynamic(
  () => import('remote-app/tickets-list').then((mod) => mod.TicketsList),
  {
    ssr: true,
  }
) as typeof TicketsListMF;

export async function getServerSideProps({ res, req }) {
  //can be a common function
  if (process.env.NODE_ENV === 'development' && !req.url.includes('_next')) {
    await revalidate().then((shouldReload) => {
      if (shouldReload) {
        res.writeHead(302, { Location: req.url });
        res.end();
      }
    });
  } else {
    res?.on('finish', () => {
      revalidate();
    });
  }

  return {
    props: {},
  };
}

export const TicketsList = () => {
  return (
    <div>
      This is Template App
      <TicketsListRemote companyName="DevRev" />
    </div>
  );
};

export default TicketsList;
