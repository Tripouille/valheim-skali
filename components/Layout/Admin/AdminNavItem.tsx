import NextLink from 'next/link';
import Secured from 'components/core/Authentication/Secured';
import { Grid, GridItem } from 'components/core/Containers/Grid';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import Button from 'components/core/Interactive/Button';
import { ROUTES_TO_PERMISSIONS } from 'utils/permissions';
import { AdminNavRoute, MenuRoute, ROUTES_TO_LABEL, serverName } from 'utils/routes';

export interface AdminNavItemProps {
  route: AdminNavRoute;
  hint?: number;
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({ route, hint }) => (
  <Secured permissions={ROUTES_TO_PERMISSIONS[route]}>
    <Flex align="center">
      <NextLink href={`/${serverName}${MenuRoute.ADMIN}${route}`} passHref>
        <Button data-cy={ROUTES_TO_LABEL[route]} as="a" size="lg" w="full" px="3">
          <Grid w="full" templateColumns="1fr auto 1fr" gap="3">
            <GridItem colStart={2} fontSize="3xl">
              {ROUTES_TO_LABEL[route]}
            </GridItem>
            {!!hint && (
              <Box
                fontFamily="body"
                ms="auto"
                alignSelf="center"
                px="2"
                lineHeight="1.5em"
                fontSize="lg"
                color="silver"
                borderWidth="1px"
                borderColor="whiteAlpha.500"
                borderRadius="full"
                bgColor="whiteAlpha.200"
              >
                {hint}
              </Box>
            )}
          </Grid>
        </Button>
      </NextLink>
    </Flex>
  </Secured>
);

export default AdminNavItem;
