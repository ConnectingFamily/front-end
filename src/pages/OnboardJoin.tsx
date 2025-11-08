import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";

const OnboardJoin = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!code.trim()) { // 추후 백엔드 api 연동시 에러코드 확인 후 핸들링 예정
      setError("코드가 정확한지 다시 한 번 확인해주세요.");
      return;
    }

    // TODO: 초대 코드 검증 API 호출
    // 검증 성공 시
    navigate("/onboard/join/confirm");
    
    // 검증 실패 시
    // setError("코드가 정확한지 다시 한 번 확인해주세요.");
  };

  return (
    <div className="w-full h-screen bg-bg relative flex flex-col items-center">
      <SubHeader />

      <div className="flex flex-col items-center w-full max-w-[350px] px-5 pt-[7.1vh]">
        <div className="flex flex-row items-center gap-2 mb-4">
          <div className="title text-text">초대 코드로 우리 가족 찾기 💌</div>
        </div>

        <div className="flex flex-col items-center gap-y-1 mb-8">
          <div className="label text-text text-center">
            이미 가족이 당신을 기다리고 있어요. <br />
            초대받은 코드를 입력하면 바로 합류할 수 있어요.
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[8px] w-full mb-[8px] px-[5.1vw] max-px-20">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="초대 코드를 입력해주세요"
            className="flex-1 w-[69.23vw] max-w-[270px] h-11 px-3 border border-outline rounded body bg-bg focus:outline-none"
          />
          <CommonButton
            label="확인"
            onClick={handleSubmit}
            className="w-[18.46vw] max-w-[72px] h-11"
            textColor="text-[#ffffff] label-bold"
            disabled={!code.trim()}
          />
        </div>
        {error && (
          <div className="w-full text-left body text-error px-[5.1vw] max-px-20">
            {error}
          </div>
        )} 
    </div>
  );
};

export default OnboardJoin;

