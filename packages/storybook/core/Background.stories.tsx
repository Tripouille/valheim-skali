import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Background, { BackgroundProps } from '@packages/components/core/Background';

export default {
  title: 'core/Background',
  component: Background,
} as ComponentMeta<typeof Background>;

const Template: ComponentStory<typeof Background> = (args: BackgroundProps) => (
  <Background {...args}>{args.children}</Background>
);

const Setup = (args: BackgroundProps) => {
  const newTemplate = Template.bind({});
  newTemplate.args = args;
  return newTemplate;
};

export const Default = Setup({ children: <h1>Title</h1> });
