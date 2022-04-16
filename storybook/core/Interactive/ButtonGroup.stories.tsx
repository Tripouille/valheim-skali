import ButtonGroup, { ButtonGroupProps } from 'components/core/Interactive/ButtonGroup';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Button from 'components/core/Interactive/Button';

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
      <Button colorScheme="blue" dataCy="">
        Save
      </Button>
      <Button dataCy="">Cancel</Button>
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
      <Button dataCy="">Save</Button>
      <Button dataCy="">Cancel</Button>
    </>
  ),
});
