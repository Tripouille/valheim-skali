import { action } from '@storybook/addon-actions';
import Center from 'components/core/Containers/Center';
import Button from 'components/core/Interactive/Button';
import {
  Popover,
  PopoverProps,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from 'components/core/Overlay/Popover';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<PopoverProps>(
  Popover,
  StoryCategory.CORE_OVERLAY,
  {
    decorators: [
      Story => (
        <Center h="300px">
          <Story />
        </Center>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({
  arrowPadding: 8,
  arrowShadowColor: '',
  arrowSize: 8,
  autoFocus: true,
  closeOnBlur: true,
  closeOnEsc: true,
  direction: 'ltr',
  offset: [0, 0],
  onClose: action('Closed'),
  onOpen: action('Opened'),
  openDelay: 0,
  orientation: 'horizontal',
  placement: 'bottom',
  trigger: 'click',
  children: (
    <>
      <PopoverTrigger>
        <Button>Popover triggering button</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Header</PopoverHeader>
        <PopoverBody>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique totam quam dolorem
          deleniti est quaerat? Amet rem et voluptatum quam debitis deleniti iusto! Autem illum,
          ullam recusandae consequuntur rem doloremque?
        </PopoverBody>
        <PopoverFooter>Footer</PopoverFooter>
      </PopoverContent>
    </>
  ),
});
