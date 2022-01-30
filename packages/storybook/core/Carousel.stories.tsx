import Carousel, { CarouselProps } from '@packages/components/core/Images/Carousel';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<CarouselProps>(Carousel);

export default defaultExport;

const landscapeImage = {
  src: 'https://media.discordapp.net/attachments/894670894012727357/916819870811815946/paysage_gd_nord.png',
  alt: 'A landscape',
};

export const Default = StoryFactory({
  dataCy: '',
  images: [
    { src: '/images/valheim-background-q60.jpg', alt: 'Valheim background' },
    landscapeImage,
  ],
  height: 250,
});

export const WithNoImage = StoryFactory({
  dataCy: '',
  images: [],
  height: 250,
});

export const WithManyImages = StoryFactory({
  dataCy: '',
  images: Array.from(Array(10).keys()).map(i => ({
    ...landscapeImage,
    src: landscapeImage.src + '#'.repeat(i),
  })),
  height: 250,
});
