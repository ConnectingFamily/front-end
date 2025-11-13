import CommonButton from "../common/CommonButton";

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  myAnswered: boolean;
  onAnswerClick: () => void;
}

const QuestionCard = ({
  questionNumber,
  question,
  myAnswered,
  onAnswerClick,
}: QuestionCardProps) => {
  return (
    <div
      className="w-full
        bg-gradient-to-b from-[#FFFFFD] to-[#FFF6ED]
        rounded-b-[20px]
        shadow-[0_4px_8px_rgba(0,0,0,0.08)]
        flex flex-col gap-y-[1.42vh] max-gap-y-[12px]
        pt-[60px] px-5 pb-6"
    >
      {/* 질문 번호 */}
      <div className="bg-sub-1 text-main py-1 px-2 w-fit rounded">
        Q{questionNumber}
      </div>

      {/* 질문 텍스트 */}
      <div className="title text-text break-keep break-words">
        {question}
      </div>

      {/* 답변하러 가기 버튼 */}
      {!myAnswered && (
        <CommonButton
          label="답변하러 가기"
          img="/icon/next.svg"
          className="body-bold !rounded-[8px]"
          width="w-fit"
          padding="px-[12px] py-[8px]"
          onClick={onAnswerClick}
        />
      )}
      {myAnswered && (
        <CommonButton
          label="답변 완료"
          className="body-bold !rounded-[8px]"
          width="w-fit"
          padding="px-[12px] py-[8px]"
          disabled={true}
        />
      )}
    </div>
  );
};

export default QuestionCard;

