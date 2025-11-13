import down from "../../../public/icon/down.svg";

interface MyAnswerCardProps {
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

const MyAnswerCard = ({ answer, isExpanded, onToggle }: MyAnswerCardProps) => {
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
      {/* 멤버 이름 */}
      <div className="flex flex-row items-center justify-between">
        <div className="label-bold text-text">나</div>
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
        {answer}
      </div>
    </div>
  );
};

export default MyAnswerCard;

