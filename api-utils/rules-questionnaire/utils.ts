import { isRequiredObjectType, ServerException } from 'api-utils/common';
import { CreateQuestionData, QuestionPositionType, QuestionType } from 'data/rulesQuestionnaire';

const questionKeyToValueTypeCheck: Record<
  keyof CreateQuestionData | 'options',
  (value: unknown) => boolean
> = {
  label: value => typeof value === 'string',
  type: value =>
    typeof value === 'string' && Object.values(QuestionType).includes(value as QuestionType),
  options: value =>
    value === undefined ||
    (Array.isArray(value) && value.every(option => typeof option === 'string')),
  positionType: value =>
    typeof value === 'string' &&
    Object.values(QuestionPositionType).includes(value as QuestionPositionType),
  alwaysIncluded: value => typeof value === 'boolean',
};

const isCreateQuestionData = (data: unknown): data is CreateQuestionData => {
  if (!isRequiredObjectType(data, questionKeyToValueTypeCheck)) return false;
  if (data.label.length === 0) return false;
  if (data.type === 'single-choice' || data.type === 'multiple-choice') {
    return (
      Array.isArray(data.options) &&
      data.options.length >= 2 &&
      data.options.every(option => typeof option === 'string') &&
      data.options.every((option, index, options) => options.indexOf(option) === index)
    );
  } else {
    return data.options === undefined;
  }
};

export const getQuestionFromBody = async (body: unknown): Promise<CreateQuestionData> => {
  if (!isCreateQuestionData(body)) throw new ServerException(400);
  return body;
};
