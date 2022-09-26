import { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import { Editable, EditablePreview, EditableTextarea, useEditableControls } from '@chakra-ui/react';
import Flex from 'components/core/Containers/Flex';
import Textarea from 'components/core/Form/Textarea';
import ButtonGroup from 'components/core/Interactive/ButtonGroup';
import IconButton from 'components/core/Interactive/IconButton';
import { Application, ApplicationComment, WithDiscordInfos, WithUserInfos } from 'data/application';
import useEditApplicationComment from 'hooks/applications/useEditApplicationComment';
import useSession from 'hooks/useSession';

const EditableControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup flexDirection="column" alignItems="center" gap="2" size="sm" spacing="0">
      <IconButton
        aria-label="Envoyer"
        title="Envoyer"
        icon={<BsCheckLg />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="Annuler"
        title="Annuler"
        icon={<BsXLg />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="Modifier"
        title="Modifier"
        size="sm"
        icon={<BiEdit />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

interface EditableCommentProps {
  application: WithDiscordInfos<Application>;
  comment: WithUserInfos<ApplicationComment>;
}

const EditableComment: React.FC<EditableCommentProps> = ({ application, comment }) => {
  const { data: session } = useSession();
  const canEdit = comment.authorId === session?.user._id;

  const [newCommentBody, setNewCommentBody] = useState(comment.body);

  const editComment = useEditApplicationComment(application, comment, {
    onError: (error, variables, context) => {
      const oldBody = context?.previousData
        ?.find(a => a._id === application._id)
        ?.comments.find(c => c._id === comment._id)?.body;
      if (oldBody) setNewCommentBody(oldBody);
    },
  });

  const onSubmit = (newBody: string) => {
    if (!newBody.trim().length) setNewCommentBody(comment.body);
    else if (newBody !== comment.body) editComment(newBody);
  };

  return (
    <Editable
      paddingX="5"
      paddingY="3"
      display="flex"
      justifyContent="space-between"
      gap="2"
      defaultValue={comment.body}
      value={newCommentBody}
      onChange={setNewCommentBody}
      isPreviewFocusable={false}
      submitOnBlur={false}
      onSubmit={onSubmit}
    >
      <EditablePreview />
      <Textarea as={EditableTextarea} />
      {canEdit && <EditableControls />}
    </Editable>
  );
};

export default EditableComment;
