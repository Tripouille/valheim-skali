import { ObjectId } from 'bson';
import { isRequiredObjectType } from 'api-utils/common';
import {
  ApplicationComment,
  ApplicationFormAnswer,
  applicationFormKeys,
  APPLICATION_DISCORD_NAME_MAX_LENGTH,
  APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES,
  CreateApplicationData,
  isCreateApplicationDataWithUserId,
  WithUserInfos,
} from 'data/application';
import { UserInDb } from 'data/user';
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

export const isCreateApplicationData = (data: unknown): data is CreateApplicationData =>
  isRequiredObjectType(data, applicationKeyToValueTypeCheck) &&
  (data.discordName.length || data.userId.length);

export const isValidCreateApplicationData = (data: CreateApplicationData) =>
  isCreateApplicationDataWithUserId(data) ? data.userId.length : data.discordName.length;

export const shortenApplicationTextProperties = (applicationCreateData: CreateApplicationData) => {
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
