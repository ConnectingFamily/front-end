import { useState, useEffect } from "react";
import { getComments, createComment, updateComment, deleteComment as deleteCommentApi } from "../api/comment";
import { transformComment, parseBothContent, getEmojiById } from "../utils/daily-question";
import { formatTimeAgo } from "../utils/daily-question";
import type { Comment } from "../types/daily-question";
import type { Emoji } from "../types/daily-question";

interface UseCommentsProps {
  dailyQuestionId: number;
}

export const useComments = ({ dailyQuestionId }: UseCommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<Emoji | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [editingSelectedEmoji, setEditingSelectedEmoji] = useState<Emoji | null>(null);

  // dailyQuestionId가 변경되면 댓글 초기화
  useEffect(() => {
    if (dailyQuestionId > 0) {
      setComments([]);
      setCommentText("");
      setSelectedEmoji(null);
      setOpenMenuId(null);
      setDeleteCommentId(null);
    }
  }, [dailyQuestionId]);

  const loadComments = async () => {
    if (dailyQuestionId <= 0) {
      console.warn("dailyQuestionId가 유효하지 않음:", dailyQuestionId);
      return;
    }

    setIsLoading(true);
    try {
      const response = await getComments(dailyQuestionId);
      const transformedComments = response.data.map(transformComment);
      setComments(transformedComments);
    } catch (error: any) {
      console.error("댓글 조회 실패:", error);
      console.error("에러 상세:", {
        message: error?.message,
        response: error?.response,
        status: error?.status,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendComment = async () => {
    if (!commentText.trim() && !selectedEmoji) {
      return;
    }

    if (!dailyQuestionId) {
      alert("질문 정보가 없습니다.");
      return;
    }

    try {
      // 타입과 content 결정
      let type: "TEXT" | "EMOJI" | "BOTH";
      let content: string;

      if (selectedEmoji && commentText.trim()) {
        // BOTH: "이모지ID|텍스트" 형식
        type = "BOTH";
        content = `${selectedEmoji.id}|${commentText.trim()}`;
      } else if (selectedEmoji) {
        // EMOJI: 이모지 ID만
        type = "EMOJI";
        content = selectedEmoji.id;
      } else {
        // TEXT: 텍스트만
        type = "TEXT";
        content = commentText.trim();
      }

      // API 호출
      const response = await createComment({
        dailyQuestionId,
        content,
        type,
      });

      // API 응답을 Comment 인터페이스에 맞게 변환
      let emojiId: string | undefined;
      let contentText: string = "";
      let hasContent: boolean = false;

      if (response.data.type === "EMOJI") {
        emojiId = response.data.content;
        contentText = "";
        hasContent = false;
      } else if (response.data.type === "BOTH") {
        const parsed = parseBothContent(response.data.content);
        emojiId = parsed.emojiId || undefined;
        contentText = parsed.text;
        hasContent = !!contentText;
      } else {
        emojiId = undefined;
        contentText = response.data.content;
        hasContent = !!contentText;
      }

      const newComment: Comment = {
        id: response.data.commentId,
        userId: response.data.userId,
        userName: response.data.userNickname,
        timeAgo: formatTimeAgo(response.data.createdAt),
        emoji: emojiId,
        content: contentText,
        hasContent: hasContent,
      };

      // 댓글 리스트에 추가 (최신 댓글이 위로)
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
      setSelectedEmoji(null);
    } catch (error: any) {
      console.error("댓글 전송 실패:", error);
      const errorMessage =
        error?.response?.message ||
        error?.message ||
        "댓글을 전송하는 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const deleteComment = async () => {
    if (!deleteCommentId) return;

    try {
      await deleteCommentApi(deleteCommentId);
      setComments((prev) => prev.filter((comment) => comment.id !== deleteCommentId));
      setDeleteCommentId(null);
    } catch (error: any) {
      console.error("댓글 삭제 실패:", error);
      const errorMessage =
        error?.response?.message ||
        error?.message ||
        "댓글을 삭제하는 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  const startEditComment = (commentId: number) => {
    const comment = comments.find((c) => c.id === commentId);
    if (!comment) return;

    setEditingCommentId(commentId);
    setEditingCommentText(comment.content);
    // 이모지가 있으면 찾아서 설정
    const emoji = comment.emoji ? getEmojiById(comment.emoji) : null;
    setEditingSelectedEmoji(emoji);
    setOpenMenuId(null);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText("");
    setEditingSelectedEmoji(null);
  };

  const saveEditComment = async () => {
    if (!editingCommentId) return;

    if (!editingCommentText.trim() && !editingSelectedEmoji) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      // 타입과 content 결정
      let type: "TEXT" | "EMOJI" | "BOTH";
      let content: string;

      if (editingSelectedEmoji && editingCommentText.trim()) {
        type = "BOTH";
        content = `${editingSelectedEmoji.id}|${editingCommentText.trim()}`;
      } else if (editingSelectedEmoji) {
        type = "EMOJI";
        content = editingSelectedEmoji.id;
      } else {
        type = "TEXT";
        content = editingCommentText.trim();
      }

      const response = await updateComment(editingCommentId, { content, type });

      // API 응답을 Comment 인터페이스에 맞게 변환
      let emojiId: string | undefined;
      let contentText: string = "";
      let hasContent: boolean = false;

      if (response.data.type === "EMOJI") {
        emojiId = response.data.content;
        contentText = "";
        hasContent = false;
      } else if (response.data.type === "BOTH") {
        const parsed = parseBothContent(response.data.content);
        emojiId = parsed.emojiId || undefined;
        contentText = parsed.text;
        hasContent = !!contentText;
      } else {
        emojiId = undefined;
        contentText = response.data.content;
        hasContent = !!contentText;
      }

      const updatedComment: Comment = {
        id: response.data.commentId,
        userId: response.data.userId,
        userName: response.data.userNickname,
        timeAgo: formatTimeAgo(response.data.updatedAt),
        emoji: emojiId,
        content: contentText,
        hasContent: hasContent,
      };

      // 댓글 리스트 업데이트
      setComments((prev) =>
        prev.map((comment) => (comment.id === editingCommentId ? updatedComment : comment))
      );
      cancelEditComment();
    } catch (error: any) {
      console.error("댓글 수정 실패:", error);
      const errorMessage =
        error?.response?.message ||
        error?.message ||
        "댓글을 수정하는 중 오류가 발생했습니다.";
      alert(errorMessage);
    }
  };

  return {
    comments,
    isLoading,
    commentText,
    isEmojiOpen,
    selectedEmoji,
    openMenuId,
    deleteCommentId,
    editingCommentId,
    editingCommentText,
    editingSelectedEmoji,
    setCommentText,
    setIsEmojiOpen,
    setSelectedEmoji,
    setOpenMenuId,
    setDeleteCommentId,
    setEditingCommentText,
    setEditingSelectedEmoji,
    loadComments,
    sendComment,
    deleteComment,
    startEditComment,
    cancelEditComment,
    saveEditComment,
  };
};

