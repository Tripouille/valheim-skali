import { ObjectId } from 'bson';

/* Main types */

export interface PreambleInDb {
  _id: ObjectId;
  type: 'preamble';
  label: string;
}

export enum QuestionType {
  SIMPLE = 'simple',
  LONG = 'long',
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
}

interface QuestionCore<T extends string | ObjectId = string> {
  _id: T;
  label: string;
}

export type SimpleQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'simple' | 'long';
};
export type MCQQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'single-choice' | 'multiple-choice';
  options: string[];
};

export type Question<T extends string | ObjectId = string> = SimpleQuestion<T> | MCQQuestion<T>;

export type CreateQuestionData = Omit<SimpleQuestion, '_id'> | Omit<MCQQuestion, '_id'>;

export interface RulesQuestionnaire {
  preamble: string;
  questions: Question[];
}

/* Database */

export const rulesQuestionnaireCollectionName = 'rules-questionnaire';

/* Labels */

export const QUESTION_TYPE_TO_LABEL: Record<QuestionType, string> = {
  simple: 'Simple',
  long: 'Long',
  'single-choice': 'Choix unique',
  'multiple-choice': 'Choix multiple',
};

export const QUESTION_TYPE_TO_EXPLANATION: Record<QuestionType, string> = {
  simple: 'Destiné à une courte réponse libre, qui tiendra sur une ligne',
  long: 'Destiné à une longue réponse libre, qui peut prendre plusieurs lignes',
  'single-choice': 'Doit choisir une seule option parmi une liste de choix',
  'multiple-choice': 'Doit choisir une à plusieurs options parmi une liste de choix',
};

/* Validation */

export const isQuestionValid = (question: Partial<CreateQuestionData>) => {
  if (!question.type || !question.label?.trim().length) return false;
  if (question.type === 'single-choice' || question.type === 'multiple-choice')
    return (
      !!question.options &&
      question.options.length >= 2 &&
      !question.options.some(
        (option, index) =>
          !option.trim().length ||
          question.options?.some(
            (otherOption, otherIndex) =>
              index !== otherIndex && otherOption.trim() === option.trim(),
          ),
      )
    );
  return true;
};

export const getCreateQuestionDataForServer = (question: Partial<CreateQuestionData>) =>
  ({
    type: question.type,
    label: question.label,
    ...(question.type === 'single-choice' || question.type === 'multiple-choice'
      ? { options: question.options }
      : {}),
  } as CreateQuestionData);
