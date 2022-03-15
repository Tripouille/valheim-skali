import NextLink from 'next/link';
import { AdminNavRoute, MenuRoute, ROUTES_TO_LABEL, serverName } from '@packages/utils/routes';
import { ROUTES_TO_PERMISSIONS } from '@packages/utils/auth';
import { getDataValue } from '@packages/utils/dataAttributes';
import Secured from '@packages/components/core/Authentication/Secured';
import Button from '@packages/components/core/Interactive/Button';
import Box from '@packages/components/core/Containers/Box';
import Flex from '@packages/components/core/Containers/Flex';

export interface AdminNavItemProps {
  route: AdminNavRoute;
  hint: string;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ route, hint }) => {
  return (
    <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
      <Flex align="center">
        <NextLink href={`/${serverName}${MenuRoute.ADMIN}${route}`} passHref>
          <Button
            dataCy={getDataValue('admin', 'nav', route)}
            as="a"
            fontSize="3xl"
            size="lg"
            w="full"
          >
            {ROUTES_TO_LABEL[route]}
          </Button>
        </NextLink>
        <Box
          fontFamily="body"
          ms={{ base: 1, lg: 2 }}
          px="2"
          fontSize="lg"
          color="silver"
          border="1px silver solid"
          borderRadius="md"
          bgColor="rgba(255, 255, 255, 0.1)"
        >
          {hint}
        </Box>
      </Flex>
    </Secured>
  );
};

export default AdminNavItem;
