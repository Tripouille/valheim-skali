import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import editQuestionsNumber from 'api-utils/rules-questionnaire/editQuestionsNumber';

const rulesQuestionnairePreambleHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await editQuestionsNumber(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rulesQuestionnairePreambleHandler;
