import apiClient from "./axios";
import type { ApiResponse } from "./axios";

export interface KakaoLoginResponse extends ApiResponse<{
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  hasFamily: boolean;
}> {}

export const kakaoLoginApi = async (
  authorizationCode: string
): Promise<KakaoLoginResponse> => {
  const response = await apiClient.post<KakaoLoginResponse>("/api/auth/kakao/login", {
    authorizationCode,
  });
  return response.data;
};

