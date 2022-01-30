import { Box } from '@chakra-ui/react';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import ImageModal, { ImageModalProps } from '@packages/components/core/ImageModal';

const { defaultExport, StoryFactory } = storybookSetup<ImageModalProps>(ImageModal, {
  decorators: [
    Story => (
      <Box h="500px">
        <Story />
      </Box>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({
  elementCategories: [],
  src: '/images/valheim-background-q60.jpg',
  alt: 'Valheim background',
  onClick: () => undefined,
} as ImageModalProps);
