import React, { Fragment } from 'react';
import { data, FinancialData } from './sampleData';
import { levels } from './levels';
import { Card, Table, Text, Title } from '@mantine/core';

type Props = {
  companyId: string;
};

export function BalanceSheet({ companyId }: Props) {
  return (
    <div className="p-8">
      <Card bg={'#fff'}>
      <Title ta={'center'} order={3}>
        Balance Sheet
      </Title>
      <br />
      <Table p={16} withColumnBorders withRowBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th colSpan={4}>Description</Table.Th>
            <Table.Th colSpan={4}>2024-2025</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>
          {levels.map((level1) => (
            <Fragment>
              <Table.Tr>
                <Table.Td colSpan={4} style={{ fontWeight: 'bold' }}>
                  <Title order={5}>
                    {level1.id} - {level1.description}
                  </Title>
                </Table.Td>
                <Table.Td>0</Table.Td>
              </Table.Tr>
              {level1.children.map((level2) => (
                <Fragment>
                  <Table.Tr>
                    <Table.Td colSpan={4}>
                      <Text py={10} px={10} size="xl">
                        {level2.id} - {level2.description}
                      </Text>
                    </Table.Td>
                    <Table.Td>0</Table.Td>
                  </Table.Tr>
                  {level2.children.map((level3) => (
                    <Fragment>
                      <Table.Tr>
                        <Table.Td colSpan={4}>
                          <Text py={10} px={20} c="black">
                            {level3.id} - {level3.description}
                          </Text>
                        </Table.Td>
                        <Table.Td>0</Table.Td>
                      </Table.Tr>
                      {level3.children.map((level4) => (
                        <Table.Tr>
                          <Table.Td colSpan={4}>
                            <Text size="xs" py={10} px={30} c="#444" fw={600}>
                              {level4.id} - {level4.description}
                            </Text>
                          </Table.Td>
                          <Table.Td>0</Table.Td>
                        </Table.Tr>
                      ))}
                    </Fragment>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </tbody>
      </Table>
      </Card>
    </div>
  );
}
