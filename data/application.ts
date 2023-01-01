import { ObjectId } from 'bson';
import { applicationPrivilege, PermissionCategory, Permissions } from 'utils/permissions';
import { isFilled } from 'utils/validation';
import {
  LongQuestion,
  MultipleChoiceQuestion,
  QuestionType,
  SimpleQuestion,
  SingleChoiceQuestion,
} from './rulesQuestionnaire';
import { User, UserInDb } from './user';

/* Main questionnaire types */

type OmittedFieldsInGeneratedQuestion = '_id' | 'alwaysIncluded' | 'positionType';

export type GeneratedSimpleQuestionAndAnswer = Omit<
  SimpleQuestion,
  OmittedFieldsInGeneratedQuestion
> & {
  answer?: string;
};

export type GeneratedLongQuestionAndAnswer = Omit<
  LongQuestion,
  OmittedFieldsInGeneratedQuestion
> & {
  answer?: string;
};

export type GeneratedSingleChoiceQuestionAndAnswer = Omit<
  SingleChoiceQuestion,
  OmittedFieldsInGeneratedQuestion
> & {
  answer?: string;
};

export type GeneratedMultipleChoiceQuestionAndAnswer = Omit<
  MultipleChoiceQuestion,
  OmittedFieldsInGeneratedQuestion
> & {
  answer?: (string | number)[];
};

export type GeneratedQuestionAndAnswer =
  | GeneratedSimpleQuestionAndAnswer
  | GeneratedLongQuestionAndAnswer
  | GeneratedSingleChoiceQuestionAndAnswer
  | GeneratedMultipleChoiceQuestionAndAnswer;

export interface GeneratedRulesQuestionnaire {
  preamble: string;
  questionsWithAnswers: GeneratedQuestionAndAnswer[];
}

/* Main application types */

export interface ApplicationFormAnswer {
  nameInGame: string;
  steamName: string;
  steamID: string;
  whereDidYouFindTheServer: string;
  whyDidYouChooseThisServer: string;
  whatAreYourPlansAsAViking: string;
  background: string;
}

export interface ApplicationComment<T extends string | ObjectId = string> {
  _id: T;
  authorId: T | 'system';
  body: string;
  createdAt: string;
  editedAt?: string;
}

export type WithUserInfos<C extends ApplicationComment<string | ObjectId>> = C & {
  discordName: string;
  nameInGame?: string;
  discordImageUrl?: string;
};

export enum ApplicationStatus {
  FILLING_QUESTIONNAIRE = 'filling_questionnaire',
  WAITING_FOR_APPOINTMENT = 'waiting_for_appointment',
  SCHEDULED_APPOINTMENT = 'scheduled_appointment',
  WAITING_FOR_ANSWER = 'waiting_for_answer',
  PROMOTED = 'promoted',
  REFUSED = 'refused',
}

interface ApplicationBaseWithoutUser<T extends string | ObjectId> {
  _id: T;
  comments: ApplicationComment<T>[];
  applicationFormAnswer: ApplicationFormAnswer;
  status: ApplicationStatus;
  questionnaire?: GeneratedRulesQuestionnaire;
  createdAt: string;
}

export type ApplicationBaseWithUserId<T extends string | ObjectId> =
  ApplicationBaseWithoutUser<T> & {
    userId: T;
  };
export type ApplicationBaseWithDiscordName<T extends string | ObjectId> =
  ApplicationBaseWithoutUser<T> & {
    discordName: string;
  };
type ApplicationBase<T extends string | ObjectId> =
  | ApplicationBaseWithUserId<T>
  | ApplicationBaseWithDiscordName<T>;

export type Application = ApplicationBase<string>;

export type ApplicationInDb = ApplicationBase<ObjectId>;

export type WithDiscordInfos<A extends Application | ApplicationInDb> = Omit<A, 'comments'> & {
  discordName: string;
  userId?: A extends Application ? string : ObjectId;
  discordImageUrl?: string;
  comments: WithUserInfos<ApplicationComment<A extends Application ? string : ObjectId>>[];
};

type CreateApplicationDataWithDiscordName = Pick<
  ApplicationBaseWithDiscordName<string>,
  'applicationFormAnswer' | 'discordName'
>;
export type CreateApplicationDataWithUserId = Pick<
  ApplicationBaseWithUserId<string>,
  'applicationFormAnswer' | 'userId'
>;
export type CreateApplicationData =
  | CreateApplicationDataWithDiscordName
  | CreateApplicationDataWithUserId;

export const isCreateApplicationDataWithUserId = (
  applicationData: CreateApplicationData,
): applicationData is CreateApplicationDataWithUserId => 'userId' in applicationData;

export type AddApplicationCommentData = Pick<ApplicationComment<string>, 'body'>;

export type EditApplicationCommentData = Pick<ApplicationComment<string>, '_id' | 'body'>;

export type ApplicationAssociableUser<T extends string | ObjectId = string> = Pick<
  T extends string ? User : UserInDb,
  '_id' | 'name' | 'nameInGame' | 'image'
> & {
  isMember: boolean;
  applicationId?: T;
};

/** Database */

export const applicationsCollectionName = 'applications';

/** Labels */

export const APPLICATION_FORM_KEY_TO_LABEL: Record<keyof ApplicationFormAnswer, string> = {
  nameInGame: 'Quel sera le nom de ton viking ?',
  steamName: 'Quel est ton pseudo steam ?',
  steamID: 'Ton ID steam :',
  whereDidYouFindTheServer: 'Où as-tu connu le serveur ?',
  whyDidYouChooseThisServer: 'Pourquoi avoir choisi de jouer sur notre serveur ?',
  whatAreYourPlansAsAViking: 'Quels sont tes projets en tant que Viking ?',
  background: 'Ton background (RP) :',
};

export const APPLICATION_STATUS_TO_LABEL: Record<ApplicationStatus, string> = {
  [ApplicationStatus.FILLING_QUESTIONNAIRE]: 'Remplit le questionnaire',
  [ApplicationStatus.WAITING_FOR_APPOINTMENT]: "En attente d'un entretien",
  [ApplicationStatus.SCHEDULED_APPOINTMENT]: 'Entretien programmé',
  [ApplicationStatus.WAITING_FOR_ANSWER]: 'En attente de réponse',
  [ApplicationStatus.PROMOTED]: 'Promu(e) Viking',
  [ApplicationStatus.REFUSED]: 'Refusé(e)',
};

export enum ApplicationSystemComment {
  APPLICATION_EDITED = 'La candidature a été mise à jour.',
  QUESTIONNAIRE_FILLED = 'Le questionnaire a été rempli.',
}

/** Form properties */

export const applicationFormKeys = [
  'nameInGame',
  'steamName',
  'steamID',
  'whereDidYouFindTheServer',
  'whyDidYouChooseThisServer',
  'whatAreYourPlansAsAViking',
  'background',
] as Array<keyof ApplicationFormAnswer>;

export const APPLICATION_FORM_KEYS_TO_FORM_PROPERTIES: Record<
  keyof ApplicationFormAnswer,
  { inputType: 'input' | 'textarea'; maxLength: number; hint?: string }
> = {
  nameInGame: { inputType: 'input', maxLength: 100 },
  steamName: { inputType: 'input', maxLength: 100 },
  steamID: {
    inputType: 'input',
    maxLength: 100,
    hint: 'Clique sur ton pseudo en haut à droite de ton compte Steam --> Détail du compte --> ton ID Steam se trouvera juste en dessous de COMPTE DE "MICHEL ". Exemple: 76563535353535399',
  },
  whereDidYouFindTheServer: { inputType: 'textarea', maxLength: 500 },
  whyDidYouChooseThisServer: { inputType: 'textarea', maxLength: 1000 },
  whatAreYourPlansAsAViking: { inputType: 'textarea', maxLength: 1000 },
  background: {
    inputType: 'textarea',
    maxLength: 20000,
    hint: "On n'est pas un serveur 100% RP, si ce n'est pas ton truc, pas de souci. On demande juste de faire une présentation un minimum RP (~20% de la communauté est RP et on demande au reste de ne pas être anti-RP).",
  },
};

export const APPLICATION_DISCORD_NAME_MAX_LENGTH = 100;

export const APPLICATION_COMMENT_MAX_LENGTH = 5000;

export const getQuestionDefaultAnswer = <T extends GeneratedQuestionAndAnswer>(
  question: T,
): T['answer'] => {
  return {
    simple: '',
    long: '',
    'single-choice': '',
    'multiple-choice': [],
  }[question.type];
};

/** Validation */

export const getApplicationValidationError = (
  applicationData: CreateApplicationData,
): string | null => {
  if (
    (!('userId' in applicationData) && !isFilled(applicationData.discordName)) ||
    applicationFormKeys.some(key => !isFilled(applicationData.applicationFormAnswer?.[key]))
  ) {
    return 'Tous les champs sont obligatoires';
  }
  return null;
};

export const isQuestionnaireValid = (questionsWithAnswers: GeneratedQuestionAndAnswer[]): boolean =>
  questionsWithAnswers.every(question => {
    if (
      question.type === QuestionType.SIMPLE ||
      question.type === QuestionType.LONG ||
      question.type === QuestionType.SINGLE_CHOICE
    ) {
      return isFilled(question.answer);
    } else if (question.type === QuestionType.MULTIPLE_CHOICE) {
      return Array.isArray(question.answer) && question.answer.length > 0;
    }
    return false;
  });

/** Permissions */

export const APPLICATION_STATUS_CHANGE_TO_PERMISSIONS: Record<ApplicationStatus, Permissions> = {
  [ApplicationStatus.FILLING_QUESTIONNAIRE]: {
    [PermissionCategory.APPLICATION]: applicationPrivilege.SUPER_ADMIN,
  },
  [ApplicationStatus.WAITING_FOR_APPOINTMENT]: {
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  },
  [ApplicationStatus.SCHEDULED_APPOINTMENT]: {
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  },
  [ApplicationStatus.WAITING_FOR_ANSWER]: {
    [PermissionCategory.APPLICATION]: applicationPrivilege.MANAGE,
  },
  [ApplicationStatus.PROMOTED]: { [PermissionCategory.APPLICATION]: applicationPrivilege.PROMOTE },
  [ApplicationStatus.REFUSED]: { [PermissionCategory.APPLICATION]: applicationPrivilege.PROMOTE },
};

/** Utils */

export const hasFinishedApplication = (application: Application): boolean =>
  Object.values(ApplicationStatus).indexOf(application.status) >=
  Object.values(ApplicationStatus).indexOf(ApplicationStatus.WAITING_FOR_APPOINTMENT);
