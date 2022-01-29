import { StackDivider } from '@chakra-ui/react';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import Box from '@packages/components/core/Box';
import { Stack, VStack, StackProps } from '@packages/components/core/Stack';

const { defaultExport, StoryFactory } = storybookSetup<StackProps>(
  VStack,
  {},
  StoryCategory.CORE,
  Stack.displayName,
);

export default defaultExport;

const baseProperties: StackProps = {
  align: 'center',
  direction: 'row',
  justify: '',
  shouldWrapChildren: true,
  spacing: '2',
  wrap: 'initial',
  children: [
    { content: 1, color: 'yellow.700' },
    { content: 2, color: 'gray.600' },
    { content: 3, color: 'pink.700' },
  ].map(box => (
    <Box key={box.content} w="40px" h="40px" bg={box.color}>
      {box.content}
    </Box>
  )),
};

export const Default = StoryFactory(baseProperties);

export const WithDivider = StoryFactory({
  ...baseProperties,
  divider: <StackDivider />,
  spacing: '4',
});
