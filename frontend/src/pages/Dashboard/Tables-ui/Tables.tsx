import { Table } from "@/components/retroui/Table";
import { invoices } from "../constant_invoices";
import { Badge } from "@/components/retroui/Badge";



export default function Tables() {

    return(

        <>
        {/* First Table */}
  <Table className="max-w-lg mb-6">
    <Table.Header className="bg-yellow-400">
      <Table.Row>
        <Table.Head className="w-[100px]">Invoice</Table.Head>
        <Table.Head>Customer</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head className="text-right">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {invoices.map((invoice) => (
        <Table.Row key={invoice.invoice}>
          <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
          <Table.Cell>{invoice.customer}</Table.Cell>
          <Table.Cell>
            <Badge variant="solid" size="sm">
              {invoice.paymentStatus}
            </Badge>
          </Table.Cell>
          <Table.Cell>{invoice.paymentMethod}</Table.Cell>
          <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={4}>Total</Table.Cell>
        <Table.Cell className="text-right">$2,500.00</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>

  {/* Second Table */}
  <Table className="max-w-lg mb-6">
    <Table.Header className="bg-yellow-400">
      <Table.Row>
        <Table.Head className="w-[100px]">Invoice</Table.Head>
        <Table.Head>Customer</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Method</Table.Head>
        <Table.Head className="text-right">Amount</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {invoices.map((invoice) => (
        <Table.Row key={invoice.invoice + "-second"}>
          <Table.Cell className="font-medium">{invoice.invoice}</Table.Cell>
          <Table.Cell>{invoice.customer}</Table.Cell>
          <Table.Cell>
            <Badge variant="solid" size="sm">
              {invoice.paymentStatus}
            </Badge>
          </Table.Cell>
          <Table.Cell>{invoice.paymentMethod}</Table.Cell>
          <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      <Table.Row>
        <Table.Cell colSpan={4}>Total</Table.Cell>
        <Table.Cell className="text-right">$2,500.00</Table.Cell>
      </Table.Row>
    </Table.Footer>
  </Table>
        </>
    )
}