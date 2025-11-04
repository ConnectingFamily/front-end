import { FamilyAnsSituation } from "../../constants/home";

const AnswerSituation = () => {
  return (
    <div className="flex flex-col gap-y-3 p-5">
      {/* situation sentence */}
      <div className="body-bold">답변 완료 현황</div>
      <div className="flex flex-row gap-x-4">
        {FamilyAnsSituation.map((role) => {
          return (
            <div className="flex flex-col gap-y-1 items-center">
              <img
                src={
                  role.completed
                    ? "/icon/heartCharOrange.svg"
                    : "/icon/heartCharGrey.svg"
                }
                alt="heartCharIcon"
              />
              {role.role}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnswerSituation;
