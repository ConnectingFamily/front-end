import emoji from "../../../public/icon/emoji.svg";
import emojiOn from "../../../public/icon/emojiOn.svg";
import send from "../../../public/icon/send.svg";
import X from "../../../public/icon/X.svg";

interface Emoji {
  id: string;
  label: string;
  src: string;
}

interface CommentInputProps {
  commentText: string;
  selectedEmoji: Emoji | null;
  isEmojiOpen: boolean;
  onCommentTextChange: (text: string) => void;
  onEmojiToggle: () => void;
  onEmojiSelect: (emoji: Emoji) => void;
  onRemoveEmoji: () => void;
  onSend: () => void;
}

const CommentInput = ({
  commentText,
  selectedEmoji,
  isEmojiOpen,
  onCommentTextChange,
  onEmojiToggle,
  onEmojiSelect: _onEmojiSelect, // CommentBottomSheet에서 전달되지만 실제로는 EmojiSelector에서 사용됨
  onRemoveEmoji,
  onSend,
}: CommentInputProps) => {
  return (
    <div
      className="px-5 max-px-[20px] pt-[12px] border-t border-[#EAEAEA]"
      style={{ boxShadow: "0px -4px 8px 0px #00000014" }}
    >
      <div className="flex flex-col">
        {/* 입력 영역 */}
        <div className="flex flex-row items-start gap-[10px] mb-[12px]">
          {/* 이모지 버튼 */}
          <button
            onClick={onEmojiToggle}
            className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0 my-auto focus:outline-none"
          >
            <img
              src={isEmojiOpen ? emojiOn : emoji}
              alt="emoji"
              className="w-[24px] h-[24px]"
            />
          </button>

          {/* 선택된 이모지 표시 영역 */}
          <div className="flex-1 flex flex-col gap-2">
            {selectedEmoji && (
              <div className="relative w-fit gap-x-[8px] flex flex-row items-start">
                <img
                  src={selectedEmoji.src}
                  alt={selectedEmoji.label}
                  className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px] items-center"
                />
                <button
                  onClick={onRemoveEmoji}
                  className="w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full text-sub-text"
                >
                  <img src={X} alt="X" className="w-[16px] h-[16px]" />
                </button>
              </div>
            )}

            {/* 입력 필드 */}
            <textarea
              value={commentText}
              onChange={(e) => {
                onCommentTextChange(e.target.value);
                // 높이 자동 조절
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              placeholder="따뜻한 공감과 이해의 댓글을 남겨주세요."
              className="flex-1 max-h-[120px] py-[8px] rounded-[8px] body !line-height-1 text-text focus:outline-none resize-none overflow-y-auto"
              rows={1}
              onKeyDown={(e) => {
                // Shift + Enter: 줄바꿈, Enter만: 전송
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
          </div>

          {/* 전송 버튼 */}
          <div
            onClick={onSend}
            className="w-[24px] h-[24px] flex items-center justify-center bg-none flex-shrink-0 my-auto cursor-pointer"
          >
            <img src={send} alt="send" className="w-[24px] h-[24px]" />
          </div>
        </div>
      </div>
      <div className="px-5 max-px-[20px] border-t border-[#EAEAEA] bg-outline">
        <div className="flex flex-col">
          {/* 이모지 선택 그리드는 CommentBottomSheet에서 처리 */}
        </div>
      </div>
    </div>
  );
};

export default CommentInput;

