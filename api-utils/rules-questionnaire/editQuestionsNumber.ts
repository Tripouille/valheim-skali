import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import {
  RulesQuestionnaireConfigInDb,
  rulesQuestionnaireCollectionName,
} from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';

const editQuestionsNumber = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const questionsNumber = req.body.number;
  if (typeof questionsNumber !== 'number') throw new ServerException(400);

  const result = await db.updateOne<RulesQuestionnaireConfigInDb>(
    rulesQuestionnaireCollectionName,
    { type: 'config' },
    { $set: { type: 'config', questionsNumber: questionsNumber } },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default editQuestionsNumber;
