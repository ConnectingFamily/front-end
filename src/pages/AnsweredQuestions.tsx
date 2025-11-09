import { useState } from "react";
import { useNavigate } from "react-router-dom";
import sort from "../../public/icon/sort.svg";
import SubHeader from "../components/layout/SubHeader";

const AnsweredQuestions = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  // TODO: API에서 답변한 질문 목록 받아오기
  const answeredQuestions = [
    {
      id: 9,
      questionNumber: 9,
      question: "가장 기억에 남는 생일 파티는 언제였고, 그 이유는 무엇인가요?",
      answeredDate: "2025-09-28",
    },
    {
      id: 8,
      questionNumber: 8,
      question: "가장 기억에 남는 생일 파티는 언제였고, 그 이유는 무엇인가요?",
      answeredDate: "2025-09-27",
    },
    {
      id: 7,
      questionNumber: 7,
      question: "최근에 읽은 책과 그 책이 인상 깊었던 이유는 무엇인가요?",
      answeredDate: "2025-09-26",
    },
    {
      id: 6,
      questionNumber: 6,
      question: "가장 좋아하는 여행지와 그 이유는 무엇인가요?",
      answeredDate: "2025-09-25",
    },
    {
      id: 5,
      questionNumber: 5,
      question: "어린 시절의 기억 중 가장 소중한 순간은 무엇인가요?",
      answeredDate: "2025-09-18",
    },
    {
      id: 4,
      questionNumber: 4,
      question: "최근에 본 영화 중 가장 인상 깊었던 장면은 무엇인가요?",
      answeredDate: "2025-09-11",
    },
    {
      id: 3,
      questionNumber: 3,
      question: "가족과 최근 나눴던 대화 중 가장 기억에 남는 순간은 언제인가요?",
      answeredDate: "2025-09-04",
    },
    {
      id: 2,
      questionNumber: 2,
      question: "가족과 최근 나눴던 대화 중 가장 기억에 남는 순간은 언제인가요?",
      answeredDate: "2025-09-03",
    },
  ];

  // 정렬된 질문 목록
  const sortedQuestions = [...answeredQuestions].sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.answeredDate).getTime() - new Date(a.answeredDate).getTime();
    } else {
      return new Date(a.answeredDate).getTime() - new Date(b.answeredDate).getTime();
    }
  });

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "latest" ? "oldest" : "latest");
  };

  const handleQuestionClick = (questionId: number) => {
    // TODO: 해당 질문의 상세 페이지로 이동 또는 답변 보기
    console.log("질문 클릭:", questionId);
    // navigate(`/question/${questionId}`);
  };

  return (
    <div className="w-full h-screen bg-bg flex flex-col">
      {/* 헤더 */}
      <SubHeader leftText="답변한 질문" onBackClick={() => navigate(-1)} />
      <div className="flex flex-row items-end justify-end px-5 py-3">
        <button
          onClick={handleSortToggle}
          className="flex flex-row items-center gap-1"
        >
          <img src={sort} alt="sort" className="w-4 h-4" />
          <span className="body text-text">
            {sortOrder === "latest" ? "최신순" : "과거순"}
          </span>
        </button>
      </div>


      {/* 질문 리스트 */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col px-5">
          {sortedQuestions.map((question) => (
            <button
              key={question.id}
              onClick={() => handleQuestionClick(question.id)}
              className="w-full bg-sub-2 rounded-[8px] p-3 mb-3 flex flex-col gap-[8px] text-left"
            >
              {/* Q 번호와 날짜 */}
              <div className="flex flex-row items-center justify-between">
                <div className="bg-sub-1 text-main caption py-1 px-2 w-fit rounded">
                  Q{question.questionNumber}
                </div>
                <div className="caption text-sub-text">{question.answeredDate}</div>
              </div>

              {/* 질문 텍스트 */}
              <div className="body text-text line-clamp-1">
                {question.question}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnsweredQuestions;

