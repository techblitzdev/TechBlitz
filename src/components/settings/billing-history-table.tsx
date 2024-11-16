import Stripe from 'stripe';
import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function BillingHistoryTable({
  invoices,
}: {
  invoices: Stripe.Invoice[];
}) {
  // Convert the invoices into something we can iterate over
  const invoiceData = invoices.map((invoice) => {
    return {
      id: invoice.id,
      date: new Date(invoice.created * 1000),
      amount: invoice.total / 100, // Convert cents to dollars
      status: invoice.status,
    };
  });

  // Calculate total amount
  const totalAmount = invoiceData.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );

  return (
    <Table>
      <TableHeader className="divide-black-50">
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoiceData.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{format(invoice.date, 'MMM d, yyyy')}</TableCell>
            <TableCell>£{invoice.amount.toFixed(2)}</TableCell>
            <TableCell className="capitalize">{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">
            ${totalAmount.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
