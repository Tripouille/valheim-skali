import { chakra } from '@chakra-ui/react';
import Link from 'components/core/Interactive/Link';
import { CypressProps, Children } from 'utils/types';

export interface ExternalLinkProps extends Partial<CypressProps> {
  href: string;
  ariaLabel?: string;
  children: Children;
  className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  'data-cy': dataCy,
  href,
  ariaLabel,
  children,
  className,
}) => {
  return (
    <Link data-cy={dataCy} href={href} aria-label={ariaLabel} isExternal className={className}>
      {children}
    </Link>
  );
};

export default chakra(ExternalLink);
