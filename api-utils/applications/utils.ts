import { isRequiredObjectType } from 'api-utils/common';
import {
  ApplicationFormAnswer,
  applicationFormKeys,
  APPLICATION_DISCORD_NAME_MAX_LENGTH,
  APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES,
  CreateApplicationData,
} from 'data/application';
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

const applicationKeyToValueTypeCheck: Record<
  keyof CreateApplicationData,
  (value: unknown) => boolean
> = {
  applicationFormAnswer: value => isApplicationFormAnswer(value),
  discordName: value => typeof value === 'string',
};

export const isCreateApplicationData = (data: unknown): data is CreateApplicationData =>
  isRequiredObjectType(data, applicationKeyToValueTypeCheck);

export const shortenApplicationTextProperties = (applicationCreateData: CreateApplicationData) => {
  for (const key of applicationFormKeys) {
    const value = applicationCreateData.applicationFormAnswer[key];
    applicationCreateData.applicationFormAnswer[key] = value.substring(
      0,
      APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES[key].maxLength,
    );
  }
  applicationCreateData.discordName = applicationCreateData.discordName.substring(
    0,
    APPLICATION_DISCORD_NAME_MAX_LENGTH,
  );
};
