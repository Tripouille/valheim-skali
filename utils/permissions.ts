import { AdminNavRoute, AuthRoute, MenuRoute, NavRoute, OldNavRoute, Route } from './routes';

export enum PermissionCategory {
  EVENT = 'EVENT',
  ROLE = 'ROLE',
  USER = 'USER',
  WIKI = 'WIKI',
  RULES = 'RULES',
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

export type Permissions = {
  [PermissionCategory.EVENT]?: EventSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.ROLE]?: RoleSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.USER]?: UserSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.WIKI]?: WikiSpecialPrivilege | CommonPermissionPrivilege;
  [PermissionCategory.RULES]?: RulesSpecialPrivilege | CommonPermissionPrivilege;
};

const permissionCategoryToPrivilege = {
  [PermissionCategory.EVENT]: eventPrivilege,
  [PermissionCategory.ROLE]: rolePrivilege,
  [PermissionCategory.USER]: userPrivilege,
  [PermissionCategory.WIKI]: wikiPrivilege,
  [PermissionCategory.RULES]: rulesPrivilege,
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
  [NavRoute.EVENTS]: { [PermissionCategory.EVENT]: eventPrivilege.READ },
  [OldNavRoute.TRADE]: {},
  [OldNavRoute.MODS]: {},
  [OldNavRoute.WORLD]: {},
  [NavRoute.WIKI]: {},
  [AdminNavRoute.MEMBERS]: { [PermissionCategory.USER]: userPrivilege.READ },
  [AdminNavRoute.NON_MEMBERS]: { [PermissionCategory.USER]: userPrivilege.READ },
  [AdminNavRoute.ROLES]: { [PermissionCategory.ROLE]: rolePrivilege.READ },
  [AdminNavRoute.WIKI_PROPOSALS]: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
  [AdminNavRoute.WIKI]: { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
  [MenuRoute.ADMIN]: [
    { [PermissionCategory.USER]: userPrivilege.READ },
    { [PermissionCategory.ROLE]: rolePrivilege.READ },
    { [PermissionCategory.WIKI]: wikiPrivilege.WRITE },
  ],
  [MenuRoute.ABOUT]: {},
  [AuthRoute.SIGNIN]: {},
};
