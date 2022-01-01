import ZoomableImage, { ZoomableImageProps } from '@packages/components/core/ZoomableImage';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<ZoomableImageProps>(ZoomableImage);

export default defaultExport;

export const Default = StoryFactory({
  width: 400,
  height: 200,
  imageAttributes: { src: '/images/valheim-background.png', alt: 'Alt' },
});
