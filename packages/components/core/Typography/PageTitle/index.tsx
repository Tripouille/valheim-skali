import Heading from '@packages/components/core/Typography/Heading';

export interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Heading as="h1" size="2xl" fontFamily="Norse, Lucida Sans" textAlign="center">
    {title}
  </Heading>
);

export default PageTitle;
