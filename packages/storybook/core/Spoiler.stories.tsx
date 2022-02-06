import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';
import Spoiler, { SpoilerProps } from '@packages/components/core/Typography/Spoiler';

const { defaultExport, StoryFactory } = storybookSetup<SpoilerProps>(Spoiler, {
  decorators: [
    Story => (
      <>
        Voici un spoiler en plein milieu d&apos;un texte : <Story /> Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Eaque autem recusandae, commodi doloribus quam odio hic vel
        omnis est. Inventore?
      </>
    ),
  ],
});

export default defaultExport;

export const Default = StoryFactory({ children: 'Voici le contenu du spoiler' });
