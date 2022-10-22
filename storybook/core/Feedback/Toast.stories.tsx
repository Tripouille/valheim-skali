import { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { HStack } from 'components/core/Containers/Stack';
import Toast, { ToastProps } from 'components/core/Feedback/Toast';
import Input from 'components/core/Form/Input';
import Button from 'components/core/Interactive/Button';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';
import { displayErrorToast, displaySuccessToast } from 'utils/toast';

const { defaultExport } = storybookSetup<ToastProps>(Toast, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default: ComponentStory<typeof Toast> = () => {
  const [title, setTitle] = useState('Toast title');
  const [description, setDescription] = useState('');

  return (
    <HStack>
      <Input placeholder="Toast title" value={title} onChange={setTitle} w="300px" />
      <Input
        placeholder="Toast description"
        value={description}
        onChange={setDescription}
        w="300px"
      />
      <Button colorScheme="red" onClick={() => displayErrorToast({ title, description })}>
        Create error toast
      </Button>
      <Button colorScheme="green" onClick={() => displaySuccessToast({ title, description })}>
        Create success toast
      </Button>
    </HStack>
  );
};
