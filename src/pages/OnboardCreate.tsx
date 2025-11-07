import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";

const OnboardCreate = () => {
  const navigate = useNavigate();
  const [familyName, setFamilyName] = useState("");
  const MAX_FAMILY_NAME_LENGTH = 10;

  const handleNext = () => {
    if (!familyName.trim()) return;
    
    // TODO: 가족 생성 API 호출
    // 생성 성공 시 가족 코드 받아서 다음 페이지로 전달
    navigate("/onboard/create/complete", {
      state: { familyName: familyName.trim() },
    });
  };

  const isFormValid = familyName.trim().length > 0;

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader />

      <div className="flex-1 flex flex-col items-center px-[20px] pt-[7.1vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-y-[8px] mb-[4.73vh]">
          <div className="title text-text text-center">새로운 마음방 만들기</div>
          <div className="label text-text text-center">
            가족과 함께 마음을 나누는 공간을 만들어보세요.
          </div>
        </div>

        <div className="w-full max-w-[350px]">
          <div className="label-bold text-text mb-[12px]">가족 이름</div>
          <div className="relative">
            <input
              type="text"
              value={familyName}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_FAMILY_NAME_LENGTH) {
                  setFamilyName(value);
                }
              }}
              placeholder="우리 가족만의 이름을 지어주세요."
              className="w-full h-11 px-3 pr-12 border border-outline rounded body bg-bg focus:outline-none"
              maxLength={MAX_FAMILY_NAME_LENGTH}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 caption text-sub-text">
              {familyName.length}/{MAX_FAMILY_NAME_LENGTH}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton
            label="다음"
            onClick={handleNext}
            disabled={!isFormValid}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardCreate;

