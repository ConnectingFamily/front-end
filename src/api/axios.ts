import axios, { AxiosError } from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "../utils/token";

// 공통 API 응답 타입
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  code: string;
  message: string;
  data: T;
  success: boolean;
}

// axios 인스턴스 생성
// 프로덕션에서는 Vercel Functions 프록시 사용 (HTTPS → HTTP 문제 해결)
// 로컬 개발 환경에서는 직접 API 서버 호출
const getBaseURL = () => {
  // 프로덕션 환경 (Vercel) - 무조건 프록시 사용
  if (import.meta.env.PROD) {
    return "/api/proxy";
  }
  // 개발 환경 - 직접 API 서버 호출
  return import.meta.env.VITE_API_URL || "http://localhost:8080";
};

const apiClient: AxiosInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: 에러 처리 통일
apiClient.interceptors.response.use(
  (response) => {
    // 응답이 성공적이지만 isSuccess가 false인 경우
    const data = response.data as ApiResponse;
    if (data && typeof data === "object" && "isSuccess" in data && !data.isSuccess) {
      const error = new Error(data.message || "API 요청이 실패했습니다.");
      (error as any).response = data;
      (error as any).status = response.status;
      return Promise.reject(error);
    }
    return response;
  },
  (error: AxiosError) => {
    // 네트워크 에러 또는 기타 에러 처리
    if (error.response) {
      // 서버에서 응답을 받았지만 에러 상태 코드
      const data = error.response.data as ApiResponse;
      if (data && typeof data === "object" && "message" in data) {
        const apiError = new Error(data.message || `HTTP error! status: ${error.response.status}`);
        (apiError as any).response = data;
        (apiError as any).status = error.response.status;
        return Promise.reject(apiError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

