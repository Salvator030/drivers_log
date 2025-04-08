import { Stack, Table } from "@mantine/core";
import { useAddressTable } from "../../../../../hooks/useAddressTable";
import { NewAddressPopover } from "./NewAddressPopover/NewAddressPopover";
import { useTranslation } from "react-i18next";

export function AddressTable() {
  const tableBody = useAddressTable().tableBody;
  const { t, i18n } = useTranslation();
  return (
    <Stack>
      <Table verticalSpacing="xs" withRowBorders={true} highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t('addressTable.name')}</Table.Th>
            <Table.Th>{t('addressTable.street')}</Table.Th>
            <Table.Th>{t('addressTable.hnr')}.</Table.Th>
            <Table.Th>{t('addressTable.plz')}</Table.Th>
            <Table.Th>{t('addressTable.place')}</Table.Th>
            <Table.Th>{t('addressTable.info')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{tableBody}</Table.Tbody>
      </Table>
      <NewAddressPopover />
    </Stack>
  );
}
