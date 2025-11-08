import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, []);
  return (
    <div className="w-full h-screen bg-bg flex items-center justify-center">
      {/* 스플래시 화면 - 로딩 애니메이션 또는 로고 표시 */}
      <div className="font-aggro text-[#FE7171] font-black text-2xl">
        이심전심
      </div>
    </div>
  );
};

export default Splash;

