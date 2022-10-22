import { action } from '@storybook/addon-actions';
import Switch, { SwitchProps } from 'components/core/Form/Switch';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<SwitchProps>(
  Switch,
  StoryCategory.CORE_FORM,
);

export default defaultExport;

export const Default = StoryFactory({
  'data-cy': '',
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
