import { action } from '@storybook/addon-actions';
import Switch, { SwitchProps } from '@packages/components/core/Interactive/Switch';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';

const { defaultExport, StoryFactory } = storybookSetup<SwitchProps>(
  Switch,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
  onChange: action('Changed'),
  colorScheme: 'blue',
  isDisabled: false,
  isFocusable: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  onBlur: action('Blur'),
  onFocus: action('Focus'),
  size: 'md',
});
