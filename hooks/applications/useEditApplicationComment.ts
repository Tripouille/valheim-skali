import axios from 'axios';
import { DateTime } from 'luxon';
import { Application, ApplicationComment, WithDiscordInfos, WithUserInfos } from 'data/application';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const editApplicationCommentOnServer =
  (application: Application, comment: ApplicationComment) => async (body: string) => {
    await axios.patch(`${APIRoute.APPLICATIONS}/${application._id}`, {
      comment: { _id: comment._id, body },
    });
  };

const getUpdatedApplications = (
  previousApplications: WithDiscordInfos<Application>[],
  updatedApplication: Application,
  oldComment: WithUserInfos<ApplicationComment>,
  newBody: string,
) =>
  previousApplications.map(application =>
    application._id === updatedApplication._id
      ? {
          ...application,
          comments: application.comments.map(comment =>
            comment._id === oldComment._id
              ? { ...comment, body: newBody, editedAt: DateTime.now().toISO() }
              : comment,
          ),
        }
      : application,
  );

const useEditApplicationComment = (
  application: Application,
  comment: WithUserInfos<ApplicationComment>,
  {
    onError,
  }: {
    onError?: (
      error: unknown,
      variables: string,
      context?: { previousData?: WithDiscordInfos<Application>[] },
    ) => void;
  },
) => {
  const mutate = useOptimisticMutation(
    QueryKeys.APPLICATIONS,
    editApplicationCommentOnServer(application, comment),
    (previousApplications, newBody) => {
      return getUpdatedApplications(previousApplications, application, comment, newBody);
    },
    'Votre commentaire a bien été modifié.',
    { onError },
  );

  return mutate;
};

export default useEditApplicationComment;
