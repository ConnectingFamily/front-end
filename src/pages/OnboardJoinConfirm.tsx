import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import type { FamilyMember } from "../api/family";
import { joinFamily } from "../api/family";

const OnboardJoinConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const familyData = location.state?.familyData;

  useEffect(() => {
    if (!familyData) {
      navigate("/onboard/join", { replace: true });
    }
  }, [familyData, navigate]);

  if (!familyData) {
    return null;
  }

  const members = familyData.members || [];

  const handleConfirm = async () => {
    setIsLoading(true);
    setError("");

    try {
      await joinFamily(familyData.inviteCode);
      navigate("/onboard/profile");
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || "가족 합류 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader />

      <div className="flex-1 flex flex-col items-center px-[20px] pt-[7.1vh] overflow-y-auto">
        {/* 안내 문구 */}
        <div className="flex flex-col items-center gap-y-[8px] mb-[4.73vh]">
          <div className="title text-text text-center">
            입력한 코드로 찾은 가족이에요
          </div>
          <div className="label text-text text-center">
            가족 이름과 구성원이 맞는지 확인해주세요.
          </div>
        </div>

        <div className="w-[83.58vw] max-w-[350px] bg-sub-2 rounded-[8px] p-[16px]">
          <div className="mb-[3.79vh] flex flex-col items-center">
            <div className="label-bold text-text mb-[12px]">가족 이름</div>
            <div className="label text-text">{familyData.familyName}</div>
          </div>

          <div>
            <div className="label-bold text-text mb-[8px] text-center">
              가족 멤버 ({members.length})
            </div>
            <div className="flex flex-row justify-center items-end">
              {members.map((member: FamilyMember, index: number) => (
                <div
                  key={member.userId}
                  className="flex flex-col items-center gap-y-[4px] relative"
                  style={{
                    marginLeft: index > 0 ? "-20px" : "0",
                    zIndex: members.length - index,
                  }}
                >
                  <div className="w-[18.4vw] h-[18.4vw] max-w-[72px] max-h-[72px] rounded-[16px] bg-outline flex items-center justify-center border-[4px] border-sub-2">
                    {member.profileImageUrl ? (
                      <img
                        src={member.profileImageUrl}
                        alt={member.nickname}
                        className="w-full h-full rounded-[14px] object-cover"
                      />
                    ) : (
                      <div className="body text-sub-text">
                        {member.nickname.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="body text-text text-center whitespace-nowrap">
                    {member.nickname}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 body text-error text-center">
            {error}
          </div>
        )}
      </div>

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton
            label="맞아요!"
            onClick={handleConfirm}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardJoinConfirm;

