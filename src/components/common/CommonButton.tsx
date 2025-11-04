interface CommonButtonProps {
  textColor?: string;
  bgColor?: string;
  label: string;
  img?: string;
  className?: string;
  width?: string;
  padding?: string;
}
const CommonButton = ({
  textColor,
  bgColor,
  label,
  className,
  width,
  img,
  padding,
}: CommonButtonProps) => {
  return (
    <button
      className={`
        ${textColor ? textColor : "text-[#ffffff]"} 
        ${bgColor ? bgColor : "bg-[#ff914d]"}
        ${width ? width : "w-full"}
        ${padding ? padding : "p-[11.5px]"}
        ${className}
        flex flex-row
        `}
    >
      {label}
      {img && <img src={img} alt="buttonImage" />}
    </button>
  );
};

export default CommonButton;
