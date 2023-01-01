import NextLink from 'next/link';
import { BiEdit, BiLinkExternal } from 'react-icons/bi';
import { GiFeather } from 'react-icons/gi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useDisclosure } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Flex from 'components/core/Containers/Flex';
import IconList from 'components/core/DataDisplay/IconList';
import Tag from 'components/core/DataDisplay/Tag';
import Icon from 'components/core/Images/Icon';
import Button from 'components/core/Interactive/Button';
import DiscordButton from 'components/core/Interactive/DiscordButton';
import Link from 'components/core/Interactive/Link';
import Text from 'components/core/Typography/Text';
import ApplicationIdentity from 'components/pages/Applications/ApplicationIdentity';
import {
  Application,
  ApplicationStatus,
  APPLICATION_STATUS_TO_LABEL,
  hasFinishedApplication,
  WithDiscordInfos,
} from 'data/application';
import theme from 'theme';
import { getRoute, NavRoute } from 'utils/routes';
import QuestionnaireModal from '../RulesQuestionnaire/QuestionnaireModal';
import ApplicationAnswers from './ApplicationAnswers';

interface MyApplicationProps {
  application: WithDiscordInfos<Application>;
}

const MyApplication: React.FC<MyApplicationProps> = ({ application }) => {
  const questionnaireModal = useDisclosure();

  return (
    <>
      <Flex maxW="full" justify="space-between" align="center">
        <ApplicationIdentity application={application} />
        {hasFinishedApplication(application) && (
          <Tag label={APPLICATION_STATUS_TO_LABEL[application.status]} />
        )}
      </Flex>
      <ApplicationAnswers application={application} showFullAnswers />
      <NextLink href={getRoute(`${NavRoute.APPLICATIONS}/me/edit`)} passHref>
        <Button as="a" alignSelf="start" data-cy="edit" leftIcon={<BiEdit />}>
          Modifier
        </Button>
      </NextLink>
      {application.status === ApplicationStatus.FILLING_QUESTIONNAIRE && (
        <>
          <NextLink href={getRoute(`${NavRoute.APPLICATIONS}/me/questionnaire`)} passHref>
            <Button
              as="a"
              data-cy="go-to-questionnaire"
              width="max-content"
              maxWidth="full"
              minHeight={theme.components.Button.sizes.md.h}
              height="auto"
              padding={2}
              whiteSpace="normal"
              colorScheme="blue"
              outlineColor="blue.300"
              leftIcon={<HiOutlineArrowNarrowRight size="20" style={{ marginRight: '5px' }} />}
              rightIcon={<GiFeather style={{ marginLeft: '5px' }} />}
            >
              Si tu es satisfait de ta candidature, clique ici pour répondre au questionnaire sur le
              règlement
            </Button>
          </NextLink>
          <Box>
            Rappel : pour rejoindre notre serveur, il te reste encore à :
            <IconList
              list={[
                'Répondre à un questionnaire sur le règlement (bouton ci-dessus)',
                'Rejoindre notre discord et donner tes disponibilités pour un rendez-vous',
                'Discuter quelques minutes avec un Sympathiseur',
              ]}
              marginTop="3"
            />
          </Box>
        </>
      )}
      {hasFinishedApplication(application) && application.questionnaire && (
        <>
          <Link onClick={questionnaireModal.onOpen}>
            {"J'ai rempli le questionnaire : Voir mes réponses"}
            <Icon as={BiLinkExternal} verticalAlign="text-bottom" marginStart={2} />
          </Link>
          <QuestionnaireModal
            title="Mon questionnaire"
            questionnaire={application.questionnaire}
            modal={questionnaireModal}
          />
        </>
      )}
      {application.status === ApplicationStatus.WAITING_FOR_APPOINTMENT && (
        <Box>
          Si tu es satisfait de ta candidature,
          <IconList
            list={[
              <DiscordButton
                key="discord-invite"
                data-cy="discord-invite"
                href="https://discord.gg/VXzCNmakT6"
                label="Rejoins notre Discord"
                isInvitation
              />,
              <DiscordButton
                key="discord-make-appointment"
                data-cy="discord-make-appointment"
                href="https://discord.com/channels/1020648216552816661/1023619919830601809"
                label="Rends-toi dans le salon #Prendre-rendez-vous pour donner tes disponibilités !"
                title="Rends-toi dans le salon #Prendre-rendez-vous pour donner tes disponibilités !"
              />,
            ]}
            marginTop="3"
          />
          <Box marginTop={1} marginLeft="2rem" fontSize="sm">
            <Text>
              {
                'Tu pourras ainsi venir papoter 5-10 minutes avec l\'un des nôtres (un "Sympathiseur") et enfin nous rejoindre. Ce sera l\'occasion de répondre à tes questions et de clarifier notre fonctionnement.'
              }
            </Text>
            <Text>
              {
                'Donne-nous tes disponibilités dans le canal "Prendre-rendez-vous" et surveille bien tes notifications ensuite. Un Sympathiseur te contactera dès qu\'il aura un peu de temps (n\'hésite pas à relancer).'
              }
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyApplication;
