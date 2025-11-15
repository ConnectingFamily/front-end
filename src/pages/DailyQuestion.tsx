import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import CommonModal from "../components/common/CommonModal";
import QuestionCard from "../components/daily-question/QuestionCard";
import InfoMessage from "../components/daily-question/InfoMessage";
import FamilyMemberList from "../components/daily-question/FamilyMemberList";
import MessageButton from "../components/daily-question/MessageButton";
import CommentBottomSheet from "../components/daily-question/CommentBottomSheet";
import { useDailyQuestion } from "../hooks/useDailyQuestion";
import { useComments } from "../hooks/useComments";
import { getEmojiById } from "../utils/daily-question";
import { EMOJI_LIST } from "../constants/daily-question";

const DailyQuestion = () => {
  const navigate = useNavigate();
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});
  const [nudgedMembers, setNudgedMembers] = useState<Record<string, boolean>>({});
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  // Custom Hooks
  const { isLoading, error, questionData, familyMembers, myUserId } = useDailyQuestion();
  const {
    comments,
    isLoading: isCommentsLoading,
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
  } = useComments({ dailyQuestionId: questionData.dailyQuestionId });

  const handleAnswerClick = () => {
    navigate("/answer", {
      state: {
        dailyQuestionId: questionData.dailyQuestionId,
        questionNumber: questionData.questionNumber,
        question: questionData.question,
      },
    });
  };

  const handleNudgeClick = (memberName: string) => {
    // TODO: 마음 두드리기 API 호출 (알림 보내기)
    console.log(`${memberName}에게 마음 두드리기`);
    setNudgedMembers((prev) => ({
      ...prev,
      [memberName]: true,
    }));
  };

  const handleToggleAnswer = () => setIsAnswerExpanded(!isAnswerExpanded);
  const handleToggleMemberAnswer = (memberName: string) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [memberName]: !prev[memberName],
    }));
  };

  const handleMessageClick = async () => {
    setIsCommentOpen(true);
    await loadComments();
  };

  const handleCloseComment = () => setIsCommentOpen(false);

  const handleEmojiToggle = () => setIsEmojiOpen(!isEmojiOpen);
  const handleEmojiSelect = (emoji: { id: string; label: string; src: string }) => setSelectedEmoji(emoji);
  const handleRemoveEmoji = () => setSelectedEmoji(null);

  const handleMoreClick = (commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === commentId ? null : commentId);
  };

  const handleEditComment = (commentId: number) => {
    startEditComment(commentId);
  };

  const handleDeleteComment = (commentId: number) => {
    setDeleteCommentId(commentId);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = () => deleteComment();
  const handleCancelDelete = () => setDeleteCommentId(null);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="body text-text">질문을 불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    // 401 에러인 경우 로그인 페이지로 리다이렉트
    // (axios interceptor에서도 처리하지만, 여기서도 확인)
    const errorStatus = typeof error === 'object' && error !== null && 'status' in error 
      ? (error as { status?: number }).status 
      : null;
    
    if (errorStatus === 401) {
      window.location.href = "/login";
      return null;
    }

    const errorMessage = typeof error === 'string' 
      ? error 
      : (typeof error === 'object' && error !== null && 'message' in error
          ? (error as { message: string }).message
          : String(error));

    return (
      <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
        <div className="body text-error">{errorMessage}</div>
        <CommonButton
          label="다시 시도"
          onClick={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <QuestionCard
        questionNumber={questionData.questionNumber}
        question={questionData.question}
        myAnswered={questionData.myAnswered}
        onAnswerClick={handleAnswerClick}
      />

      <InfoMessage isVisible={!questionData.isAllAnswered} />

      <FamilyMemberList
        myAnswered={questionData.myAnswered}
        myAnswer={questionData.myAnswer}
        isMyAnswerExpanded={isAnswerExpanded}
        familyMembers={familyMembers}
        isAllAnswered={questionData.isAllAnswered}
        expandedMembers={expandedMembers}
        nudgedMembers={nudgedMembers}
        onToggleMyAnswer={handleToggleAnswer}
        onToggleMemberAnswer={handleToggleMemberAnswer}
        onNudge={handleNudgeClick}
      />

      {questionData.isAllAnswered && (
        <MessageButton onClick={handleMessageClick} />
      )}

      <CommentBottomSheet
        isOpen={isCommentOpen}
        isLoading={isCommentsLoading}
        comments={comments}
        commentText={commentText}
        selectedEmoji={selectedEmoji}
        isEmojiOpen={isEmojiOpen}
        emojiList={EMOJI_LIST}
        openMenuId={openMenuId}
        editingCommentId={editingCommentId}
        editingCommentText={editingCommentText}
        editingSelectedEmoji={editingSelectedEmoji}
        currentUserId={myUserId}
        getEmojiById={getEmojiById}
        onClose={() => {
          handleCloseComment();
          setOpenMenuId(null);
          cancelEditComment();
        }}
        onCommentTextChange={setCommentText}
        onEmojiToggle={handleEmojiToggle}
        onEmojiSelect={handleEmojiSelect}
        onRemoveEmoji={handleRemoveEmoji}
        onSend={sendComment}
        onMoreClick={handleMoreClick}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onEditingCommentTextChange={setEditingCommentText}
        onEditingEmojiSelect={setEditingSelectedEmoji}
        onEditingRemoveEmoji={() => setEditingSelectedEmoji(null)}
        onSaveEdit={saveEditComment}
        onCancelEdit={cancelEditComment}
      />

      {/* 댓글 삭제 확인 모달 */}
      {deleteCommentId && (
        <CommonModal
          title="댓글을 삭제할까요?"
          desc="삭제한 댓글은 다시 복구할 수 없어요."
          confirmLabel="삭제"
          onConfirmClick={handleConfirmDelete}
          cancelLabel="취소"
          onCancelClick={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default DailyQuestion;
