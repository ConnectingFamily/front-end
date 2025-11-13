import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LevelItem } from "../../constants/home";
import CommonButton from "../common/CommonButton";
import DOMPurify from "dompurify";
import { getTodayQuestion } from "../../api/daily-question";

interface GradientBoxProps {
  descDummy?: string;
}

const GradientBox = ({ descDummy }: GradientBoxProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [questionData, setQuestionData] = useState({
    dailyQuestionId: 0,
    questionNumber: 0,
    questionText: "",
  });

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        const response = await getTodayQuestion();
        const data = response.data;
        setQuestionData({
          dailyQuestionId: data.dailyQuestionId,
          questionNumber: data.questionNumber,
          questionText: data.questionText,
        });
      } catch (error: any) {
        console.error("질문 조회 실패:", error);
        // 에러 발생 시 기본값 유지
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestion();
  }, []);

  const handleAnswerClick = () => {
    navigate("/answer", {
      state: {
        dailyQuestionId: questionData.dailyQuestionId,
        questionNumber: questionData.questionNumber,
        question: questionData.questionText,
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className="min-h-[380px]
          bg-linear-to-b from-[#FFFFFD] to-[#FFF6ED]
          rounded-b-[20px]
          shadow-[0_4px_8px_rgba(0,0,0,0.08)]
          flex flex-col gap-y-10
          py-6 px-5
          items-center justify-center"
      >
        <div className="body text-text">질문을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-[380px]
        bg-linear-to-b from-[#FFFFFD] to-[#FFF6ED]
        rounded-b-[20px]
        shadow-[0_4px_8px_rgba(0,0,0,0.08)]
        flex flex-col gap-y-10
        py-6 px-5"
    >
      {/* level componet */}
      <div className="relative flex">
        <img
          src={LevelItem[0].src}
          alt="levelImg"
          className="block w-full h-full"
        />
        <div className="absolute bottom-8 left-4 label-bold text-[#433C35]">
          {LevelItem[0].title}
        </div>
        <div className="absolute bottom-4 left-4 caption">{descDummy}</div>
      </div>
      {/* question */}
      <div className="flex flex-col gap-y-[12px]">
        {/* question # */}
        <div className="bg-sub-1 text-main py-1 px-2 w-fit">
          Q{questionData.questionNumber}
        </div>
        {/* question */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(questionData.questionText),
          }}
          className="title break-keep break-words"
        />
        {/* ans btn */}
        <CommonButton
          onClick={handleAnswerClick}
          label="답변하러 가기"
          img="/icon/next.svg"
          className="body-bold"
          width="w-fit"
          padding="px-3 py-2"
        />
      </div>
    </div>
  );
};

export default GradientBox;
