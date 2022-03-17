import { action } from '@storybook/addon-actions';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Tooltip, { TooltipProps } from '@packages/components/core/Overlay/Tooltip';
import Button from '@packages/components/core/Interactive/Button';

const { defaultExport, StoryFactory } = storybookSetup<TooltipProps>(
  Tooltip,
  StoryCategory.CORE_OVERLAY,
);

export default defaultExport;

export const Default = StoryFactory({
  arrowPadding: 8,
  arrowShadowColor: 'black',
  arrowSize: 10,
  closeDelay: 0,
  closeOnClick: false,
  closeOnMouseDown: false,
  defaultIsOpen: false,
  direction: 'ltr',
  gutter: 8,
  hasArrow: false,
  isDisabled: false,
  label:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur necessitatibus praesentium sit illo animi hic rem rerum do?',
  onClose: action('Close'),
  openDelay: 0,
  placement: 'bottom',
  children: <Button dataCy="">A button</Button>,
});
