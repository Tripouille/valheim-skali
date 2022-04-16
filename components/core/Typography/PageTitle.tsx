import { chakra } from '@chakra-ui/react';
import Heading, { HeadingProps } from 'components/core/Typography/Heading';

export interface PageTitleProps {
  title: string;
  size?: HeadingProps['size'];
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, size, className }) => (
  <Heading
    as="h1"
    size={size ?? '2xl'}
    fontFamily="Norse"
    textAlign="center"
    fontWeight="normal"
    className={className}
  >
    {title}
  </Heading>
);

export default chakra(PageTitle);
