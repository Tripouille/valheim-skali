import DiscordButton, {
  DiscordButtonProps,
} from '@packages/components/core/Interactive/DiscordButton';
import { storybookSetup } from '@packages/utils/Storybook/setup';
import { StoryCategory } from '@packages/utils/Storybook/constants';

const { defaultExport, StoryFactory } = storybookSetup<DiscordButtonProps>(
  DiscordButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  href: 'https://discord.com/channels/843826987466227722/843829896123514910/844028003175366656',
  dataCy: '',
});
