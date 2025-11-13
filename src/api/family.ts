import apiClient from "./axios";
import type { ApiResponse } from "./axios";

export interface FamilyMember {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface FamilySearchResponse extends ApiResponse<{
  familyId: number;
  familyName: string;
  inviteCode: string;
  memberCount: number;
  members: FamilyMember[];
}> {}

export interface FamilyCreateRequest {
  familyName: string;
}

export interface FamilyCreateResponse extends ApiResponse<{
  familyId: number;
  familyName: string;
  inviteCode: string;
  createdBy: number;
  createdAt: string;
}> {}

export const searchFamilyByInviteCode = async (
  inviteCode: string
): Promise<FamilySearchResponse> => {
  const response = await apiClient.get<FamilySearchResponse>("/api/families/search", {
    params: { "invite-code": inviteCode },
  });
  return response.data;
};

export const createFamily = async (
  familyName: string
): Promise<FamilyCreateResponse> => {
  const response = await apiClient.post<FamilyCreateResponse>("/api/families", {
    familyName: familyName.trim(),
  });
  return response.data;
};

export interface JoinFamilyRequest {
  inviteCode: string;
}

export interface JoinFamilyResponse extends ApiResponse<{
  familyId: number;
  familyName: string;
  inviteCode: string;
  memberId: number;
  role: string;
  joinedAt: string;
}> {}

export const joinFamily = async (
  inviteCode: string
): Promise<JoinFamilyResponse> => {
  const response = await apiClient.post<JoinFamilyResponse>("/api/families/join", {
    inviteCode,
  });
  return response.data;
};

