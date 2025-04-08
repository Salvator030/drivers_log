import { px, rem, Table, Text } from "@mantine/core";
import { useRouteTable } from "../../../../../hooks/useRouteTable";
import { useTranslation } from "react-i18next";

export function RoutesTable() {
  const { tableBody, emtyTable } = useRouteTable();
   const { t, i18n } = useTranslation();
  return (
    <div style={{ flex: 1, minHeight: rem(300), maxWidth: rem(500) }}>
      <Table.ScrollContainer minWidth={400} type="native" h="100%">
        <Table withColumnBorders >
          <Table.Thead>
            <Table.Tr>
              <Table.Th >
                <Text>{t('routesTable.startAddress')}</Text>
              </Table.Th>
              <Table.Th>
                <Text>{t('routesTable.endAddress')}</Text>
              </Table.Th>
              <Table.Th>
                <Text>{t('routesTable.distance')}</Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableBody.length === 0 ? emtyTable : tableBody}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}
