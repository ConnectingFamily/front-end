import { TodayMission } from "../../constants/home";
import DOMPurify from "dompurify";

const Mission = () => {
  return (
    <div className="flex flex-col gap-y-3 p-5 pt-0">
      {/* mission sentence */}
      <div className="body-bold">마음을 건네는 법</div>
      <div className="flex flex-row gap-x-4 overflow-x-auto">
        {TodayMission.map((mission, idx) => {
          return (
            <div
              className={`${
                idx % 2 ? "bg-[#FFF9F1]" : "bg-[#F7FBF4]"
              } rounded-lg p-4 flex-shrink-0 h-[100px] w-[267px]`}
            >
              <div className="flex flex-col gap-y-3 caption">
                <div className="font-jandari text-[16px] ">{mission.title}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(mission.desc),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Mission;
