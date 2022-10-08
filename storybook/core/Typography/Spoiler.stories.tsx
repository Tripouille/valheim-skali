import Spoiler, { SpoilerProps } from 'components/core/Typography/Spoiler';
import { StoryCategory } from 'storybook/config/constants';
import { storybookSetup } from 'storybook/config/setup';

const { defaultExport, StoryFactory } = storybookSetup<SpoilerProps>(
  Spoiler,
  StoryCategory.CORE_TYPOGRAPHY,
  {
    decorators: [
      Story => (
        <>
          Voici un spoiler en plein milieu d&apos;un texte : <Story /> Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Eaque autem recusandae, commodi doloribus quam odio hic vel
          omnis est. Inventore?
        </>
      ),
    ],
  },
);

export default defaultExport;

export const Default = StoryFactory({ children: 'Voici le contenu du spoiler' });
