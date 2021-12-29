import { Box } from '@chakra-ui/react';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import ImageModal, { ImageModalProps } from '@packages/components/core/ImageModal';

const { defaultExport, StoryFactory } = storybookSetup<ImageModalProps>(ImageModal, {
  decorators: [
    Story => (
      <Box h="300px">
        <Story />
      </Box>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({
  imageAttributes: { src: '/images/valheim-background.png', alt: 'Alt' },
} as ImageModalProps);
