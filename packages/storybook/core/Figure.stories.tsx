import React from 'react';
import { ComponentMeta } from '@storybook/react';
import CustomText, { CustomTextProps } from '@packages/components/core/CustomText';

export default {
  title: 'core/CustomText',
  component: CustomText,
} as ComponentMeta<typeof CustomText>;

const CustomTextTemplate = (props: CustomTextProps) => () => <CustomText {...props} />;

export const OneLine = CustomTextTemplate({ paragraphs: ['line'] });
export const MultipleLine = CustomTextTemplate({ paragraphs: ['line', 'line 2', 'line 3'] });
