import { useNavigate } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";

const OnboardJoinConfirm = () => {
  const navigate = useNavigate();

  // TODO: API에서 가족 정보 받아오기
  const familyData = {
    name: "햇살같은 우리집",
    members: [
      { name: "김미숙", role: "엄마", avatar: "" },
      { name: "묌묌묌", role: "", avatar: "" },
      { name: "아빠", role: "", avatar: "" },
      { name: "동생", role: "", avatar: "" },
      { name: "동생", role: "", avatar: "" },
    ],
  };

  const handleConfirm = () => {
    // TODO: 가족 합류 API 호출
    navigate("/onboard/profile");
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
            <div className="label text-text">{familyData.name}</div>
          </div>

          <div>
            <div className="label-bold text-text mb-[8px] text-center">
              가족 멤버 ({familyData.members.length})
            </div>
            <div className="flex flex-row justify-center items-end">
              {familyData.members.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-y-[4px] relative"
                  style={{
                    marginLeft: index > 0 ? "-20px" : "0",
                    zIndex: familyData.members.length - index,
                  }}
                >
                  <div className="w-[18.4vw] h-[18.4vw] max-w-[72px] max-h-[72px] rounded-[16px] bg-outline flex items-center justify-center border-[4px] border-sub-2">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full rounded-[14px] object-cover"
                      />
                    ) : (
                      <div className="body text-sub-text">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="caption text-text text-center whitespace-nowrap">
                    {member.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-[20px] pb-[4vh]">
        <div className="w-full max-w-[350px] mx-auto">
          <CommonButton
            label="맞아요!"
            onClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardJoinConfirm;

