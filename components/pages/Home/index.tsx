import NextLink from 'next/link';
import { GiOpenGate } from 'react-icons/gi';
import VisitorOnly from 'components/core/Authentication/VisitorOnly';
import Background from 'components/core/Containers/Background';
import Box from 'components/core/Containers/Box';
import { VStack } from 'components/core/Containers/Stack';
import IconList from 'components/core/DataDisplay/IconList';
import Button from 'components/core/Interactive/Button';
import Link from 'components/core/Interactive/Link';
import PageTitle from 'components/core/Typography/PageTitle';
import Paragraphs from 'components/core/Typography/Paragraphs';
import Text from 'components/core/Typography/Text';
import useFeaturedWikiPages from 'hooks/wiki/useFeaturedWikiPages';
import { getRoute, NavRoute } from 'utils/routes';
import FeaturedWikiPagesComponent from '../Wiki/FeaturedWikiPages';

export interface HomePageProps {
  SSRFeaturedWikiPages: string;
}

const Home: React.FC<HomePageProps> = ({ SSRFeaturedWikiPages }) => {
  const { data: featuredWikiPages } = useFeaturedWikiPages({
    placeholderData: JSON.parse(SSRFeaturedWikiPages),
  });

  return (
    <Background data-cy="home" textAlign="justify">
      <VStack spacing="8">
        <PageTitle title="Bienvenue au Skali du Valhabba" />
        <Box w="full">
          <Paragraphs
            paragraphs={[
              `Mis en ligne le 20 mai 2021 par plusieurs joueurs expérimentés, Valhabba est un serveur de jeu
        Valheim mêlant différents principes et mods pour étendre la durée et la difficulté du jeu en
        fonction de la progression du joueur, le tout en préservant le charme originel de Valheim.`,
              `Aujourd'hui cette communauté regroupe des joueurs débutants comme expérimentés,
        cherchant tous l'aventure et des interactions "vikings" (échanges
        économiques, événements PvP, regroupements...). Incarne ton Viking et forge ta légende au
        sein de duels à la hache, de courses de karvs, de combats de forts, de compétitions de tir à
        l'arc, de chasses etc. Tout cela sous le regard des dieux aux caractères changeants.`,
            ]}
          />
        </Box>
        <VisitorOnly>
          <NextLink href={getRoute('join')}>
            <Button
              data-cy="join"
              size="lg"
              colorScheme="twitter"
              outline="4px lightskyblue solid"
              leftIcon={<GiOpenGate size="28" style={{ marginRight: '5px' }} />}
            >
              Rejoindre le Valhabba
            </Button>
          </NextLink>
        </VisitorOnly>
        <Box w="full">
          <Text mb="3">Vous retrouverez notamment sur le Skali :</Text>
          <IconList
            alignSelf="start"
            list={[
              <NextLink key="rules" href={getRoute(NavRoute.RULES)}>
                <Link>Le Règlement du serveur</Link>
              </NextLink>,
              <NextLink key="applications" href={getRoute(NavRoute.APPLICATIONS)}>
                <Link>Les histoires des nouvelles âmes du Valhabba</Link>
              </NextLink>,
              <NextLink key="events" href={getRoute(NavRoute.EVENTS)}>
                <Link>Les événements du moment</Link>
              </NextLink>,
              <NextLink key="wiki" href={getRoute(NavRoute.WIKI)}>
                <Link>Notre Wiki :</Link>
              </NextLink>,
            ]}
          />
          <FeaturedWikiPagesComponent featuredWikiPages={featuredWikiPages} />
        </Box>
      </VStack>
    </Background>
  );
};

export default Home;
