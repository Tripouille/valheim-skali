import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoryCategory } from '../constants';

const createTitle = (storyCategory: StoryCategory, displayName?: string) => {
  const match = displayName?.match(/Styled\((.*)\)/);
  const componentName = match?.length === 2 ? match[1] : displayName;
  return `${storyCategory}/${componentName}`;
};

export const storybookSetup = <Props,>(
  Component: React.ComponentType<Props>,
  storyCategory: StoryCategory = StoryCategory.CORE,
  componentMeta?: ComponentMeta<typeof Component>,
) => {
  const defaultExport: ComponentMeta<typeof Component> = {
    title: createTitle(storyCategory, Component.displayName),
    component: Component,
    ...componentMeta,
  };

  const Template: ComponentStory<typeof Component> = (args: Props) => <Component {...args} />;
  
  const StoryFactory = (args: Props) => {
    const newTemplate = Template.bind({});
    newTemplate.args = args;
    return newTemplate;
  };

  return { defaultExport, StoryFactory };
};
