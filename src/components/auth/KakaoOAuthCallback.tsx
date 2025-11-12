import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLoginApi } from "../../api/auth";
import { setAccessToken, setRefreshToken } from "../../utils/token";

const KakaoOAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "error">("loading");
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) {
      return;
    }

    const handleKakaoLogin = async () => {
      hasProcessed.current = true;

      try {
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        if (!code) {
          setStatus("error");
          setTimeout(() => navigate("/login"), 2000);
          return;
        }

        const response = await kakaoLoginApi(code);

        if (response.data?.accessToken) {
          setAccessToken(response.data.accessToken);
        }
        if (response.data?.refreshToken) {
          setRefreshToken(response.data.refreshToken);
        }

        if (response.data?.isNewUser || !response.data?.hasFamily) {
          navigate("/onboard");
        } else {
          navigate("/home");
        }
      } catch (error: any) {
        const errorMessage = error?.response?.message || error?.message || "로그인 처리 중 오류가 발생했습니다.";
        alert(errorMessage);
        setStatus("error");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    handleKakaoLogin();
  }, [location.search, navigate]);

  return (
    <div className="w-full h-screen bg-bg flex flex-col items-center justify-center">
      {status === "loading" ? (
        <div className="body text-text">카카오 로그인 처리 중...</div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <div className="body text-error">로그인 처리 중 오류가 발생했습니다.</div>
          <div className="caption text-sub-text">잠시 후 로그인 페이지로 이동합니다.</div>
        </div>
      )}
    </div>
  );
};

export default KakaoOAuthCallback;

