import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoryCategory } from '../constants';

const createTitle = (
  storyCategory: StoryCategory,
  storySubCategory?: string,
  displayName?: string,
) => {
  const match = displayName?.match(/Styled\((.*)\)/);
  const componentName = match?.length === 2 ? match[1] : displayName;
  return storySubCategory
    ? `${storyCategory}/${storySubCategory}/${componentName}`
    : `${storyCategory}/${componentName}`;
};

export const storybookSetup = <Props,>(
  Component: React.ComponentType<Props>,
  componentMeta?: ComponentMeta<typeof Component>,
  storyCategory: StoryCategory = StoryCategory.CORE,
  storySubCategory?: string,
) => {
  const defaultExport: ComponentMeta<typeof Component> = {
    title: createTitle(storyCategory, storySubCategory, Component.displayName),
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
