import DiscordButton, { DiscordButtonProps } from '@packages/components/core/DiscordButton';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<DiscordButtonProps>(DiscordButton);

export default defaultExport;

export const Default = StoryFactory({
  href: 'https://discord.com/channels/843826987466227722/843829896123514910/844028003175366656',
  elementCategories: [],
});
