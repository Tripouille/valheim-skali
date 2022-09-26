import Center from 'components/core/Containers/Center';
import Text from 'components/core/Typography/Text';
import UserAvatar from 'components/pages/Users/UserAvatar';
import { Application, WithDiscordInfos } from 'data/application';

interface ApplicationIdentityProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationIdentity: React.FC<ApplicationIdentityProps> = ({ application }) => {
  return (
    <Center>
      {application.discordImageUrl && <UserAvatar src={application.discordImageUrl} size="50px" />}
      <Text px="3" noOfLines={1}>
        {application.applicationFormAnswer.nameInGame} ({application.discordName})
      </Text>
    </Center>
  );
};

export default ApplicationIdentity;
