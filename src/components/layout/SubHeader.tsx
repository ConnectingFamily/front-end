import { useNavigate } from "react-router-dom";
import back from "../../../public/icon/back.svg";

interface SubHeaderProps {
  leftText?: string;
  rightText?: string;
  onRightClick?: () => void;
  onBackClick?: () => void;
}

const SubHeader = ({
  leftText,
  rightText,
  onRightClick,
  onBackClick,
}: SubHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-full bg-bg flex flex-col">
      <div className="flex flex-row items-center justify-between h-[44px] px-[20px] py-[10px]">
        {/* 뒤로가기 버튼 */}
        <button onClick={handleBack} className="flex items-center">
          <img src={back} alt="back" width="24px" height="24px" />
        </button>

        {/* 좌측 텍스트 (있을 때만 표시) */}
        {leftText && (
          <div className="title text-text pl-[8px]">{leftText}</div>
        )}

        {/* 우측 텍스트 (있을 때만 표시) */}
        {rightText ? (
          <button
            onClick={onRightClick}
            className="body-bold text-main"
            disabled={!onRightClick}
          >
            {rightText}
          </button>
        ) : (
          <div className="w-6" />
        )}
      </div>
    </div>
  );
};

export default SubHeader;

