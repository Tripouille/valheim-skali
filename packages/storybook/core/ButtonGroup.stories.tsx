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
      <Button colorScheme="blue" elementCategories={[]}>
        Save
      </Button>
      <Button elementCategories={[]}>Cancel</Button>
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
      <Button elementCategories={[]}>Save</Button>
      <Button elementCategories={[]}>Cancel</Button>
    </>
  ),
});
