import { TodayMission } from "../../constants/home";

const Mission = () => {
  return (
    <div className="flex flex-col gap-y-3 p-5 pt-0">
      {/* mission sentence */}
      <div className="body-bold">오늘의 미션</div>
      <div className="flex flex-row gap-x-4 overflow-x-auto">
        {TodayMission.map((mission) => {
          return (
            <div className="bg-[#EFEFEF] rounded-lg p-4 flex-shrink-0 h-[100px] w-[267px]">
              <div className="flex flex-col gap-y-3 caption">
                <div className="font-bold">{mission.title}</div>
                <div>{mission.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Mission;
