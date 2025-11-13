import type { FamilyMember, Comment } from "../types/daily-question";
import type { QuestionMember } from "../api/daily-question";
import type { CommentItem } from "../api/comment";
import type { Emoji } from "../types/daily-question";
import { EMOJI_LIST } from "../constants/daily-question";

// 시간 포맷팅 함수 (createdAt을 "지금", "2분 전" 등으로 변환)
export const formatTimeAgo = (createdAt: string): string => {
  const now = new Date();
  const created = new Date(createdAt);
  const diffMs = now.getTime() - created.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "지금";
  if (diffMins < 60) return `${diffMins}분 전`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}시간 전`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}일 전`;
};

// BOTH 타입 content 파싱 함수
export const parseBothContent = (content: string): { emojiId: string; text: string } => {
  const parts = content.split("|");
  if (parts.length >= 2) {
    return {
      emojiId: parts[0].trim(),
      text: parts.slice(1).join("|").trim(), // |가 텍스트에 포함될 수 있으므로
    };
  }
  // 파싱 실패 시 전체를 텍스트로 처리
  return {
    emojiId: "",
    text: content,
  };
};

// 가족 멤버 데이터 변환
export const transformFamilyMembers = (
  members: QuestionMember[],
  myUserId: number | null,
  isAllAnswered: boolean
): FamilyMember[] => {
  return members
    .filter((m) => m.userId !== myUserId) // 현재 사용자 제외
    .map((m) => {
      let status: "locked" | "not_answered" | "answered";
      if (!isAllAnswered) {
        if (!m.answered) {
          status = "not_answered";
        } else {
          status = "locked"; // 다른 사람이 답변했지만 아직 공개 안됨
        }
      } else {
        status = m.answered ? "answered" : "not_answered";
      }

      return {
        userId: m.userId,
        name: m.nickname,
        status,
        answer: isAllAnswered && m.answered ? m.answerContent : undefined,
      };
    });
};

// 댓글 변환 함수
export const transformComment = (comment: CommentItem): Comment => {
  const userName = comment.userNickname || "사용자";

  // type에 따라 이모지와 텍스트 분리
  let emojiId: string | undefined;
  let contentText: string = "";
  let hasContent: boolean = false;

  if (comment.type === "EMOJI") {
    // EMOJI 타입: content가 이모지 ID
    emojiId = comment.content;
    contentText = "";
    hasContent = false;
  } else if (comment.type === "BOTH") {
    // BOTH 타입: "이모지ID|텍스트" 형식 파싱
    const parsed = parseBothContent(comment.content);
    emojiId = parsed.emojiId || undefined;
    contentText = parsed.text;
    hasContent = !!contentText;
  } else {
    // TEXT 타입
    emojiId = undefined;
    contentText = comment.content;
    hasContent = !!contentText;
  }

  return {
    id: comment.commentId,
    userId: comment.userId,
    userName: userName,
    timeAgo: formatTimeAgo(comment.createdAt),
    emoji: emojiId,
    content: contentText,
    hasContent: hasContent,
  };
};

// 이모지 ID를 이미지로 매핑
export const getEmojiById = (emojiId?: string): Emoji | null => {
  if (!emojiId) return null;
  return EMOJI_LIST.find((emoji) => emoji.id === emojiId) || null;
};
