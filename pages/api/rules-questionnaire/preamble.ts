import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import editPreamble from 'api-utils/rules-questionnaire/editPreamble';

const rulesQuestionnairePreambleHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await editPreamble(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rulesQuestionnairePreambleHandler;
