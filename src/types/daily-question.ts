export interface FamilyMember {
  userId: number;
  name: string;
  status: "locked" | "not_answered" | "answered";
  answer?: string;
}

export interface Comment {
  id: number;
  userId: number;
  userName: string;
  timeAgo: string;
  emoji?: string;
  content: string;
  hasContent: boolean;
}

export interface Emoji {
  id: string;
  label: string;
  src: string;
}

export interface QuestionData {
  dailyQuestionId: number;
  questionNumber: number;
  question: string;
  isAllAnswered: boolean;
  myAnswered: boolean;
  myAnswer: string;
}

