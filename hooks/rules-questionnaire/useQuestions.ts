import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useSession from 'hooks/useSession';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';
import { QueryKeys, QueryTypes } from 'utils/queryClient';
import { APIRoute } from 'utils/routes';

const getQuestionsFromServer = async (): Promise<QueryTypes[QueryKeys.RULES_QUESTIONS]> => {
  const { data } = await axios.get<QueryTypes[QueryKeys.RULES_QUESTIONS]>(
    APIRoute.RULES_QUESTIONNAIRE,
  );
  return data;
};

const useQuestions = () => {
  const session = useSession();

  const query = useQuery([QueryKeys.RULES_QUESTIONS], getQuestionsFromServer, {
    enabled: session.hasRequiredPermissions({
      [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE,
    }),
  });

  return query;
};

export default useQuestions;
