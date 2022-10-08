import Button from 'components/core/Interactive/Button';
import ButtonGroup, { ButtonGroupProps } from 'components/core/Interactive/ButtonGroup';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<ButtonGroupProps>(
  ButtonGroup,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  isAttached: false,
  isDisabled: false,
  spacing: '0.5rem',
  children: (
    <>
      <Button colorScheme="blue">Save</Button>
      <Button>Cancel</Button>
    </>
  ),
});

export const FlushedTogether = StoryFactory({
  isAttached: true,
  isDisabled: false,
  spacing: '0.5rem',
  variant: 'outline',
  children: (
    <>
      <Button>Save</Button>
      <Button>Cancel</Button>
    </>
  ),
});
