import { NextApiHandler } from 'next';
import getMyApplication from 'api-utils/applications/getMyApplication';
import saveMyQuestionnaire from 'api-utils/applications/saveMyQuestionnaire';
import validateMyQuestionnaire from 'api-utils/applications/validateMyQuestionnaire';
import { ServerException } from 'api-utils/common';

const myApplicationHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getMyApplication(req, res);
    } else if (req.method === 'PATCH') {
      if ('questionnaireAnswers' in req.body) await saveMyQuestionnaire(req, res);
      else if ('validateQuestionnaire' in req.body) await validateMyQuestionnaire(req, res);
      else throw new ServerException(400);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default myApplicationHandler;
