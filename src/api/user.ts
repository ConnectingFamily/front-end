import { getAccessToken } from "../utils/token";

export interface UpdateProfileRequest {
  nickname?: string;
  profileImageUrl?: string;
}

export interface UpdateProfileResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
    updatedAt: string;
  };
  success: boolean;
}

export const updateProfile = async (
  request: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const url = `${API_BASE_URL}/api/users/profile`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(request),
  });

  const responseText = await response.text();

  let data: UpdateProfileResponse;
  try {
    data = JSON.parse(responseText);
  } catch (parseError) {
    throw new Error(responseText || `HTTP error! status: ${response.status}`);
  }

  if (!response.ok || !data.isSuccess) {
    const error = new Error(data.message || `HTTP error! status: ${response.status}`);
    (error as any).response = data;
    (error as any).status = response.status;
    throw error;
  }

  return data;
};

