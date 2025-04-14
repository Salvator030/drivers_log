import { px, rem, Table, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { JSX } from "react";

interface RoutesTableProbs {

tableBody: JSX.Element[]
}

export function RoutesTable(probs: RoutesTableProbs) {



  const emtyTable = 
      <Table.Tr>
      <Table.Td colSpan={4} ta="center" c="dimmed">
          No routes found
      </Table.Td>
      </Table.Tr>
  
    ;
  
   const { t, i18n } = useTranslation();
  return (
    <div style={{ flex: 1, maxHeight: px(300), maxWidth: px(500) }}>
      <Table.ScrollContainer minWidth={rem('50%')} type="native" mah={260} >
        <Table withTableBorder withColumnBorders highlightOnHover  stickyHeader >
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
              <Table.Th>
               
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {probs.tableBody.length === 0 ? emtyTable : probs.tableBody}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>

  );
}
