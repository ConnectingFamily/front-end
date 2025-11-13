import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import heartToHeart from "../../public/icon/heartToHeart.svg";
import CommonModal from "../components/common/CommonModal";
import { submitFinalAnswer } from "../api/daily-question";

const AIFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  const dailyQuestionId = location.state?.dailyQuestionId;
  const initialAnswer = location.state?.improvedAnswer || location.state?.answer || "";
  const initialFeedback = location.state?.feedback || [];
  const [userAnswer, setUserAnswer] = useState(initialAnswer);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>(initialFeedback);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const MAX_LENGTH = 200;

  // 현재 contentEditable의 텍스트를 가져오는 함수
  const getCurrentAnswer = () => {
    return contentEditableRef.current?.textContent || userAnswer;
  };

  // 이전 화면(Answer)으로 이동하면서 원본 답변 및 질문 데이터 전달
  const handleGoBack = () => {
    // API 응답의 originalAnswer를 우선 사용, 없으면 사용자가 작성한 원본 답변 사용
    const originalAnswer = location.state?.originalAnswer || location.state?.answer || "";
    navigate("/answer", {
      state: {
        answer: originalAnswer,
        dailyQuestionId: location.state?.dailyQuestionId,
        questionNumber: location.state?.questionNumber,
        question: location.state?.question,
      },
    });
  };

  // 초기값 설정 및 location.state 변경 시에만 업데이트
  useEffect(() => {
    const isFocused = document.activeElement === contentEditableRef.current;
    
    // 사용자가 직접 편집 중이 아닐 때만 업데이트
    if (!isFocused) {
      const improvedAnswer = location.state?.improvedAnswer;
      if (improvedAnswer && improvedAnswer !== contentEditableRef.current?.textContent) {
        setUserAnswer(improvedAnswer);
        if (contentEditableRef.current) {
          contentEditableRef.current.textContent = improvedAnswer;
        }
      } else if (contentEditableRef.current && !contentEditableRef.current.textContent && initialAnswer) {
        contentEditableRef.current.textContent = initialAnswer;
        setUserAnswer(initialAnswer);
      }

      // feedback 업데이트
      if (location.state?.feedback && Array.isArray(location.state.feedback)) {
        setAiSuggestions(location.state.feedback);
      }
    }
  }, [location.state?.improvedAnswer, location.state?.feedback, initialAnswer]);

  // 헤더의 "저장" 버튼 클릭 시
  const handleSave = () => {
    setIsEditModalOpen(true);
  };

  // 헤더 저장 모달의 "저장" 버튼 클릭 시 (API 호출 없이 navigate만)
  const handleConfirmSave = () => {
    setIsEditModalOpen(false);
    navigate("/daily-question");
  };

  // "답변 수정하기" 버튼 클릭 시
  const handleEditAnswer = () => {
    setIsSubmitModalOpen(true);
  };

  // 답변 수정하기 모달의 "저장" 버튼 클릭 시 (API 호출)
  const handleConfirmSubmit = async () => {
    if (!dailyQuestionId) {
      alert("질문 정보가 없습니다.");
      return;
    }

    const currentAnswer = getCurrentAnswer();
    if (!currentAnswer.trim()) {
      alert("답변을 작성해주세요.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await submitFinalAnswer(dailyQuestionId, currentAnswer);
      setIsSubmitModalOpen(false);
      navigate("/daily-question");
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || "답변 저장 중 오류가 발생했습니다.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#FFF3E7] to-[#FFFEFC] flex flex-col">
      <SubHeader rightText="저장" onRightClick={handleSave} onBackClick={handleGoBack} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col px-[20px] pt-[2.36vh] max-pt-[20px]">
          {/* 제목 */}
          <div className="flex flex-col items-center mb-[2.36vh] max-mb-[20px]">
            {/* heartToHeart 이미지 */}
            <div className="flex justify-center">
              <img 
                src={heartToHeart} 
                alt="heartToHeart" 
                className="w-[268px] h-[91px]"
              />
            </div>
          </div>
          <div className="title text-text text-center font-bold mb-[2.36vh] max-mb-[20px]">
            이렇게 표현해보는 건 어때요?
          </div>
          {/* 원본 답변 카드 */}
          <div className="w-full max-w-[350px] mx-auto mb-[2.36vh] max-mb-[20px]">
            <div className="bg-white rounded-[8px] ml-[40px] border-[1px] border-[#FFF0DE]">
              <div
                ref={contentEditableRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) => {
                  const text = e.currentTarget.textContent || "";
                  if (text.length <= MAX_LENGTH) {
                    setUserAnswer(text);
                  } else {
                    // 최대 길이 초과 시 이전 값으로 되돌림
                    e.currentTarget.textContent = userAnswer;
                    // 커서를 끝으로 이동
                    const range = document.createRange();
                    const selection = window.getSelection();
                    range.selectNodeContents(e.currentTarget);
                    range.collapse(false);
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }
                }}
                className="w-full min-h-[10px] p-[12px] label text-text focus:outline-none"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "keep-all",
                  overflowWrap: "break-word",
                }}
              />
            </div>
          </div>

          {/* AI 제안 섹션 */}
          <div className="w-full max-w-[310px]">
            <div className="flex flex-row items-center mb-[0.9vh] max-mb-[10px]">
              <div className="body !line-height-1 text-sub-text">이심전심의 답변 제안 💡</div>
            </div>

            {/* AI 제안 카드들 */}
            <div className="flex flex-col gap-y-[0.9vh] max-gap-y-[10px]">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="w-full bg-gradient-to-b from-[#FFF8F0] to-[#FFE5C7] rounded-[8px] p-[12px] break-keep break-words"
                >
                  <div className="label text-text">{suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 답변 수정하기 버튼 */}
        <div className="px-5 pb-5 pt-4">
          <CommonButton
            label="답변 수정하기"
            shadow={true}
            onClick={handleEditAnswer}
          />
        </div>
      </div>

      {/* 헤더 저장 모달 */}
      {isEditModalOpen && (
        <CommonModal
          title="저장할까요?"
          desc="지금 저장한 답변은 다시 수정할 수 없어요."
          confirmLabel="저장"
          onConfirmClick={handleConfirmSave}
          cancelLabel="취소"
          onCancelClick={() => setIsEditModalOpen(false)}
        />
      )}

      {/* 답변 수정하기 모달 */}
      {isSubmitModalOpen && (
        <CommonModal
          title="저장할까요?"
          desc="지금 저장한 답변은 다시 수정할 수 없어요."
          confirmLabel={isLoading ? "저장 중..." : "저장"}
          onConfirmClick={handleConfirmSubmit}
          cancelLabel="취소"
          onCancelClick={() => setIsSubmitModalOpen(false)}
        />
      )}

      {error && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 px-5 py-3 bg-error/10 rounded-[8px] body text-error z-[1000]">
          {error}
        </div>
      )}
    </div>
  );
};

export default AIFeedback;
