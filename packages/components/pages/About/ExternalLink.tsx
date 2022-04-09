import { chakra } from '@chakra-ui/react';
import { getDataValue } from '@packages/utils/dataAttributes';
import { Children } from '@packages/utils/types';
import Link from '@packages/components/core/Interactive/Link';

export interface ExternalLinkProps {
  href: string;
  ariaLabel?: string;
  children: Children;
  className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, ariaLabel, children, className }) => {
  return (
    <Link
      dataCy={getDataValue('about')}
      href={href}
      aria-label={ariaLabel}
      isExternal
      className={className}
    >
      {children}
    </Link>
  );
};

export default chakra(ExternalLink);