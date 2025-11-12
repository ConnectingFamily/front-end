import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import { createFamily } from "../api/family";

const OnboardCreate = () => {
  const navigate = useNavigate();
  const [familyName, setFamilyName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MAX_FAMILY_NAME_LENGTH = 10;

  const handleNext = async () => {
    if (!familyName.trim()) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await createFamily(familyName.trim());
      
      navigate("/onboard/create/complete", {
        state: {
          familyName: response.data.familyName,
          inviteCode: response.data.inviteCode,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || "가족 생성 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
                  setError("");
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
          {error && (
            <div className="mt-2 body text-error">
              {error}
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton
            label="다음"
            onClick={handleNext}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardCreate;

