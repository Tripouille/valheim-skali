/* eslint-disable @next/next/no-img-element */
import { storybookSetup } from 'storybook/config/setup';
import { StoryCategory } from 'storybook/config/constants';
import Figure, { FigureProps } from 'components/core/Images/Figure';

const { defaultExport, StoryFactory } = storybookSetup<FigureProps>(
  Figure,
  StoryCategory.CORE_IMAGES,
);

export default defaultExport;

export const Default = StoryFactory({
  legend: 'A legend',
  children: (
    <img
      src="/images/valheim-background-q60.jpg"
      alt="Valheim background"
      width="500"
      height="300"
    />
  ),
});
