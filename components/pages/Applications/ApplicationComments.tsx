import { FormEventHandler, useState } from 'react';
import { BiSend } from 'react-icons/bi';
import { chakra } from '@chakra-ui/react';
import Box from 'components/core/Containers/Box';
import Center from 'components/core/Containers/Center';
import Flex from 'components/core/Containers/Flex';
import { Stack } from 'components/core/Containers/Stack';
import Textarea from 'components/core/Form/Textarea';
import IconButton from 'components/core/Interactive/IconButton';
import Text from 'components/core/Typography/Text';
import { Application, WithDiscordInfos } from 'data/application';
import useAddApplicationComment from 'hooks/applications/useAddApplicationComment';
import UserAvatar from '../Users/UserAvatar';
import ApplicationDate from './ApplicationDate';
import EditableComment from './EditableComment';

interface ApplicationCommentsProps {
  application: WithDiscordInfos<Application>;
}

const ApplicationComments: React.FC<ApplicationCommentsProps> = ({ application }) => {
  const [commentBody, setCommentBody] = useState('');
  const addComment = useAddApplicationComment(application);

  const submitCommentForm: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    addComment({ body: commentBody });
    setCommentBody('');
  };

  return (
    <Stack marginTop="9" spacing="8">
      {application.comments.map(comment => (
        <Box key={comment._id} bgColor="#ffffff10" borderRadius="md">
          {comment.authorId === 'system' ? (
            <Flex justify="space-between" align="center" borderRadius="md" padding="2">
              <Text fontStyle="italic">La candidature a été mise à jour.</Text>
              <ApplicationDate date={comment.createdAt} />{' '}
            </Flex>
          ) : (
            <>
              <Flex
                justify="space-between"
                align="center"
                border="2px silver solid"
                borderTopLeftRadius="md"
                borderTopRightRadius="md"
                padding="2"
              >
                <Center>
                  {comment.discordImageUrl && (
                    <UserAvatar src={comment.discordImageUrl} size="40px" />
                  )}
                  <Text px="4" noOfLines={1}>
                    {comment.nameInGame ?? comment.discordName}
                  </Text>
                </Center>
                <Text fontStyle="italic">
                  <ApplicationDate date={comment.createdAt} />{' '}
                  {comment.editedAt && (
                    <>
                      (édité le <ApplicationDate date={comment.editedAt} />)
                    </>
                  )}
                </Text>
              </Flex>
              <EditableComment application={application} comment={comment} />
            </>
          )}
        </Box>
      ))}
      <chakra.form display="flex" alignItems="center" gap="2" onSubmit={submitCommentForm}>
        <Textarea
          value={commentBody}
          onChange={setCommentBody}
          placeholder="Votre commentaire ici..."
        />
        <IconButton
          type="submit"
          aria-label="Envoyer"
          title="Envoyer"
          icon={<BiSend />}
          disabled={commentBody.trim().length === 0}
        />
      </chakra.form>
    </Stack>
  );
};

export default ApplicationComments;
