import DiscordButton, {
  DiscordButtonProps,
} from '@packages/components/core/Interactive/DiscordButton';
import { storybookSetup } from '@packages/storybook/config/setup';
import { StoryCategory } from '@packages/storybook/config/constants';

const { defaultExport, StoryFactory } = storybookSetup<DiscordButtonProps>(
  DiscordButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  href: 'https://discord.com/channels/843826987466227722/843829896123514910/844028003175366656',
  dataCy: '',
});
