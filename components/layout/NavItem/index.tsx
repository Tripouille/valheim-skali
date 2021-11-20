import Link from 'next/link';
import { Button } from '@chakra-ui/button';

export interface NavItemProps {
  href: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  return (
    <Button fontSize="3xl">
      <Link href={href}>
        <a>{label}</a>
      </Link>
    </Button>
  );
};

export default NavItem;
