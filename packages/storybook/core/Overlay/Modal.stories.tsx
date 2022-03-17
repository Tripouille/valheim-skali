import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import {
  Modal,
  ModalProps,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from '@packages/components/core/Overlay/Modal';
import Box from '@packages/components/core/Containers/Box';
import Button from '@packages/components/core/Interactive/Button';
import Text from '@packages/components/core/Typography/Text';

const { defaultExport, StoryFactory } = storybookSetup<ModalProps>(
  Modal,
  StoryCategory.CORE_OVERLAY,
  {
    decorators: [
      Story => (
        <Box h="800px">
          <Story />
          <Button dataCy="">Test button for focus</Button>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis praesentium voluptatum
            earum dignissimos reprehenderit magnam at asperiores corporis rem eius laudantium
            molestias exercitationem, temporibus, dolor mollitia, quia minus aut unde.
          </p>
        </Box>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({
  isOpen: true,
  autoFocus: true,
  blockScrollOnMount: true,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  isCentered: false,
  motionPreset: 'scale',
  onClose: action('closed'),
  onEsc: action('ESC pressed'),
  onOverlayClick: action('overlay clicked'),
  preserveScrollBarGap: false,
  scrollBehavior: 'outside',
  size: 'md',
  trapFocus: true,
  children: (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton dataCy="" />
        <ModalBody>
          <h1>Modal body</h1>
          <Text mt="3" mb="3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi architecto
            voluptatibus facilis iusto similique natus. Iure illum iste laudantium modi iusto?
            Commodi minus inventore nulla laboriosam? Repudiandae debitis iusto dolores! Quibusdam
            dolorum cumque maiores veritatis ex itaque nesciunt quis nostrum?
          </Text>
          <Text mb="3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi architecto
            voluptatibus facilis iusto similique natus. Iure illum iste laudantium modi iusto?
            Commodi minus inventore nulla laboriosam? Repudiandae debitis iusto dolores! Quibusdam
            dolorum cumque maiores veritatis ex itaque nesciunt quis nostrum?
          </Text>
          <input type="text" style={{ backgroundColor: 'grey' }} />
        </ModalBody>
      </ModalContent>
    </>
  ),
});
