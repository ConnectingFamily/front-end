interface CommonButtonProps {
  textColor?: string;
  bgColor?: string;
  label: string;
  img?: string;
  className?: string;
  width?: string;
}
const CommonButton = ({
  textColor,
  bgColor,
  label,
  className,
  width,
  img,
}: CommonButtonProps) => {
  return (
    <button
      className={`
        ${textColor ? textColor : "text-[#ffffff]"} 
        ${bgColor ? bgColor : "bg-[#ff914d]"}
        ${width ? width : "w-full"}
        ${className}
        p-[11.5px]
        `}
    >
      {label}
      {img && <img src={img} alt="buttonImage" />}
    </button>
  );
};

export default CommonButton;
