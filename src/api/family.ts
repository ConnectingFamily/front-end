import { getAccessToken } from "../utils/token";

export interface FamilyMember {
  userId: number;
  nickname: string;
  profileImageUrl: string;
}

export interface FamilySearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    familyId: number;
    familyName: string;
    inviteCode: string;
    memberCount: number;
    members: FamilyMember[];
  };
  success: boolean;
}

export interface FamilyCreateRequest {
  familyName: string;
}

export interface FamilyCreateResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    familyId: number;
    familyName: string;
    inviteCode: string;
    createdBy: number;
    createdAt: string;
  };
  success: boolean;
}

export const searchFamilyByInviteCode = async (
  inviteCode: string
): Promise<FamilySearchResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const url = `${API_BASE_URL}/api/families/search?invite-code=${encodeURIComponent(inviteCode)}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const responseText = await response.text();

  let data: FamilySearchResponse;
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

export const createFamily = async (
  familyName: string
): Promise<FamilyCreateResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const url = `${API_BASE_URL}/api/families`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const requestBody: FamilyCreateRequest = {
    familyName: familyName.trim(),
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  let data: FamilyCreateResponse;
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

export interface JoinFamilyRequest {
  inviteCode: string;
}

export interface JoinFamilyResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    familyId: number;
    familyName: string;
    inviteCode: string;
    memberId: number;
    role: string;
    joinedAt: string;
  };
  success: boolean;
}

export const joinFamily = async (
  inviteCode: string
): Promise<JoinFamilyResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const url = `${API_BASE_URL}/api/families/join`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const requestBody: JoinFamilyRequest = {
    inviteCode: inviteCode,
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  let data: JoinFamilyResponse;
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

