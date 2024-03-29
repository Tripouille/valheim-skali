import { rest } from 'msw';
import { NextRouter } from 'next/router';
import { ArgTypes, ComponentMeta, ComponentStory } from '@storybook/react';
import { Permissions } from 'utils/permissions';
import { APIRoute } from 'utils/routes';
import { StoryCategory } from './constants';

const getComponentName = (displayName?: string) => {
  const match = displayName?.match(/Styled\((.*)\)/);
  return match?.length === 2 ? match[1] : displayName;
};

const createTitle = (
  storyCategory: StoryCategory,
  storySubCategory?: string,
  displayName?: string,
) => {
  const componentName = getComponentName(displayName);
  return storySubCategory
    ? `${storyCategory}/${storySubCategory}/${componentName}`
    : `${storyCategory}/${componentName}`;
};

export const storybookSetup = <Props,>(
  Component: React.ComponentType<Props>,
  storyCategory: StoryCategory,
  componentMeta?: ComponentMeta<typeof Component>,
  storySubCategory?: string,
  title?: string,
) => {
  const defaultExport: ComponentMeta<typeof Component> = {
    title: title
      ? `${storyCategory}/${title}`
      : createTitle(storyCategory, storySubCategory, Component.displayName),
    component: Component,
    ...componentMeta,
  };

  const Template: ComponentStory<typeof Component> = (args: Props) => <Component {...args} />;

  const StoryFactory = (
    args: Props,
    parameters?: {
      permissions?: Permissions;
      requestResults?: { url: string; result: object }[];
      router?: Partial<NextRouter>;
      sessionRequestResult?: object;
    },
  ) => {
    const template = Template.bind({});
    template.args = args;
    template.argTypes = { children: { control: false } } as Partial<ArgTypes<Props>>;
    template.parameters = {};

    template.parameters.msw = {
      handlers: {
        visitor:
          parameters?.permissions &&
          rest.get(APIRoute.VISITOR, (req, res, ctx) => res(ctx.json(parameters.permissions))),
        story:
          parameters?.requestResults &&
          parameters.requestResults?.map(({ url, result }) =>
            rest.get(url, (req, res, ctx) => res(ctx.json(result))),
          ),
        session:
          parameters?.sessionRequestResult &&
          rest.get(APIRoute.SESSION, (req, res, ctx) =>
            res(ctx.json(parameters.sessionRequestResult)),
          ),
      },
    };

    template.parameters.nextRouter = parameters?.router;

    return template;
  };

  return { defaultExport, StoryFactory };
};
