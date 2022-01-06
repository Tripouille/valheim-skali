import { Box } from '@chakra-ui/react';
import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/ZoomableImage';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<ZoomableImageProps>(ZoomableImage, {
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
  src: '/images/valheim-background.png',
  alt: 'Alt',
  width: 400,
  height: 200,
});
