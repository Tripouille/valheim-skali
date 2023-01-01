import { ObjectId } from 'bson';

/* Main types */

export enum QuestionType {
  SIMPLE = 'simple',
  LONG = 'long',
  SINGLE_CHOICE = 'single-choice',
  MULTIPLE_CHOICE = 'multiple-choice',
}

export enum QuestionPositionType {
  BEGINNING = 'beginning',
  RANDOM = 'random',
  END = 'end',
}

type QuestionCore<T extends string | ObjectId = string> = {
  _id: T;
  label: string;
  positionType: QuestionPositionType;
  alwaysIncluded: boolean;
};

export type SimpleQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'simple';
};
export type LongQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'long';
};
export type SingleChoiceQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'single-choice';
  options: string[];
};
export type MultipleChoiceQuestion<T extends string | ObjectId = string> = QuestionCore<T> & {
  type: 'multiple-choice';
  options: string[];
};
export type MCQQuestion<T extends string | ObjectId = string> =
  | SingleChoiceQuestion<T>
  | MultipleChoiceQuestion<T>;

export type Question<T extends string | ObjectId = string> =
  | SimpleQuestion<T>
  | LongQuestion<T>
  | MCQQuestion<T>;

export type CreateQuestionData =
  | Omit<SimpleQuestion, '_id'>
  | Omit<LongQuestion, '_id'>
  | Omit<MCQQuestion, '_id'>;

export interface RulesQuestionnaireConfigInDb {
  _id: ObjectId;
  type: 'config';
  preamble: string;
  questionsNumber: number;
}

export interface RulesQuestionnaireQuestionTypeObjectInDb {
  _id: ObjectId;
  positionType: QuestionPositionType;
  questions: Question<ObjectId>[];
}

export type RulesQuestionnaire<T extends string | ObjectId = string> = {
  preamble: string;
  questionsNumber: number;
} & {
  [key in QuestionPositionType]: Question<T>[];
};

/* Database */

export const rulesQuestionnaireCollectionName = 'rules-questionnaire';

/* Default values */

export const DEFAULT_QUESTIONS_NUMBER = 10;

/* Labels */

export const QUESTION_TYPE_TO_LABEL: Record<QuestionType, string> = {
  simple: 'Simple',
  long: 'Longue',
  'single-choice': 'Choix unique',
  'multiple-choice': 'Choix multiple',
};

export const QUESTION_TYPE_TO_EXPLANATION: Record<QuestionType, string> = {
  simple: 'Destiné à une courte réponse libre, qui tiendra sur une ligne',
  long: 'Destiné à une longue réponse libre, qui peut prendre plusieurs lignes',
  'single-choice': 'Doit choisir une seule option parmi une liste de choix',
  'multiple-choice': 'Doit choisir une à plusieurs options parmi une liste de choix',
};

export const QUESTION_POSITION_TO_LABEL: Record<QuestionPositionType, string> = {
  random: 'Aléatoire',
  beginning: 'Au début du questionnaire',
  end: 'A la fin du questionnaire',
};

/* Validation */

export const isQuestionValid = (question: Partial<CreateQuestionData>) => {
  if (!question.type || !question.label?.trim().length || question.alwaysIncluded == null)
    return false;
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
    positionType: question.positionType,
    label: question.label,
    ...(question.type === 'single-choice' || question.type === 'multiple-choice'
      ? { options: question.options }
      : {}),
    alwaysIncluded: question.alwaysIncluded,
  } as CreateQuestionData);
