import message from "../../../public/icon/message.svg";

interface MessageButtonProps {
  onClick: () => void;
}

const MessageButton = ({ onClick }: MessageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-[72px] right-[20px] w-12 h-12 !rounded-full bg-sub-1 flex items-center justify-center shadow-[2px_2px_4px_rgba(0,0,0,0.12)] z-10"
    >
      <img src={message} alt="message" className="w-6 h-6" />
    </button>
  );
};

export default MessageButton;

