import apiClient from "./axios";
import type { ApiResponse } from "./axios";

export interface UpdateProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
}

export interface UpdateProfileResponse extends ApiResponse<{
  userId: number;
  nickname: string;
  profileImageUrl: string;
  updatedAt: string;
}> {}

export const updateProfile = async (
  request: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.patch<UpdateProfileResponse>("/api/users/profile", request);
  return response.data;
};

