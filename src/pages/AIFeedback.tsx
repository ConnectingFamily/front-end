import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SubHeader from "../components/layout/SubHeader";
import CommonButton from "../components/common/CommonButton";
import heartToHeart from "../../public/icon/heartToHeart.svg";
import CommonModal from "../components/common/CommonModal";

const AIFeedback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const contentEditableRef = useRef<HTMLDivElement>(null);
  
  // TODO: API에서 AI 피드백 데이터 받아오기
  // 현재는 location.state에서 답변을 받아오거나, API 호출
  const initialAnswer = location.state?.answer || "";
  const [userAnswer, setUserAnswer] = useState(initialAnswer);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const MAX_LENGTH = 200;

  // 현재 contentEditable의 텍스트를 가져오는 함수
  const getCurrentAnswer = () => {
    return contentEditableRef.current?.textContent || userAnswer;
  };

  // 이전 화면(Answer)으로 이동하면서 현재 텍스트 전달
  const handleGoBack = () => {
    const currentAnswer = getCurrentAnswer();
    navigate("/answer", { state: { answer: currentAnswer } });
  };

  // 초기값 설정 및 location.state 변경 시에만 업데이트
  useEffect(() => {
    const isFocused = document.activeElement === contentEditableRef.current;
    
    // 사용자가 직접 편집 중이 아닐 때만 업데이트
    if (!isFocused) {
      if (location.state?.answer && location.state.answer !== contentEditableRef.current?.textContent) {
        setUserAnswer(location.state.answer);
        if (contentEditableRef.current) {
          contentEditableRef.current.textContent = location.state.answer;
        }
      } else if (contentEditableRef.current && !contentEditableRef.current.textContent && initialAnswer) {
        contentEditableRef.current.textContent = initialAnswer;
        setUserAnswer(initialAnswer);
      }
    }
  }, [location.state?.answer, initialAnswer]);
  
  const aiSuggestions = [
    "차한잔님은 가족과 다시 가까워지고 싶은 따뜻한 마음을 가지고 있네요.",
    "아직 대화를 나누지 못했지만, 그 마음 자체가 관계 회복의 시작이에요.",
    "오늘은 '한마디의 안부'로 문을 열어보세요!",
  ];

  const handleSave = () => {
    setIsEditModalOpen(true);
  };

  const handleConfirmSave = () => {
    const currentAnswer = getCurrentAnswer();
    // TODO: 답변 저장 API 호출 (currentAnswer 전달)
    console.log("저장할 답변:", currentAnswer);
    navigate("/daily-question");
  };

  const handleEditAnswer = () => {
    handleGoBack();
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
                  className="w-full bg-gradient-to-b from-[#FFF8F0] to-[#FFE5C7] rounded-[8px] p-[12px]"
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
    </div>
  );
};

export default AIFeedback;
