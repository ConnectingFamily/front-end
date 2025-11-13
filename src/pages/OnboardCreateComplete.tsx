import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import check from "../../public/icon/check.svg";

const OnboardCreateComplete = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const familyName = location.state?.familyName || "";
  const inviteCode = location.state?.inviteCode || "";

  useEffect(() => {
    if (!familyName || !inviteCode) {
      navigate("/onboard/create", { replace: true });
    }
  }, [familyName, inviteCode, navigate]);

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const handleNext = () => {
    navigate("/onboard/profile");
  };

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader />

      <div className="flex-1 flex flex-col items-center px-[20px] pt-[7.1vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-y-[8px] mb-[4.73vh]">
          <div className="title text-text text-center">
            새로운 마음방이 생성되었어요!
          </div>
          <div className="label text-text text-center">
            아래 초대코드를 가족에게 보내 초대해주세요.
          </div>
        </div>

        <div className="w-full max-w-[350px] mb-[12px]">
          <div className="label text-text text-left">{familyName}</div>
        </div>

        <div className="w-full max-w-[350px]">
          <div className="flex flex-row gap-[8px]">
            <input
              type="text"
              value={inviteCode}
              readOnly
              className="flex-1 h-11 px-3 border border-outline rounded body bg-bg focus:outline-none"
            />
            <CommonButton
              label="복사"
              onClick={handleCopy}
              className="px-[22px] h-11 focus:outline-none"
              textColor="text-[#ffffff] label-bold"
              width="w-auto"
            />
          </div>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-[calc(4vh+70px)] left-1/2 transform -translate-x-1/2 bg-[#00000066] text-white py-3 px-5 rounded-full flex flex-row items-center gap-1 body shadow-[2px_2px_4px_0_rgba(0,0,0,0.12)]">
          <img src={check} alt="check" className="w-[20px] h-[20px]" />
          <span>복사가 완료되었습니다.</span>
        </div>
      )}

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton label="다음" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

export default OnboardCreateComplete;

