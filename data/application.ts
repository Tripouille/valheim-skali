import { ObjectId } from 'bson';
import { applicationPrivilege, PermissionCategory, Permissions } from 'utils/permissions';
import { isFilled } from 'utils/validation';

/** Main types */

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
  createdAt: string;
}

type ApplicationBaseWithUserId<T extends string | ObjectId> = ApplicationBaseWithoutUser<T> & {
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
  discordImageUrl?: string;
  comments: WithUserInfos<ApplicationComment<A extends Application ? string : ObjectId>>[];
};

export type CreateApplicationData = Pick<
  ApplicationBaseWithDiscordName<string>,
  'applicationFormAnswer' | 'discordName'
>;

export type AddApplicationCommentData = Pick<ApplicationComment<string>, 'body'>;

export type EditApplicationCommentData = Pick<ApplicationComment<string>, '_id' | 'body'>;

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
  [ApplicationStatus.WAITING_FOR_APPOINTMENT]: "En attente d'un entretien",
  [ApplicationStatus.SCHEDULED_APPOINTMENT]: 'Entretien programmé',
  [ApplicationStatus.WAITING_FOR_ANSWER]: 'En attente de réponse',
  [ApplicationStatus.PROMOTED]: 'Promu(e) Viking',
  [ApplicationStatus.REFUSED]: 'Refusé(e)',
};

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

/** Validation */

export const getApplicationValidationError = (
  applicationData: CreateApplicationData,
): string | null => {
  if (
    !isFilled(applicationData.discordName) ||
    applicationFormKeys.some(key => !isFilled(applicationData.applicationFormAnswer?.[key]))
  ) {
    return 'Tous les champs sont obligatoires';
  }
  return null;
};

/** Permissions */

export const APPLICATION_STATUS_TO_PERMISSIONS: Record<ApplicationStatus, Permissions> = {
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
