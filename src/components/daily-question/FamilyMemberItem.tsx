import CommonButton from "../common/CommonButton";
import lock from "../../../public/icon/lock.svg";
import down from "../../../public/icon/down.svg";

interface FamilyMember {
  userId: number;
  name: string;
  status: "locked" | "not_answered" | "answered";
  answer?: string;
}

interface FamilyMemberItemProps {
  member: FamilyMember;
  isAllAnswered: boolean;
  isExpanded: boolean;
  isNudged: boolean;
  onToggle: () => void;
  onNudge: () => void;
}

const FamilyMemberItem = ({
  member,
  isAllAnswered,
  isExpanded,
  isNudged,
  onToggle,
  onNudge,
}: FamilyMemberItemProps) => {
  return (
    <div
      className={`
        w-full
        bg-bg
        rounded-[4px]
        py-[16px] px-5
        flex flex-col gap-y-[8px]
        border-b border-[#EAEAEA]
      `}
    >
      {/* 상태에 따른 표시 */}
      {isAllAnswered && member.status === "answered" && (
        <>
          <div className="flex flex-row items-center justify-between">
            <div className="label-bold text-text">{member.name}</div>
            <button
              onClick={onToggle}
              className="w-[16px] h-[16px] flex items-center justify-center focus:outline-none"
            >
              <img
                src={down}
                alt="down"
                className={`w-[16px] h-[16px] transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div
            className={`px-[12px] body text-text overflow-hidden transition-all duration-300 ease-in-out ${
              !isExpanded ? "line-clamp-2" : ""
            }`}
            style={{
              maxHeight: isExpanded ? "1000px" : "2.8em",
            }}
          >
            {member.answer}
          </div>
        </>
      )}

      {!isAllAnswered && (
        <>
          {/* 멤버 이름 */}
          <div className="label-bold text-text">{member.name}</div>
        </>
      )}

      {!isAllAnswered && member.status === "locked" && (
        <div className="flex flex-row items-center gap-[4px] pl-[12px]">
          <img src={lock} alt="lock" className="w-[16px] h-[16px] items-center" />
          <div className="body text-sub-text">아직 답변 공개 전이에요.</div>
        </div>
      )}

      {!isAllAnswered && member.status === "not_answered" && (
        <div className="flex flex-row items-center justify-between px-[12px]">
          <div className="body text-sub-text">아직 답변을 작성하지 않았어요.</div>
          <CommonButton
            label="마음 두드리기"
            bgColor="bg-sub-1"
            textColor={isNudged ? "text-[#ffffff] body" : "text-text body"}
            className="!w-fit !rounded-[8px]"
            padding="px-4 py-2.5"
            onClick={onNudge}
            disabled={isNudged || false}
          />
        </div>
      )}
    </div>
  );
};

export default FamilyMemberItem;

