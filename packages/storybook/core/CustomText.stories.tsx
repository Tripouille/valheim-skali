import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import CustomText, { CustomTextProps } from '@packages/components/core/CustomText';

export default {
  title: 'core/CustomText',
  component: CustomText,
} as ComponentMeta<typeof CustomText>;

export const Template: ComponentStory<typeof CustomText> = (args: CustomTextProps) => (
  <CustomText {...args} />
);

export const Setup = (args: CustomTextProps) => {
  const newTemplate = Template.bind({});
  newTemplate.args = args;
  return newTemplate;
};

export const OneLine = Setup({ paragraphs: ['line'] });
export const MultipleLine = Setup({ paragraphs: ['line', 'line 2', 'line 3'] });
export const MultipleLineWithMb = Setup({
  paragraphs: ['line', 'line 2', 'line 3'],
  mb: '12',
});
