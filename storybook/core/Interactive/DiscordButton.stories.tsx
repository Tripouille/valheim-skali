import DiscordButton, { DiscordButtonProps } from 'components/core/Interactive/DiscordButton';
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';

const { defaultExport, StoryFactory } = storybookSetup<DiscordButtonProps>(
  DiscordButton,
  StoryCategory.CORE_INTERACTIVE,
);

export default defaultExport;

export const Default = StoryFactory({
  href: 'https://discord.com/channels/843826987466227722/843829896123514910/844028003175366656',
  'data-cy': '',
});
