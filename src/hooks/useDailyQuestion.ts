import { useState, useEffect } from "react";
import { getTodayQuestion } from "../api/daily-question";
import { transformFamilyMembers } from "../utils/daily-question";
import type { FamilyMember, QuestionData } from "../types/daily-question";

export const useDailyQuestion = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [questionData, setQuestionData] = useState<QuestionData>({
    dailyQuestionId: 0,
    questionNumber: 0,
    question: "",
    isAllAnswered: false,
    myAnswered: false,
    myAnswer: "",
  });
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [myUserId, setMyUserId] = useState<number | null>(null);

  useEffect(() => {
    const loadQuestionData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getTodayQuestion();
        const data = response.data;

        // 현재 사용자 찾기 (일단 answered가 true이고 answerContent가 있는 첫 번째를 현재 사용자로 가정)
        // TODO: 실제로는 JWT 토큰에서 userId를 가져오거나 별도 API 호출 필요
        const myMember = data.members.find((m) => m.answered && m.answerContent);
        const currentUserId = myMember?.userId || data.members[0]?.userId || null;
        setMyUserId(currentUserId);

        // 질문 데이터 설정
        setQuestionData({
          dailyQuestionId: data.dailyQuestionId,
          questionNumber: data.questionNumber,
          question: data.questionText,
          isAllAnswered: data.isAllAnswered,
          myAnswered: myMember?.answered || false,
          myAnswer: myMember?.answerContent || "",
        });

        // 가족 멤버 데이터 변환
        const transformedMembers = transformFamilyMembers(
          data.members,
          currentUserId,
          data.isAllAnswered
        );
        setFamilyMembers(transformedMembers);
      } catch (error: any) {
        const errorMessage =
          error?.response?.message ||
          error?.message ||
          "질문을 불러오는 중 오류가 발생했습니다.";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestionData();
  }, []);

  return {
    isLoading,
    error,
    questionData,
    familyMembers,
    myUserId,
  };
};

