import { BiChevronDown } from 'react-icons/bi';
import { GiVikingHelmet } from 'react-icons/gi';
import Button from 'components/core/Interactive/Button';
import { MenuItem, MenuItemProps, Menu, MenuButton, MenuList } from 'components/core/Overlay/Menu';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<MenuItemProps>(
  MenuItem,
  StoryCategory.CORE_OVERLAY,
  {
    decorators: [
      Story => (
        <Menu>
          <MenuButton as={Button} rightIcon={<BiChevronDown />}>
            Menu
          </MenuButton>
          <MenuList>
            <Story />
          </MenuList>
        </Menu>
      ),
    ],
  },
  Menu.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  closeOnSelect: true,
  command: 'Ctrl+H',
  commandSpacing: 0,
  iconSpacing: 2,
  isDisabled: false,
  isFocusable: false,
  icon: <GiVikingHelmet />,
  children: 'Item name',
});
