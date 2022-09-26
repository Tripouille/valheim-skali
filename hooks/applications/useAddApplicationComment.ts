import axios from 'axios';
import { DateTime } from 'luxon';
import { Session } from 'next-auth';
import { AddApplicationCommentData, Application, WithDiscordInfos } from 'data/application';
import useOptimisticMutation from 'hooks/useOptimisticMutation';
import useSession from 'hooks/useSession';
import { QueryKeys } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const addApplicationCommentOnServer =
  (application: Application) => async (comment: AddApplicationCommentData) => {
    await axios.patch(`${APIRoute.APPLICATIONS}/${application._id}`, { comment });
  };

const getUpdatedApplications = (
  previousApplications: WithDiscordInfos<Application>[],
  updatedApplication: Application,
  newComment: AddApplicationCommentData,
  user?: Session['user'],
) =>
  previousApplications.map(application =>
    application._id === updatedApplication._id
      ? {
          ...application,
          comments: [
            {
              ...newComment,
              _id: 'new',
              authorId: user?._id ?? '',
              createdAt: DateTime.now().toISO(),
              discordName: user?.name ?? '',
              nameInGame: user?.nameInGame,
              discordImageUrl: user?.image ?? '',
            },
            ...application.comments,
          ],
        }
      : application,
  );

const useAddApplicationComment = (application: Application) => {
  const { data: session } = useSession();

  const mutate = useOptimisticMutation(
    QueryKeys.APPLICATIONS,
    addApplicationCommentOnServer(application),
    (previousApplications, newComment) => {
      return getUpdatedApplications(previousApplications, application, newComment, session?.user);
    },
    'Votre commentaire a bien été ajouté.',
  );

  return mutate;
};

export default useAddApplicationComment;
