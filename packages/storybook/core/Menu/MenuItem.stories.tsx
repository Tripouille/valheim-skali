import { GiVikingHelmet } from 'react-icons/gi';
import { BiChevronDown } from 'react-icons/bi';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import { StoryCategory } from '@packages/utils/constants';
import {
  MenuItem,
  MenuItemProps,
  Menu,
  MenuButton,
  MenuList,
} from '@packages/components/core/Overlay/Menu';
import Button from '@packages/components/core/Interactive/Button';

const { defaultExport, StoryFactory } = storybookSetup<MenuItemProps>(
  MenuItem,
  {
    decorators: [
      Story => (
        <Menu>
          <MenuButton dataCy="" as={Button} rightIcon={<BiChevronDown />}>
            Menu
          </MenuButton>
          <MenuList>
            <Story />
          </MenuList>
        </Menu>
      ),
    ],
  },
  StoryCategory.CORE,
  Menu.displayName,
);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  closeOnSelect: true,
  command: 'Ctrl+H',
  commandSpacing: 0,
  iconSpacing: 2,
  isDisabled: false,
  isFocusable: false,
  icon: <GiVikingHelmet />,
  children: 'Item name',
});
