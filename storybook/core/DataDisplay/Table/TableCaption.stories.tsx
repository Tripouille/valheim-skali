import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import {
  TableCaption,
  TableCaptionProps,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
} from 'components/core/DataDisplay/Table';

const { defaultExport, StoryFactory } = storybookSetup<TableCaptionProps>(
  TableCaption,
  StoryCategory.CORE_DATA_DISPLAY,
  {
    decorators: [
      Story => (
        <Table>
          <Story />
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      ),
    ],
  },
  Table.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  placement: 'bottom',
  children: 'Imperial to metric conversion factors',
});
