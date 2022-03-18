import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import Input from '@packages/components/core/Form/Input';
import FormElement, { FormElementProps } from '@packages/components/core/Form/FormElement';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@packages/components/core/Overlay/Modal';

const { defaultExport, StoryFactory } = storybookSetup<FormElementProps>(
  FormElement,
  StoryCategory.CORE_FORM,
  {
    decorators: [
      Story => (
        <Modal isOpen={true} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Story />
            </ModalBody>
          </ModalContent>
        </Modal>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({
  label: 'Label',
  hint: 'Hint',
  isDisabled: false,
  isInvalid: false,
  isReadOnly: false,
  isRequired: false,
  children: <Input dataCy="" />,
});
