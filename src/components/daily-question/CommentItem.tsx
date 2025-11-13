import more from "../../../public/icon/more.svg";
import send from "../../../public/icon/send.svg";
import X from "../../../public/icon/X.svg";
import type { Comment, Emoji } from "../../types/daily-question";

interface CommentItemProps {
  comment: Comment;
  emoji?: Emoji | null;
  isLast: boolean;
  openMenuId: number | null;
  isEditing: boolean;
  editingText: string;
  editingSelectedEmoji: Emoji | null;
  emojiList?: Emoji[];
  currentUserId: number | null;
  onMoreClick: (commentId: number, e: React.MouseEvent) => void;
  onEdit: (commentId: number) => void;
  onDelete: (commentId: number) => void;
  onEditingTextChange: (text: string) => void;
  onEditingEmojiSelect?: (emoji: Emoji) => void;
  onEditingRemoveEmoji: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

const CommentItem = ({
  comment,
  emoji,
  isLast,
  openMenuId,
  isEditing,
  editingText,
  editingSelectedEmoji,
  currentUserId,
  onMoreClick,
  onEdit,
  onDelete,
  onEditingTextChange,
  onEditingRemoveEmoji,
  onSaveEdit,
  onCancelEdit,
}: CommentItemProps) => {
  const isMyComment = currentUserId !== null && comment.userId === currentUserId;
  if (isEditing) {
    return (
      <div
        className={`flex flex-col gap-3 pb-4 ${
          !isLast ? "border-b border-[#EAEAEA] pb-4" : ""
        }`}
      >
        <div className="flex flex-row items-start gap-[10px]">

          {/* 선택된 이모지 표시 영역 */}
          <div className="flex-1 flex flex-col gap-2">
            {editingSelectedEmoji && (
              <div className="relative w-fit gap-x-[8px] flex flex-row items-start">
                <img
                  src={editingSelectedEmoji.src}
                  alt={editingSelectedEmoji.label}
                  className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px] items-center"
                />
                <button
                  onClick={onEditingRemoveEmoji}
                  className="w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full text-sub-text"
                >
                  <img src={X} alt="X" className="w-[16px] h-[16px]" />
                </button>
              </div>
            )}

            {/* 입력 필드 */}
            <textarea
              value={editingText}
              onChange={(e) => {
                onEditingTextChange(e.target.value);
                // 높이 자동 조절
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="댓글을 수정해주세요."
              className="flex-1 max-h-[120px] py-[8px] px-3 rounded-[8px] body !line-height-1 text-text focus:outline-none resize-none overflow-y-auto border border-[#EAEAEA]"
              rows={1}
            />
          </div>

          {/* 저장/취소 버튼 */}
          <div className="flex flex-col gap-2 flex-shrink-0 mt-2">
            <button
              onClick={onSaveEdit}
              className="w-[24px] h-[24px] flex items-center justify-center bg-none"
            >
              <img src={send} alt="save" className="w-[24px] h-[24px]" />
            </button>
            <button
              onClick={onCancelEdit}
              className="w-[24px] h-[24px] flex items-center justify-center bg-none text-sub-text body"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-row gap-3 pb-4 ${
        !isLast ? "border-b border-[#EAEAEA] pb-4" : ""
      }`}
    >
      <div className="flex-1 flex flex-col gap-y-[8px] pl-[12px]">
        <div className="flex flex-row items-center gap-[8px]">
          <div className="label-bold text-text">{comment.userName}</div>
          <div className="caption text-sub-text">{comment.timeAgo}</div>
        </div>
        <div className="flex flex-col items-start gap-2 pl-[12px] flex-wrap">
          {emoji && (
            <img
              src={emoji.src}
              alt={emoji.label}
              className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px]"
            />
          )}
          {comment.hasContent && comment.content && (
            <div className="body text-text">{comment.content}</div>
          )}
        </div>
      </div>

      {/* 옵션 메뉴 - 본인 댓글에만 표시 */}
      {isMyComment && (
        <div className="relative flex-shrink-0 mr-5">
          <button
            onClick={(e) => onMoreClick(comment.id, e)}
            className="w-6 h-6 flex items-center justify-center focus:outline-none"
          >
            <img src={more} alt="more" className="w-6 h-6" />
          </button>

          {/* 팝업 메뉴 */}
          {openMenuId === comment.id && (
            <div
              className="absolute right-0 top-8 bg-[#FFF6ED] rounded-[4px] flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10 min-w-[81px]"
              style={{ boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}
            >
              <button
                onClick={() => onEdit(comment.id)}
                className="px-4 py-3 body text-text hover:bg-[#FFE5C7] rounded-t-[4px] text-left"
              >
                수정하기
              </button>
              <button
                onClick={() => onDelete(comment.id)}
                className="px-4 py-3 body text-text hover:bg-[#FFE5C7] rounded-b-[4px] text-left border-t border-[#EAEAEA]"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;

