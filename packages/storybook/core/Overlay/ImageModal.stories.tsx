import { action } from '@storybook/addon-actions';
import { Box } from '@chakra-ui/react';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';
import ImageModal, { ImageModalProps } from '@packages/components/core/Overlay/ImageModal';

const { defaultExport, StoryFactory } = storybookSetup<ImageModalProps>(
  ImageModal,
  StoryCategory.CORE_OVERLAY,
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
  dataCy: '',
  src: '/images/valheim-background-q60.jpg',
  alt: 'Valheim background',
  onClick: action('clicked'),
} as ImageModalProps);
