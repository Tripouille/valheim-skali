import NextLink from 'next/link';
import { useState } from 'react';
import { GiFeather } from 'react-icons/gi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { chakra } from '@chakra-ui/react';
import Secured from 'components/core/Authentication/Secured';
import SigninButton from 'components/core/Authentication/SigninButton';
import Background from 'components/core/Containers/Background';
import Flex from 'components/core/Containers/Flex';
import { VStack } from 'components/core/Containers/Stack';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'components/core/Disclosure/Tabs';
import Button from 'components/core/Interactive/Button';
import PageTitle from 'components/core/Typography/PageTitle';
import useSession from 'hooks/useSession';
import { SessionStatus } from 'utils/auth';
import { PermissionCategory, rulesPrivilege } from 'utils/permissions';
import { getRoute, NavRoute, ROUTES_TO_LABEL } from 'utils/routes';
import DiscordRules from './DiscordRules';
import GameGuides from './GameGuides';
import GameRules from './GameRules';
import Preambule from './Preambule';

const ruleParts: Record<string, JSX.Element> = {
  Préambule: <Preambule />,
  'Règles discord': <DiscordRules />,
  'Règles de jeu': <GameRules />,
  'Guides de jeu': <GameGuides />,
};

const RulesEndButton = () => {
  const { data: session, status } = useSession();

  if (status !== SessionStatus.AUTHENTICATED) {
    return <SigninButton label="Fini de lire ? Clique ici pour te connecter !" />;
  } else if (session && session.isNonMember && !session.hasApplication) {
    return (
      <NextLink href={getRoute('applications/new')}>
        <Button data-cy="write-application" rightIcon={<GiFeather />}>
          Fini de lire ? Clique ici pour écrire ta candidature !
        </Button>
      </NextLink>
    );
  } else {
    return null;
  }
};

const Rules = () => {
  const { data: session } = useSession();

  const [tabIndex, setTabIndex] = useState(0);

  const ruleKeys = Object.keys(ruleParts);

  const goToNextTab = () => {
    if (tabIndex < ruleKeys.length - 1) {
      setTabIndex(prev => prev + 1);
      // Delay this until tab has been changed for Firefox
      setTimeout(() => document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' }));
    }
  };

  return (
    <Secured permissions={{ [PermissionCategory.RULES]: rulesPrivilege.READ }} redirectOnFail>
      <Background>
        <VStack spacing="5" w="full">
          <PageTitle title={ROUTES_TO_LABEL[NavRoute.RULES]} />
          <Tabs
            w="full"
            id="rulesTabs"
            isFitted
            size="md"
            colorScheme="twitter"
            index={tabIndex}
            onChange={setTabIndex}
          >
            <TabList>
              {ruleKeys.map(title => (
                <Tab key={title} fontSize={['2.8vw', 'md']}>
                  {title}
                </Tab>
              ))}
            </TabList>
            <TabPanels textAlign="justify">
              {Object.entries(ruleParts).map(([title, content]) => (
                <TabPanel key={title}>{content}</TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          <Flex direction="column" align="center">
            {tabIndex < ruleKeys.length - 1 ? (
              <>
                <Button
                  data-cy="next"
                  rightIcon={<HiOutlineArrowNarrowRight />}
                  onClick={goToNextTab}
                >{`Lire la partie suivante "${ruleKeys[tabIndex + 1]}"`}</Button>
                {session && session.isNonMember && !session.hasApplication && (
                  <chakra.span fontSize="sm">
                    Finis de lire le règlement pour écrire ta candidature !
                  </chakra.span>
                )}
              </>
            ) : (
              <RulesEndButton />
            )}
          </Flex>
        </VStack>
      </Background>
    </Secured>
  );
};

export default Rules;
