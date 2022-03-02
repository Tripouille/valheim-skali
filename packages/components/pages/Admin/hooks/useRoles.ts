import { useQuery } from 'react-query';
import axios from 'axios';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys, QueryTypes } from '@packages/utils/queryClient';
import { Role } from '@packages/data/role';

export const getRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get<Role[]>(APIRoute.ROLES);
  return data;
};

export const useRoles = (): QueryTypes[QueryKeys.ROLES] => {
  const fallback: QueryTypes[QueryKeys.ROLES] = [];
  const { data: roles = fallback } = useQuery(QueryKeys.ROLES, getRoles);

  return roles;
};
