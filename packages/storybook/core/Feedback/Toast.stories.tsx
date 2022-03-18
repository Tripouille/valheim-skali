import { useState } from 'react';
import { ComponentStory } from '@storybook/react';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';
import { displayErrorToast, displaySuccessToast } from '@packages/utils/toast';
import Toast, { ToastProps } from '@packages/components/core/Feedback/Toast';
import Input from '@packages/components/core/Form/Input';
import Button from '@packages/components/core/Interactive/Button';
import { HStack } from '@packages/components/core/Containers/Stack';

const { defaultExport } = storybookSetup<ToastProps>(Toast, StoryCategory.CORE_FEEDBACK);

export default defaultExport;

export const Default: ComponentStory<typeof Toast> = () => {
  const [title, setTitle] = useState('Toast title');
  const [description, setDescription] = useState('');

  return (
    <HStack>
      <Input dataCy="" placeholder="Toast title" value={title} onChange={setTitle} w="300px" />
      <Input
        dataCy=""
        placeholder="Toast description"
        value={description}
        onChange={setDescription}
        w="300px"
      />
      <Button dataCy="" colorScheme="red" onClick={() => displayErrorToast({ title, description })}>
        Create error toast
      </Button>
      <Button
        dataCy=""
        colorScheme="green"
        onClick={() => displaySuccessToast({ title, description })}
      >
        Create success toast
      </Button>
    </HStack>
  );
};
