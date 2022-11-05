import NextLink from 'next/link';
import React from 'react';
import { GiFeather } from 'react-icons/gi';
import Secured from 'components/core/Authentication/Secured';
import Background from 'components/core/Containers/Background';
import { Grid } from 'components/core/Containers/Grid';
import { VStack } from 'components/core/Containers/Stack';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import IconButton from 'components/core/Interactive/IconButton';
import PageTitle from 'components/core/Typography/PageTitle';
import { WikiPage } from 'data/wiki';
import { PermissionCategory, wikiPrivilege } from 'utils/permissions';
import { getRoute, NavRoute } from 'utils/routes';
import WikiContent from './WikiContent';

export interface WikiPageComponentProps {
  wikiPage: WikiPage;
}

const WikiPageComponent: React.FC<WikiPageComponentProps> = ({ wikiPage }) => {
  return (
    <Background>
      <VStack spacing="7" align="start">
        <Grid w="full" templateColumns="1fr 5fr 1fr" templateAreas='". title buttons"'>
          <PageTitle title={wikiPage.title} gridArea="title" />
          <ButtonGroup gridArea="buttons" justifySelf="end">
            <Secured permissions={{ [PermissionCategory.WIKI]: wikiPrivilege.PROPOSE }}>
              <NextLink href={getRoute(`${NavRoute.WIKI}/proposals/new/${wikiPage._id}`)} passHref>
                <IconButton
                  data-cy="edit"
                  aria-label="Proposer une modification"
                  title="Proposer une modification"
                  icon={<GiFeather />}
                  variant="ghost"
                />
              </NextLink>
            </Secured>
          </ButtonGroup>
        </Grid>
        <WikiContent content={wikiPage.content} />
      </VStack>
    </Background>
  );
};

export default WikiPageComponent;
