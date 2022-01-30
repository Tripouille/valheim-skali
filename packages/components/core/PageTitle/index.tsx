import { Heading } from '@chakra-ui/react';

export interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => (
  <Heading as="h1" size="2xl" fontFamily="Norse, Lucida Sans" textAlign="center">
    {title}
  </Heading>
);

export default PageTitle;
