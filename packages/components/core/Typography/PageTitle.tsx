import Heading from '@packages/components/core/Typography/Heading';

export interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Heading as="h1" size="2xl" fontFamily="Norse" textAlign="center" fontWeight="normal">
    {title}
  </Heading>
);

export default PageTitle;
