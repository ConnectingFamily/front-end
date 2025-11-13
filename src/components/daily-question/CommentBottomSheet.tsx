import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import EmojiSelector from "./EmojiSelector";

interface Comment {
  id: number;
  userName: string;
  timeAgo: string;
  emoji?: string;
  content: string;
  hasContent: boolean;
}

interface Emoji {
  id: string;
  label: string;
  src: string;
}

interface CommentBottomSheetProps {
  isOpen: boolean;
  isLoading: boolean;
  comments: Comment[];
  commentText: string;
  selectedEmoji: Emoji | null;
  isEmojiOpen: boolean;
  emojiList: Emoji[];
  openMenuId: number | null;
  editingCommentId: number | null;
  editingCommentText: string;
  editingSelectedEmoji: Emoji | null;
  currentUserId: number | null;
  getEmojiById: (emojiId?: string) => Emoji | null;
  onClose: () => void;
  onCommentTextChange: (text: string) => void;
  onEmojiToggle: () => void;
  onEmojiSelect: (emoji: Emoji) => void;
  onRemoveEmoji: () => void;
  onSend: () => void;
  onMoreClick: (commentId: number, e: React.MouseEvent) => void;
  onEdit: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onEditingCommentTextChange: (text: string) => void;
  onEditingEmojiSelect: (emoji: Emoji) => void;
  onEditingRemoveEmoji: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const CommentBottomSheet = ({
  isOpen,
  isLoading,
  comments,
  commentText,
  selectedEmoji,
  isEmojiOpen,
  emojiList,
  openMenuId,
  editingCommentId,
  editingCommentText,
  editingSelectedEmoji,
  currentUserId,
  getEmojiById,
  onClose,
  onCommentTextChange,
  onEmojiToggle,
  onEmojiSelect,
  onRemoveEmoji,
  onSend,
  onMoreClick,
  onEdit,
  onDelete,
  onEditingCommentTextChange,
  onEditingEmojiSelect,
  onEditingRemoveEmoji,
  onSaveEdit,
  onCancelEdit,
}: CommentBottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/32 z-[998]"
        onClick={onClose}
      />

      {/* 바텀 시트 */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[420px] mx-auto bg-white rounded-t-[16px] shadow-[0_-4px_8px_rgba(0,0,0,0.08)] z-[999] flex flex-col max-h-[90vh]">
        {/* 헤더 */}
        <div className="flex flex-row items-center justify-center h-[57px] px-5 border-b border-[#EAEAEA]">
          <div className="label-bold text-text">댓글</div>
        </div>

        {/* 댓글 리스트 */}
        <div className="flex-1 overflow-y-auto pt-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="body text-sub-text">댓글을 불러오는 중...</div>
            </div>
          ) : (
            <div className="flex flex-col gap-y-4">
              {comments.map((comment, index) => {
                const commentEmoji = getEmojiById(comment.emoji);
                return (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    emoji={commentEmoji}
                    isLast={index === comments.length - 1}
                    openMenuId={openMenuId}
                    isEditing={editingCommentId === comment.id}
                    editingText={editingCommentText}
                    editingSelectedEmoji={editingSelectedEmoji}
                    emojiList={emojiList}
                    currentUserId={currentUserId}
                    onMoreClick={onMoreClick}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onEditingTextChange={onEditingCommentTextChange}
                    onEditingEmojiSelect={onEditingEmojiSelect}
                    onEditingRemoveEmoji={onEditingRemoveEmoji}
                    onSaveEdit={onSaveEdit}
                    onCancelEdit={onCancelEdit}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* 댓글 입력 필드 */}
        <CommentInput
          commentText={commentText}
          selectedEmoji={selectedEmoji}
          isEmojiOpen={isEmojiOpen}
          onCommentTextChange={onCommentTextChange}
          onEmojiToggle={onEmojiToggle}
          onEmojiSelect={onEmojiSelect}
          onRemoveEmoji={onRemoveEmoji}
          onSend={onSend}
        />

        {/* 이모지 선택 그리드 */}
        {isEmojiOpen && (
          <div className="px-5 max-px-[20px] border-t border-[#EAEAEA] bg-outline">
            <div className="flex flex-col">
              <EmojiSelector emojiList={emojiList} onSelect={onEmojiSelect} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CommentBottomSheet;

