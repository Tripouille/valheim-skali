import {
  Alert,
  AlertProps,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from 'components/core/Feedback/Alert';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<AlertProps>(
  Alert,
  StoryCategory.CORE_FEEDBACK,
);

export default defaultExport;

const baseProperties: AlertProps = {
  variant: 'subtle',
  children: (
    <>
      <AlertIcon />
      <AlertTitle whiteSpace="nowrap" me="5">
        Alert title
      </AlertTitle>
      <AlertDescription>
        Alert description : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
        quisquam labore cum quibusdam sit, asperiores atque sequi similique libero magnam odio
        eligendi dolorem soluta alias est ullam. Animi, iusto odit?
      </AlertDescription>
    </>
  ),
};

export const Default = StoryFactory({
  ...baseProperties,
  colorScheme: 'blue',
});

export const Info = StoryFactory({
  ...baseProperties,
  status: 'info',
});

export const Warning = StoryFactory({
  ...baseProperties,
  status: 'warning',
});

export const Success = StoryFactory({
  ...baseProperties,
  status: 'success',
});

export const Error = StoryFactory({
  ...baseProperties,
  status: 'error',
});
