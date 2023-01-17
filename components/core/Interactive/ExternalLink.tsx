import { BiLinkExternal } from 'react-icons/bi';
import { chakra } from '@chakra-ui/react';
import Icon from 'components/core/Images/Icon';
import Link from 'components/core/Interactive/Link';
import { CypressProps, Children } from 'utils/types';

export interface ExternalLinkProps extends Partial<CypressProps> {
  href: string;
  ariaLabel?: string;
  children: Children;
  withIcon?: boolean;
  className?: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  'data-cy': dataCy,
  href,
  ariaLabel,
  children,
  withIcon,
  className,
}) => {
  return (
    <Link data-cy={dataCy} href={href} aria-label={ariaLabel} isExternal className={className}>
      {children} {withIcon && <Icon as={BiLinkExternal} verticalAlign="text-bottom" />}
    </Link>
  );
};

export default chakra(ExternalLink);
