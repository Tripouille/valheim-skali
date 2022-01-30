/* eslint-disable @next/next/no-img-element */
import Figure, { FigureProps } from '@packages/components/core/Figure';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<FigureProps>(Figure);

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
