import { NextApiRequest as Req, NextApiResponse as Res } from 'next';
import { requirePermissions } from 'api-utils/auth';
import { ServerException } from 'api-utils/common';
import db from 'api-utils/db';
import { PreambleInDb, rulesQuestionnaireCollectionName } from 'data/rulesQuestionnaire';
import { PermissionCategory, rulesQuestionnairePrivilege } from 'utils/permissions';

const editPreamble = async (req: Req, res: Res) => {
  await requirePermissions(
    { [PermissionCategory.RULES_QUESTIONNAIRE]: rulesQuestionnairePrivilege.MANAGE },
    req,
  );

  const newLabel = req.body.preamble;
  if (typeof newLabel !== 'string') throw new ServerException(400);

  const result = await db.replaceOne<PreambleInDb>(
    rulesQuestionnaireCollectionName,
    { type: 'preamble' },
    { type: 'preamble', label: newLabel },
  );
  if (!result.ok) throw new ServerException(500);

  res.status(200).end();
};

export default editPreamble;
