import { action } from '@storybook/addon-actions';
import Box from 'components/core/Containers/Box';
import ImageModal, { ImageModalProps } from 'components/core/Overlay/ImageModal';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

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
  'data-cy': '',
  src: '/images/valheim-background-q60.jpg',
  alt: 'Valheim background',
  onClose: action('closed'),
} as ImageModalProps);
