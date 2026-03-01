export interface Worksheet {
  id: string;
  title: string;
  subject: Subject;
  gradeLevel: GradeLevel;
  topic: string;
  description: string;
  thumbnail: string;
  questionType: QuestionType;
  difficulty: Difficulty;
  commonCoreStandard?: string;
  downloadCount: number;
  rating: number;
  createdAt: string;
  isPremium: boolean;
}

export type Subject = 'Math' | 'ELA' | 'Science' | 'Social Studies' | 'Art';
export type GradeLevel = 'Pre-K' | 'K' | '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th';
export type QuestionType = 'Multiple Choice' | 'Fill in the Blank' | 'Matching' | 'Short Answer' | 'Crossword' | 'Word Problem';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface GeneratedWorksheet {
  title: string;
  instructions: string;
  content: WorksheetQuestion[];
  answer_key: AnswerKeyItem[];
}

export interface WorksheetQuestion {
  number: number;
  question: string;
  options?: string[];
  type: QuestionType;
}

export interface AnswerKeyItem {
  number: number;
  answer: string;
}

export interface GeneratorOptions {
  prompt: string;
  gradeLevel: GradeLevel;
  subject: Subject;
  questionType: QuestionType;
  difficulty: Difficulty;
  theme: string;
  numberOfQuestions: number;
}
