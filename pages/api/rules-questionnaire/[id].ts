import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import deleteQuestion from 'api-utils/rules-questionnaire/deleteQuestion';
import editQuestion from 'api-utils/rules-questionnaire/editQuestion';

const rulesQuestionnaireHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'PUT') {
      await editQuestion(req, res);
    } else if (req.method === 'DELETE') {
      await deleteQuestion(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rulesQuestionnaireHandler;
