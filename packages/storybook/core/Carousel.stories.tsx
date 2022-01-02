import Carousel, { CarouselProps } from '@packages/components/core/Carousel';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<CarouselProps>(Carousel);

export default defaultExport;

const landscapeImage = {
  src: 'https://media.discordapp.net/attachments/894670894012727357/916819870811815946/paysage_gd_nord.png',
  alt: 'A landscape',
};

export const Default = StoryFactory({
  images: [{ src: '/images/valheim-background.png', alt: 'Valheim background' }, landscapeImage],
  height: 250,
});

export const WithNoImage = StoryFactory({
  images: [],
  height: 250,
});

export const WithManyImages = StoryFactory({
  images: [
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
    landscapeImage,
  ],
  height: 250,
});
