import { Box } from '@chakra-ui/react';
import Figure, { FigureProps } from '@packages/components/core/Figure';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<FigureProps>(Figure, {
  decorators: [
    Story => (
      <Box maxH="100px" maxW="100px" minH="100px" minW="100px">
        <Story height="200px" maxW="550px" />
      </Box>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({
  src: '/images/valheim-background.png',
  alt: 'Valheim background',
  legend: 'A legend',
});
