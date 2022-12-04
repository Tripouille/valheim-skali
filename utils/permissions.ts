import {
  AdminNavRoute,
  AuthRoute,
  MenuRoute,
  NavRoute,
  OldNavRoute,
  Route,
  HiddenRoute,
} from './routes';

export enum PermissionCategory {
  EVENT = 'EVENT',
  ROLE = 'ROLE',
  USER = 'USER',
  WIKI = 'WIKI',
  RULES = 'RULES',
  APPLICATION = 'APPLICATION',
  RULES_QUESTIONNAIRE = 'RULES_QUESTIONNAIRE',
}

export const isPermissionCategory = (category: string): category is PermissionCategory =>
  Object.values(PermissionCategory).includes(category as PermissionCategory);

export enum CommonPermissionPrivilege {
  NONE = '0_NONE',
  ADMIN = '3_ADMIN', // special privilege for admin actions
  SUPER_ADMIN = '4_SUPER_ADMIN', // special privilege for owner actions
}

enum EventSpecialPrivilege {
  READ = '1_READ',
  READ_WRITE = '2_READ_WRITE',
}
export const eventPrivilege = { ...EventSpecialPrivilege, ...CommonPermissionPrivilege };

enum RoleSpecialPrivilege {
  READ = '1_READ',
}
export const rolePrivilege = { ...RoleSpecialPrivilege, ...CommonPermissionPrivilege };

enum UserSpecialPrivilege {
  READ = '1_READ',
  READ_WRITE = '2_READ_WRITE',
}
export const userPrivilege = { ...UserSpecialPrivilege, ...CommonPermissionPrivilege };

enum WikiSpecialPrivilege {
  PROPOSE = '1_PROPOSE',
  WRITE = '2_WRITE',
}
export const wikiPrivilege = { ...WikiSpecialPrivilege, ...CommonPermissionPrivilege };

enum RulesSpecialPrivilege {
  READ = '1_READ',
}
export const rulesPrivilege = { ...RulesSpecialPrivilege, ...CommonPermissionPrivilege };

enum ApplicationSpecialPrivilege {
  READ = '1_READ',
  MANAGE = '2_MANAGE',
  PROMOTE = '2_PROMOTE', // for alphabetical sort before Common '3_ADMIN'
}
export const applicationPrivilege = {
  ...ApplicationSpecialPrivilege,
  ...CommonPermissionPrivilege,
};

enum QuestionnaireSpecialPrivilege {
  MANAGE = '1_MANAGE',
}
export const rulesQuestionnairePrivilege = {
  ...QuestionnaireSpecialPrivilege,
  ...CommonPermissionPrivilege,
};

export type Permissions = {
  [PermissionCategory.EVENT]?: EventSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.ROLE]?: RoleSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.USER]?: UserSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.WIKI]?: WikiSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.RULES]?: RulesSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.APPLICATION]?: ApplicationSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.RULES_QUESTIONNAIRE]?:
    | QuestionnaireSpecialPrivilege
    | CommonPermissionPrivilege;
};

const permissionCategoryToPrivilege = {
  [PermissionCategory.EVENT]: eventPrivilege,
  [PermissionCategory.ROLE]: rolePrivilege,
  [PermissionCategory.USER]: userPrivilege,
  [PermissionCategory.WIKI]: wikiPrivilege,
  [PermissionCategory.RULES]: rulesPrivilege,
  [PermissionCategory.APPLICATION]: applicationPrivilege,
  [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege,
};

export const getSortedCategoryPrivileges = <C extends PermissionCategory>(category: C) =>
  Object.values(permissionCategoryToPrivilege[category]).sort() as PermissionPrivilege<C>[];

export type PermissionPrivilege<C extends PermissionCategory = PermissionCategory> = NonNullable<
  Permissions[C]
>;

export const PERMISSION_CATEGORY_TO_LABEL: Record<PermissionCategory, string> = {
  [PermissionCategory.USER]: 'Utilisateurs',
  [PermissionCategory.ROLE]: 'Rôles',
  [PermissionCategory.EVENT]: 'Évenements',
  [PermissionCategory.WIKI]: 'Wiki',
  [PermissionCategory.RULES]: 'Règlement',
  [PermissionCategory.APPLICATION]: 'Candidatures',
  [PermissionCategory.RULES_QUESTIONNAIRE]: 'Questionnaire règlement',
};

const COMMON_PRIVILEGE_TO_LABEL = {
  [CommonPermissionPrivilege.NONE]: '',
  [CommonPermissionPrivilege.ADMIN]: 'Admin',
  [CommonPermissionPrivilege.SUPER_ADMIN]: 'SuperAdmin',
};

export const PERMISSION_PRIVILEGE_TO_LABEL: Record<PermissionCategory, Record<string, string>> = {
  [PermissionCategory.EVENT]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [eventPrivilege.READ]: 'Voir les événements',
    [eventPrivilege.READ_WRITE]: 'Voir, créer et modifier des événements',
  },
  [PermissionCategory.ROLE]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [rolePrivilege.READ]: 'Voir la liste des rôles et leurs permissions',
  },
  [PermissionCategory.USER]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [userPrivilege.READ]: 'Voir la liste des utilisateurs',
    [userPrivilege.READ_WRITE]: 'Voir et modifier des utilisateurs (rôle, nom en jeu)',
  },
  [PermissionCategory.WIKI]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [wikiPrivilege.PROPOSE]: 'Proposer des pages wiki',
    [wikiPrivilege.WRITE]: 'Valider des propositions de pages wiki',
  },
  [PermissionCategory.RULES]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [rulesPrivilege.READ]: 'Voir le règlement',
  },
  [PermissionCategory.APPLICATION]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [applicationPrivilege.READ]: 'Voir les candidatures',
    [applicationPrivilege.MANAGE]:
      'Créer/modifier des candidatures/commentaires, modifier le statut (sauf acceptation/refus)',
    [applicationPrivilege.PROMOTE]:
      'Créer/modifier des candidatures/commentaires, modifier le statut',
  },
  [PermissionCategory.RULES_QUESTIONNAIRE]: {
    ...COMMON_PRIVILEGE_TO_LABEL,
    [rulesQuestionnairePrivilege.MANAGE]: 'Gérer le questionnaire règlement',
  },
};

export const isAdminPrivilege = (privilege: PermissionPrivilege) =>
  privilege === CommonPermissionPrivilege.ADMIN ||
  privilege === CommonPermissionPrivilege.SUPER_ADMIN;

const permissionMeetRequirement = (
  userPermissions: Permissions,
  requiredPermission: Permissions,
) => {
  for (const c in requiredPermission) {
    const category = c as PermissionCategory;
    if (
      (userPermissions[category] ?? CommonPermissionPrivilege.NONE) <
      (requiredPermission[category] ?? CommonPermissionPrivilege.NONE)
    )
      return false;
  }
  return true;
};

export const permissionsMeetRequirement = (
  userPermissions: Permissions,
  requiredPermissions: Permissions | Permissions[], // if array, means one of them is enough
) => {
  const requiredPermissionsArray = Array.isArray(requiredPermissions)
    ? requiredPermissions
    : [requiredPermissions];
  for (const requiredPermission of requiredPermissionsArray) {
    if (permissionMeetRequirement(userPermissions, requiredPermission)) return true;
  }
  return false;
};

export const ROUTES_TO_PERMISSIONS: Record<Route, Permissions | Permissions[]> = {
  [NavRoute.HOME]: {},
  [NavRoute.RULES]: { [PermissionCategory.RULES]: rulesPrivilege.READ },
  [NavRoute.MY_APPLICATION]: {},
  [NavRoute.APPLICATIONS]: { [PermissionCategory.APPLICATION]: applicationPrivilege.READ },
  [NavRoute.EVENTS]: { [PermissionCategory.EVENT]: eventPrivilege.READ },
  [NavRoute.WIKI]: {},
  [OldNavRoute.TRADE]: {},
  [OldNavRoute.MODS]: {},
  [OldNavRoute.WORLD]: {},
  [AdminNavRoute.MEMBERS]: { [PermissionCategory.USER]: userPrivilege.READ },
  [AdminNavRoute.NON_MEMBERS]: { [PermissionCategory.USER]: userPrivilege.READ },
  [AdminNavRoute.ROLES]: { [PermissionCategory.ROLE]: rolePrivilege.READ },
  [AdminNavRoute.WIKI_PROPOSALS]: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
  [AdminNavRoute.WIKI]: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
  [AdminNavRoute.RULES_QUESTIONNAIRE]: {
    [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE,
  },
  [MenuRoute.ADMIN]: [
    { [PermissionCategory.USER]: userPrivilege.READ },
    { [PermissionCategory.ROLE]: rolePrivilege.READ },
    { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
  ],
  [MenuRoute.ABOUT]: {},
  [AuthRoute.SIGNIN]: {},
  [HiddenRoute.JOIN]: {},
};
