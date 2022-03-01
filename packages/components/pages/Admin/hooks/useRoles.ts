import { useQuery } from 'react-query';
import axios from 'axios';
import { Role } from '@packages/data/role';
import { APIRoute } from '@packages/utils/routes';
import { QueryKeys } from '@packages/utils/queryClient';

export const getRoles = async () => {
  const { data } = await axios.get(APIRoute.ROLES);
  return data;
};

export const useRoles = (): Role[] => {
  const fallback: Role[] = [];
  const { data: roles = fallback } = useQuery(QueryKeys.ROLES, getRoles);

  return roles;
};
