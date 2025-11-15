import apiClient from "./axios";
import type { ApiResponse } from "./axios";

export interface QuestionMember {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  answered: boolean;
  answerContent?: string;
}

export interface TodayQuestionResponse extends ApiResponse<{
  dailyQuestionId: number;
  questionId: number;
  questionNumber: number;
  questionText: string;
  counselingTechnique: string;
  description: string;
  exampleAnswer: string;
  isAllAnswered: boolean;
  assignedDate: string;
  members: QuestionMember[];
}> {}

export interface FamilyAnswer {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  createdAt: string;
}

export interface FamilyAnswersResponse extends ApiResponse<FamilyAnswer[]> {}

export const getTodayQuestion = async (): Promise<TodayQuestionResponse> => {
  const response = await apiClient.get<TodayQuestionResponse>("/api/daily-questions/today");
  return response.data;
};

export const getFamilyAnswers = async (
  dailyQuestionId: number
): Promise<FamilyAnswersResponse> => {
  const response = await apiClient.get<FamilyAnswersResponse>(
    `/api/daily-questions/${dailyQuestionId}/answers`
  );
  return response.data;
};

export interface DraftAnswerRequest {
  content: string;
}

export interface DraftAnswerResponse extends ApiResponse<{
  originalAnswer: string;
  improvedAnswer: string;
  emotion: string;
  feedback: string[];
}> {}

export const createDraftAnswer = async (
  dailyQuestionId: number,
  content: string
): Promise<DraftAnswerResponse> => {
  const response = await apiClient.post<DraftAnswerResponse>(
    `/api/daily-questions/${dailyQuestionId}/answers/draft`,
    { content: content.trim() }
  );
  return response.data;
};

export interface SubmitFinalAnswerRequest {
  finalContent: string;
}

export interface SubmitFinalAnswerResponse extends ApiResponse<string> {}

export const submitFinalAnswer = async (
  dailyQuestionId: number,
  finalContent: string
): Promise<SubmitFinalAnswerResponse> => {
  const response = await apiClient.patch<SubmitFinalAnswerResponse>(
    `/api/daily-questions/${dailyQuestionId}/answers`,
    { finalContent: finalContent.trim() }
  );
  return response.data;
};

export interface DeleteAnswerResponse extends ApiResponse<string> {}

export const deleteAnswer = async (
  dailyQuestionId: number
): Promise<DeleteAnswerResponse> => {
  const response = await apiClient.delete<DeleteAnswerResponse>(
    `/api/daily-questions/${dailyQuestionId}/answers`
  );
  return response.data;
};

