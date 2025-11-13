interface InfoMessageProps {
  isVisible: boolean;
}

const InfoMessage = ({ isVisible }: InfoMessageProps) => {
  if (!isVisible) return null;

  return (
    <div className="flex flex-row items-center gap-2 px-5 mb-[2.36vh] max-mb-[20px] mt-[2.36vh] max-mt-[20px]">
      <div className="w-4 h-4 rounded-full bg-none border border-sub-text flex items-center justify-center">
        <span className="text-sub-text text-[10px] font-bold">!</span>
      </div>
      <div className="body text-sub-text">
        모든 멤버가 답변을 작성해야 답안이 공개돼요.
      </div>
    </div>
  );
};

export default InfoMessage;

