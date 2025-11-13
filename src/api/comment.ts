import apiClient from "./axios";
import type { ApiResponse } from "./axios";

export interface CommentItem {
  commentId: number;
  dailyQuestionId: number;
  userId: number;
  userNickname: string;
  content: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse extends ApiResponse<CommentItem[]> {}

export const getComments = async (
  dailyQuestionId: number
): Promise<CommentsResponse> => {
  const response = await apiClient.get<CommentsResponse>("/api/comments", {
    params: { dailyQuestionId },
  });
  return response.data;
};

export interface CreateCommentRequest {
  dailyQuestionId: number;
  content: string;
  type: "TEXT" | "EMOJI" | "BOTH";
}

export interface CreateCommentResponse extends ApiResponse<CommentItem> {}

export const createComment = async (
  request: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  const response = await apiClient.post<CreateCommentResponse>("/api/comments", request);
  return response.data;
};

export interface UpdateCommentRequest {
  content: string;
  type: "TEXT" | "EMOJI" | "BOTH";
}

export interface UpdateCommentResponse extends ApiResponse<CommentItem> {}

export const updateComment = async (
  commentId: number,
  request: UpdateCommentRequest
): Promise<UpdateCommentResponse> => {
  const response = await apiClient.put<UpdateCommentResponse>(
    `/api/comments/${commentId}`,
    request
  );
  return response.data;
};

export interface DeleteCommentResponse extends ApiResponse<string> {}

export const deleteComment = async (
  commentId: number
): Promise<DeleteCommentResponse> => {
  const response = await apiClient.delete<DeleteCommentResponse>(
    `/api/comments/${commentId}`
  );
  return response.data;
};

