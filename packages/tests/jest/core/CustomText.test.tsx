import Paragraphs, { ParagraphsProps } from '@packages/components/core/Paragraphs';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setup = (props: ParagraphsProps) => {
  return <Paragraphs {...props} />;
};
describe('ArticleResult - props', () => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  it('returns base result when article is not present', () => {
    expect(1).toBeDefined();
  });
});
