import CommonButton from "../components/common/CommonButton";
import logo from "../../public/icon/logoForLogin.webp";
import hearts from "../../public/icon/heartToHeart.svg";

const Login = () => {
  const handleKakaoLogin = () => {
    const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    
    if (!KAKAO_CLIENT_ID) {
      alert("환경 변수가 설정되지 않았습니다. .env 파일을 확인해주세요.");
      return;
    }
    
    const currentOrigin = window.location.origin;
    const REDIRECT_URL = `${currentOrigin}/login/oauth2/code/kakao`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URL)}&response_type=code`;
    
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FFF3E7] to-[#FFFEFC] flex flex-col items-center px-[5vw] max-px-5">
      <div className="flex flex-col items-center mt-[36.49vh]">
        <div className="flex w-[38.5vw] max-w-[150.3px] aspect-[150.3/24] mb-[2.8vh] max-mb-24">
          <img src={logo} alt="logo" className="w-full h-full object-cover" />
        </div>

        <div className="flex w-[66vw] max-w-[257.14px] aspect-[257.14/80]">
          <img src={hearts} alt="hearts" className="w-full h-full object-cover" />
        </div>
      </div>

      <CommonButton
        label="카카오로 시작하기"
        bgColor="bg-[#FAE100]"
        textColor="text-text"
        onClick={handleKakaoLogin}
        className="w-full title shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)] mt-[30.8vh] max-mt-260"
      />
    </div>
  );
};

export default Login;
