import { StackDivider } from '@chakra-ui/react';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Box from '@packages/components/core/Containers/Box';
import { Stack, StackProps } from '@packages/components/core/Containers/Stack';

const { defaultExport, StoryFactory } = storybookSetup<StackProps>(
  Stack,
  StoryCategory.CORE_CONTAINERS,
  {},
  Stack.displayName,
);

export default defaultExport;

const baseProperties: StackProps = {
  align: 'center',
  direction: 'row',
  isInline: false,
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
