import { rest } from 'msw';
import { ArgTypes, ComponentMeta, ComponentStory } from '@storybook/react';
import { Permissions } from '@packages/utils/auth';
import { APIRoute } from '@packages/utils/routes';
import { StoryCategory } from './constants';

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
  storyCategory: StoryCategory,
  componentMeta?: ComponentMeta<typeof Component>,
  storySubCategory?: string,
) => {
  const defaultExport: ComponentMeta<typeof Component> = {
    title: createTitle(storyCategory, storySubCategory, Component.displayName),
    component: Component,
    ...componentMeta,
  };

  const Template: ComponentStory<typeof Component> = (args: Props) => <Component {...args} />;

  const StoryFactory = (
    args: Props,
    permissions?: Permissions,
    requestResults?: { url: string; result: object }[],
  ) => {
    const newTemplate = Template.bind({});
    newTemplate.args = args;
    newTemplate.argTypes = { children: { control: false } } as Partial<ArgTypes<Props>>;
    if (permissions) {
      newTemplate.parameters = {
        msw: {
          handlers: {
            visitor: rest.get(APIRoute.VISITOR, (req, res, ctx) => res(ctx.json(permissions))),
            story: requestResults?.map(({ url, result }) =>
              rest.get(url, (req, res, ctx) => res(ctx.json(result))),
            ),
          },
        },
      };
    }
    return newTemplate;
  };

  return { defaultExport, StoryFactory };
};
