import { NextApiHandler } from 'next';
import { ServerException } from 'api-utils/common';
import createQuestion from 'api-utils/rules-questionnaire/createQuestion';
import getQuestions from 'api-utils/rules-questionnaire/getQuestions';

const rulesQuestionnaireHandler: NextApiHandler = async (req, res) => {
  try {
    if (req.method === 'GET') {
      await getQuestions(req, res);
    } else if (req.method === 'POST') {
      await createQuestion(req, res);
    } else {
      throw new ServerException(501);
    }
  } catch (e) {
    if (e instanceof ServerException) res.status(e.statusCode).end();
    else throw e;
  }
};

export default rulesQuestionnaireHandler;
