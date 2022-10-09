import Flex from 'components/core/Containers/Flex';
import Text from 'components/core/Typography/Text';
import UserAvatar from 'components/pages/Users/UserAvatar';
import { Application, WithDiscordInfos } from 'data/application';

interface ApplicationIdentityProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationIdentity: React.FC<ApplicationIdentityProps> = ({ application }) => {
  return (
    <Flex minW="0" flex="1" align="center">
      {application.discordImageUrl && <UserAvatar src={application.discordImageUrl} size="50px" />}
      <Text px="3" noOfLines={1}>
        {application.applicationFormAnswer.nameInGame} ({application.discordName})
      </Text>
    </Flex>
  );
};

export default ApplicationIdentity;
