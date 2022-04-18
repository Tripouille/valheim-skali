import { action } from '@storybook/addon-actions';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from 'components/core/Overlay/Menu';
import IconButton from 'components/core/Interactive/IconButton';
import Button from 'components/core/Interactive/Button';

const { defaultExport, StoryFactory } = storybookSetup<MenuProps>(
  Menu,
  StoryCategory.CORE_OVERLAY,
  {},
  Menu.displayName,
);

export default defaultExport;

const baseProperties: MenuProps = {
  arrowPadding: 8,
  autoSelect: true,
  closeOnBlur: true,
  closeOnSelect: true,
  eventListeners: { scroll: false, resize: false },
  flip: true,
  gutter: 8,
  id: 'menu-id',
  onClose: action('closed'),
  onOpen: action('opened'),
  placement: 'bottom',
  preventOverflow: true,
  strategy: 'absolute',
  children: (
    <>
      <MenuButton
        as={IconButton}
        variant="ghost"
        icon={<GiVikingHelmet />}
        rightIcon={<BiChevronDown />}
        aria-label="Open menu"
      />
      <MenuList>
        <MenuItem icon={<GiVikingHelmet />}>Item 1</MenuItem>
        <MenuDivider />
        <MenuItem>Item 2</MenuItem>
      </MenuList>
    </>
  ),
};

export const Default = StoryFactory(baseProperties);

export const WithOverflowingMenu = StoryFactory({
  ...baseProperties,
  children: (
    <>
      <MenuButton as={Button} rightIcon={<BiChevronDown />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
        <MenuItem>Item 4</MenuItem>
        <MenuItem>Item 5</MenuItem>
        <MenuItem>Item 6</MenuItem>
        <MenuItem>Item 7</MenuItem>
        <MenuItem>Item 8</MenuItem>
        <MenuItem>Item 9</MenuItem>
        <MenuItem>Item 10</MenuItem>
      </MenuList>
    </>
  ),
});
