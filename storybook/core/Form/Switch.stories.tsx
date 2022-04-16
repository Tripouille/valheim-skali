import { action } from '@storybook/addon-actions';
import Switch, { SwitchProps } from 'components/core/Form/Switch';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';

const { defaultExport, StoryFactory } = storybookSetup<SwitchProps>(
  Switch,
  StoryCategory.CORE_FORM,
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
