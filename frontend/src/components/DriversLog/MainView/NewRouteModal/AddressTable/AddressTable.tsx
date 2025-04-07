import { Stack, Table } from "@mantine/core";
import { useAddressTable } from "../../../../../hooks/useAddressTable";
import { NewAddressPopover } from "./NewAddressPopover/NewAddressPopover";

export function AddressTable() {
  const tableBody = useAddressTable().tableBody;

  return (
    <Stack>
      <Table verticalSpacing="xs" withRowBorders={true} highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Starße</Table.Th>
            <Table.Th>Hnr.</Table.Th>
            <Table.Th>PLZ</Table.Th>
            <Table.Th>Ort</Table.Th>
            <Table.Th>Info</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableBody}</Table.Tbody>
      </Table>
      <NewAddressPopover />
    </Stack>
  );
}
