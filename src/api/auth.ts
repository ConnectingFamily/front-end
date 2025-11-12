export interface KakaoLoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
    hasFamily: boolean;
  };
  success: boolean;
}

export const kakaoLoginApi = async (
  authorizationCode: string
): Promise<KakaoLoginResponse> => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const url = `${API_BASE_URL}/api/auth/kakao/login`;

  const requestBody = {
    authorizationCode: authorizationCode,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  const responseText = await response.text();

  let data: KakaoLoginResponse;
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

