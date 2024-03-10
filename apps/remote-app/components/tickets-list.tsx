import React from 'react';

export interface TicketsListProps {
  companyName: string;
}

export const TicketsList = ({ companyName }: TicketsListProps) => {
  return <div>Tickets List Page For {companyName}</div>;
};
