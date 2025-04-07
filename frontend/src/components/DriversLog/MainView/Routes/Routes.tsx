import { Table,Text } from "@mantine/core";

export function Routes(){
    return(
        <><Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th><Text>Id</Text></Table.Th>
                    <Table.Th><Text>Start Adresse</Text></Table.Th>
                    <Table.Th><Text>Ziel Adresse</Text></Table.Th>
                    <Table.Th><Text>Entfernung</Text></Table.Th>
                   
                </Table.Tr>
                </Table.Thead>
            </Table>
          

            </>
    )
}