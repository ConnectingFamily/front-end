import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import { createDraftAnswer, deleteAnswer } from "../api/daily-question";

const Answer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [answer, setAnswer] = useState(location.state?.answer || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_LENGTH = 200;

  // location.state에서 답변을 받아온 경우 초기값 설정
  useEffect(() => {
    if (location.state?.answer) {
      setAnswer(location.state.answer);
    }
  }, [location.state]);

  // location.state에서 질문 데이터 받아오기
  const questionData = location.state || {
    questionNumber: 0,
    question: "",
    dailyQuestionId: 0,
  };

  const handleNext = async () => {
    if (!answer.trim()) {
      alert("답변을 작성해주세요.");
      return;
    }

    if (!questionData.dailyQuestionId) {
      alert("질문 정보가 없습니다.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await createDraftAnswer(questionData.dailyQuestionId, answer);
      
      navigate("/ai-feedback", {
        state: {
          dailyQuestionId: questionData.dailyQuestionId,
          questionNumber: questionData.questionNumber,
          question: questionData.question,
          answer: answer, // 사용자가 작성한 원본 답변
          originalAnswer: response.data.originalAnswer, // API가 반환한 원본 답변
          improvedAnswer: response.data.improvedAnswer,
          feedback: response.data.feedback,
        },
      });
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || "AI 피드백을 불러오는 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = async () => {
    // 답변이 작성되어 있고 dailyQuestionId가 있으면 DELETE API 호출
    if (answer.trim() && questionData.dailyQuestionId) {
      try {
        await deleteAnswer(questionData.dailyQuestionId);
      } catch (error) {
        // 에러가 발생해도 navigate는 진행
        console.error("답변 삭제 중 오류:", error);
      }
    }
    navigate("/daily-question");
  };

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      <SubHeader 
        rightText={isLoading ? "처리 중..." : "다음"} 
        onBackClick={handleBack} 
        onRightClick={handleNext}
      />
      {error && (
        <div className="px-5 pt-2 body text-error">
          {error}
        </div>
      )}

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

