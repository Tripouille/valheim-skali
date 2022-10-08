import Carousel, { CarouselProps } from 'components/core/Images/Carousel';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<CarouselProps>(
  Carousel,
  StoryCategory.CORE_IMAGES,
);

export default defaultExport;

const landscapeImage = {
  src: 'https://media.discordapp.net/attachments/894670894012727357/916819870811815946/paysage_gd_nord.png',
  alt: 'A landscape',
};

export const Default = StoryFactory({
  'data-cy': '',
  images: [
    { src: '/images/valheim-background-q60.jpg', alt: 'Valheim background' },
    landscapeImage,
  ],
  height: 250,
});

export const WithNoImage = StoryFactory({
  'data-cy': '',
  images: [],
  height: 250,
});

export const WithManyImages = StoryFactory({
  'data-cy': '',
  images: Array.from(Array(10).keys()).map(i => ({
    ...landscapeImage,
    src: landscapeImage.src + '#'.repeat(i),
  })),
  height: 250,
});
