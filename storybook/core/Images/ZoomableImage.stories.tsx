import Box from 'components/core/Containers/Box';
import ZoomableImage, { ZoomableImageProps } from 'components/core/Images/ZoomableImage';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<ZoomableImageProps>(
  ZoomableImage,
  StoryCategory.CORE_IMAGES,
  {
    decorators: [
      Story => (
        <Box h="500px">
          <Story />
        </Box>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({
  'data-cy': '',
  src: '/images/valheim-background-q60.jpg',
  alt: 'Alt',
  width: 400,
  height: 200,
});
