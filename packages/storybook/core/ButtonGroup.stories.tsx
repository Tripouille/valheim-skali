import ButtonGroup, { ButtonGroupProps } from '@packages/components/core/Interactive/ButtonGroup';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Button from '@packages/components/core/Interactive/Button';

const { defaultExport, StoryFactory } = storybookSetup<ButtonGroupProps>(ButtonGroup);

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
