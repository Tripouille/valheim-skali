import { action } from '@storybook/addon-actions';
import Editable, { EditableProps } from 'components/core/Interactive/Editable';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';

const { defaultExport, StoryFactory } = storybookSetup<EditableProps>(
  Editable,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  defaultValue: 'Some text',
  isDisabled: false,
  isPreviewFocusable: true,
  onCancel: action('cancel'),
  onChange: action('change'),
  onEdit: action('edit'),
  onSubmit: action('submit'),
  placeholder: '',
  selectAllOnFocus: true,
  startWithEditView: false,
  submitOnBlur: true,
  initialValue: 'Some text',
});
