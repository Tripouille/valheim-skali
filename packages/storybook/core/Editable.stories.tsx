import { action } from '@storybook/addon-actions';
import Editable, { EditableProps } from '@packages/components/core/Interactive/Editable';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<EditableProps>(Editable);

export default defaultExport;

export const Default = StoryFactory({
  dataCy: '',
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
  value: 'Some text',
});
