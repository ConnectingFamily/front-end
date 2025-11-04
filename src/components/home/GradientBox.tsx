import { LevelItem } from "../../constants/home";
import CommonButton from "../common/CommonButton";
import DOMPurify from "dompurify";

interface GradientBoxProps {
  questionDummy: string;
  descDummy: string;
}

const GradientBox = ({ questionDummy, descDummy }: GradientBoxProps) => {
  return (
    <div
      className="min-h-[380px]
        bg-linear-to-b from-[#FFFFFD] to-[#FFF6ED]
        rounded-b-[20px]
        shadow-[0_4px_8px_rgba(0,0,0,0.08)]
        flex flex-col gap-y-10
        py-6 px-5"
    >
      {/* level componet */}
      <div className="relative flex">
        <img
          src={LevelItem[0].src}
          alt="levelImg"
          className="block w-full h-full"
        />
        <div className="absolute bottom-8 left-4 label-bold text-[#433C35]">
          {LevelItem[0].title}
        </div>
        <div className="absolute bottom-4 left-4 caption">{descDummy}</div>
      </div>
      {/* question */}
      <div className="flex flex-col gap-y-[12px]">
        {/* question # */}
        <div className="bg-sub-1 text-main py-1 px-2 w-fit">Q1</div>
        {/* question */}
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(questionDummy),
          }}
          className="title"
        />
        {/* ans btn */}
        <CommonButton
          label="답변하러 가기"
          img="/icon/next.svg"
          className="body-bold"
          width="w-fit"
          padding="px-3 py-2"
        />
      </div>
    </div>
  );
};

export default GradientBox;
