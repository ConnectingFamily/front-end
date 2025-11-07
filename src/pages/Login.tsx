import { useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import logo from "../../public/icon/logoForLogin.webp";
import hearts from "../../public/icon/heartToHeart.svg";

const Login = () => {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 API 연동
    // 기존 유저면 -> /home
    // 신규 유저면 -> /onboard
    navigate("/onboard");
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
