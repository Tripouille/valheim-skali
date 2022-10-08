import DiscordButton, { DiscordButtonProps } from 'components/core/Interactive/DiscordButton';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<DiscordButtonProps>(
  DiscordButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  href: 'https://discord.com/channels/843826987466227722/843829896123514910/844028003175366656',
  'data-cy': '',
});
