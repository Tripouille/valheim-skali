import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import {
  Drawer,
  DrawerProps,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from '@packages/components/core/Drawer';
import Box from '@packages/components/core/Box';
import Button from '@packages/components/core/Button';

const { defaultExport, StoryFactory } = storybookSetup<DrawerProps>(Drawer, {
  decorators: [
    Story => (
      <Box h="800px">
        <Story />
        <Button elementCategories={['drawer-story']}>Test button for focus</Button>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis praesentium voluptatum
          earum dignissimos reprehenderit magnam at asperiores corporis rem eius laudantium
          molestias exercitationem, temporibus, dolor mollitia, quia minus aut unde.
        </p>
      </Box>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({
  isOpen: true,
  autoFocus: true,
  blockScrollOnMount: true,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  isFullHeight: false,
  onClose: action('closed drawer'),
  onEsc: action('pressed ESC'),
  onOverlayClick: action('clicked on overlay'),
  placement: 'right',
  preserveScrollBarGap: false,
  size: 'xs',
  trapFocus: true,
  children: (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <h1>Drawer body</h1>
          <input type="text" style={{ backgroundColor: 'grey' }} />
        </DrawerBody>
        <DrawerFooter>Drawer footer</DrawerFooter>
      </DrawerContent>
    </>
  ),
});
