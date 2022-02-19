import { action } from '@storybook/addon-actions';
import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import {
  Menu,
  MenuProps,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@packages/components/core/Overlay/Menu';
import IconButton from '@packages/components/core/Interactive/IconButton';
import Button from '@packages/components/core/Interactive/Button';

const { defaultExport, StoryFactory } = storybookSetup<MenuProps>(
  Menu,
  {},
  StoryCategory.CORE,
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
        dataCy=""
        as={IconButton}
        variant="ghost"
        icon={<GiVikingHelmet />}
        rightIcon={<BiChevronDown />}
        aria-label="Open menu"
      />
      <MenuList>
        <MenuItem dataCy="" icon={<GiVikingHelmet />}>
          Item 1
        </MenuItem>
        <MenuDivider />
        <MenuItem dataCy="">Item 2</MenuItem>
      </MenuList>
    </>
  ),
};

export const Default = StoryFactory(baseProperties);

export const WithOverflowingMenu = StoryFactory({
  ...baseProperties,
  children: (
    <>
      <MenuButton dataCy="" as={Button} rightIcon={<BiChevronDown />}>
        Menu
      </MenuButton>
      <MenuList>
        <MenuItem dataCy="">Item 1</MenuItem>
        <MenuItem dataCy="">Item 2</MenuItem>
        <MenuItem dataCy="">Item 3</MenuItem>
        <MenuItem dataCy="">Item 4</MenuItem>
        <MenuItem dataCy="">Item 5</MenuItem>
        <MenuItem dataCy="">Item 6</MenuItem>
        <MenuItem dataCy="">Item 7</MenuItem>
        <MenuItem dataCy="">Item 8</MenuItem>
        <MenuItem dataCy="">Item 9</MenuItem>
        <MenuItem dataCy="">Item 10</MenuItem>
      </MenuList>
    </>
  ),
});
