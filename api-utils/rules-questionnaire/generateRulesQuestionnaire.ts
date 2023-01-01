import { GeneratedRulesQuestionnaire } from 'data/application';
import generateRulesQuestionnaire from 'utils/generateRulesQuestionnaire';
import { getQuestions } from './getQuestions';

const getGeneratedRulesQuestionnaire = async (): Promise<GeneratedRulesQuestionnaire> => {
  const { preamble, questionsNumber, questionsByPositionType } = await getQuestions();

  return generateRulesQuestionnaire({ preamble, questionsNumber, ...questionsByPositionType });
};

export default getGeneratedRulesQuestionnaire;
