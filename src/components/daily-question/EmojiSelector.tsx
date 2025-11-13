interface Emoji {
  id: string;
  label: string;
  src: string;
}

interface EmojiSelectorProps {
  emojiList: Emoji[];
  onSelect: (emoji: Emoji) => void;
}

const EmojiSelector = ({ emojiList, onSelect }: EmojiSelectorProps) => {
  return (
    <div className="flex flex-col gap-[16px] pt-[24px] z-[999]">
      <div className="label-bold text-text">공감 표현하기</div>
      <div className="grid grid-cols-3 gap-y-[20px] mb-[7.81vh] max-mb-[66px]">
        {emojiList.map((emoji) => (
          <button
            key={emoji.id}
            onClick={() => onSelect(emoji)}
            className="flex items-center justify-center rounded-[8px]"
          >
            <img
              src={emoji.src}
              alt={emoji.label}
              className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px] items-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;

