import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";

const Answer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState(location.state?.answer || "");
  const MAX_LENGTH = 200;

  // location.state에서 답변을 받아온 경우 초기값 설정
  useEffect(() => {
    if (location.state?.answer) {
      setAnswer(location.state.answer);
    }
  }, [location.state]);

  // TODO: API에서 질문 데이터 받아오기
  const questionData = {
    questionNumber: 1,
    question: "가족과 최근 나눴던 대화 중 가장 기억에 남는 순간은 언제인가요?",
  };

  const handleNext = () => {
    if (!answer.trim()) {
      // TODO: 답변을 작성해주세요 알림
      return;
    }
    // TODO: 답변 저장 API 호출
    // 저장 성공 시
    navigate("/ai-feedback", { state: { answer } });
  };

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader rightText="다음" onBackClick={() => navigate("/daily-question")} onRightClick={handleNext} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* 질문 카드 */}
      <div
        className="w-full
          bg-gradient-to-b from-[#FFFEFC] to-[#FFF6ED]
          rounded-b-[20px]
          shadow-[0_4px_8px_rgba(0,0,0,0.08)]
          flex flex-col gap-y-[1.42vh] max-gap-y-[12px]
          pt-[24px] px-5 pb-[24px]"
      >
        {/* 질문 번호 */}
        <div className="bg-sub-1 text-main py-1 px-2 w-fit rounded">
          Q{questionData.questionNumber}
        </div>

        {/* 질문 텍스트 */}
        <div className="title text-text break-keep break-words">
          {questionData.question}
        </div>
      </div>

        {/* 답변 입력 필드 */}
        <div className="relative w-full max-w-[350px] mx-auto mt-[24px]">
          <div className="relative">
            <textarea
              value={answer}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= MAX_LENGTH) {
                  setAnswer(value);
                }
              }}
              placeholder="답변을 작성해주세요."
              className="w-full min-h-[240px] p-3 border border-[#EAEAEA] rounded-[8px] body text-text bg-white resize-none focus:outline-none"
              maxLength={MAX_LENGTH}
            />
            {/* 글자 수 카운터 */}
            <div className="absolute bottom-3 right-3 caption text-sub-text">
              {answer.length}/{MAX_LENGTH} 자
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;

