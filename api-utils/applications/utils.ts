import { ObjectId } from 'bson';
import { DateTime } from 'luxon';
import { isRequiredObjectType, ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  ApplicationComment,
  ApplicationFormAnswer,
  applicationFormKeys,
  ApplicationInDb,
  ApplicationSystemComment,
  APPLICATION_DISCORD_NAME_MAX_LENGTH,
  APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES,
  CreateApplicationData,
  CreateApplicationDataWithUserId,
  isCreateApplicationDataWithUserId,
  WithUserInfos,
} from 'data/application';
import { UserInDb, usersCollectionName } from 'data/user';
import { isFilled } from 'utils/validation';

const applicationFormAnswerKeyToValueTypeCheck = applicationFormKeys.reduce(
  (prev, current) => ({
    ...prev,
    [current]: (value: unknown) => typeof value === 'string' && isFilled(value),
  }),
  {},
);

const isApplicationFormAnswer = (data: unknown): data is ApplicationFormAnswer =>
  isRequiredObjectType(data, applicationFormAnswerKeyToValueTypeCheck);

type KeysOfUnion<T> = T extends T ? keyof T : never;
type CreateApplicationDataKeys = KeysOfUnion<CreateApplicationData>;

const applicationKeyToValueTypeCheck: Record<
  CreateApplicationDataKeys,
  (value: unknown) => boolean
> = {
  applicationFormAnswer: value => isApplicationFormAnswer(value),
  discordName: value => value === undefined || typeof value === 'string',
  userId: value => value === undefined || typeof value === 'string',
};

const isCreateApplicationData = (data: unknown): data is CreateApplicationData =>
  isRequiredObjectType(data, applicationKeyToValueTypeCheck) &&
  (data.discordName?.length || data.userId?.length);

const isValidCreateApplicationData = (data: CreateApplicationData) =>
  isCreateApplicationDataWithUserId(data) ? data.userId.length : data.discordName.length;

const shortenApplicationTextProperties = (applicationCreateData: CreateApplicationData) => {
  for (const key of applicationFormKeys) {
    const value = applicationCreateData.applicationFormAnswer[key];
    applicationCreateData.applicationFormAnswer[key] = value.substring(
      0,
      APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].maxLength,
    );
  }
  if (!isCreateApplicationDataWithUserId(applicationCreateData)) {
    applicationCreateData.discordName = applicationCreateData.discordName.substring(
      0,
      APPLICATION_DISCORD_NAME_MAX_LENGTH,
    );
  }
};

export const getCreateApplicationData = (data: unknown): CreateApplicationData => {
  if (!isCreateApplicationData(data)) throw new ServerException(400);
  if (!isValidCreateApplicationData(data)) throw new ServerException(400);
  shortenApplicationTextProperties(data);
  return data;
};

export const getCommentWithUserInfos = (
  comment: ApplicationComment<ObjectId>,
  users: UserInDb[],
): WithUserInfos<ApplicationComment<ObjectId>> => {
  const commentAuthor = users.find(user => user._id.equals(comment.authorId));
  return {
    ...comment,
    discordName:
      comment.authorId === 'system'
        ? comment.authorId
        : commentAuthor?.name ?? 'Utilisateur supprimé',
    nameInGame: commentAuthor?.nameInGame,
    discordImageUrl: commentAuthor?.image,
  };
};

export const getApplicationUser = async (
  applicationCreateData: CreateApplicationDataWithUserId,
) => {
  const user = await db.findOne<UserInDb>(usersCollectionName, {
    _id: new ObjectId(applicationCreateData.userId),
  });
  return user;
};

export const getApplicationCommentsWithNewOrEditedSystemComment = (
  application: ApplicationInDb,
  systemComment: ApplicationSystemComment,
) => {
  const lastComment = application.comments[0];
  console.log({ lastComment, systemComment });
  const lastCommentIsSameSystemComment =
    lastComment?.authorId === 'system' && lastComment.body === systemComment;
  if (lastCommentIsSameSystemComment)
    return application.comments.map(comment =>
      comment?._id === lastComment._id
        ? { ...comment, createdAt: DateTime.now().toISO() }
        : comment,
    );

  return [
    {
      _id: new ObjectId(),
      body: systemComment,
      authorId: 'system' as const,
      createdAt: DateTime.now().toISO(),
    },
    ...application.comments,
  ];
};
