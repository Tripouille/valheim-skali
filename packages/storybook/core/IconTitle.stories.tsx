import React from 'react';
import IconTitle, { IconTitleProps } from '@packages/components/core/IconTitle';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MdComputer } from 'react-icons/md';

export default {
  title: 'core/IconTitle',
  component: IconTitle,
} as ComponentMeta<typeof IconTitle>;

const Template: ComponentStory<typeof IconTitle> = (args: IconTitleProps) => (
  <IconTitle {...args} />
);

const Setup = (args: IconTitleProps) => {
  const newTemplate = Template.bind({});
  newTemplate.args = args;
  return newTemplate;
};

export const Default = Setup({ title: 'title', size: 'md', icon: MdComputer, iconColor: 'red' });
