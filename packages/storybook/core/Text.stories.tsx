import Text, { TextProps } from '@packages/components/core/Text';
import { storybookSetup } from '@packages/utils/Storybook/storybookSetup';

const { defaultExport, StoryFactory } = storybookSetup<TextProps>(Text);

export default defaultExport;

export const Default = StoryFactory({
  align: 'left',
  casing: 'none',
  decoration: '',
  orientation: 'horizontal',
  children:
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae minima officia, provident quaerat eum velit accusamus pariatur tempora! Magni saepe, ut accusamus necessitatibus corrupti eligendi delectus hic accusantium sunt? Reprehenderit, sint! Nostrum adipisci maxime sapiente, ipsa reiciendis praesentium eveniet qui! Distinctio odio ad magnam aspernatur voluptate quasi quidem voluptas veniam, ut repellat laborum deleniti esse commodi tempore natus ipsum? Fuga.',
});
