import { useNavigate } from "react-router-dom";
import magnifyingGlass from "../../public/icon/magnifyingGlass.svg";
import ticket from "../../public/icon/ticket.svg";
import SubHeader from "../components/layout/SubHeader";

const Onboard = () => {
  const navigate = useNavigate();

  const handleFindFamily = () => {
    // TODO: 가족 찾기 (코드 입력) 페이지로 이동
    navigate("/onboard/join");
  };

  const handleInviteFamily = () => {
    // TODO: 가족 초대하기 (코드 생성) 페이지로 이동
    navigate("/onboard/create");
  };

  return (
    <div className="w-full h-screen bg-bg relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full">
        <SubHeader />
      </div>
      
      <div className="flex flex-row gap-[16.6px] w-full max-w-[350px] px-[5.1vw] max-px-20">
          <button
            onClick={handleFindFamily}
            className="flex-1 flex flex-col items-center justify-center border-2 border-sub-2 py-[20px] bg-bg rounded-lg shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)] gap-y-[16px]"
          >
            <img src={magnifyingGlass} alt="magnifyingGlass" className="w-[15vw] h-[15vw] max-w-[60px] max-h-[60px]" />
            <div className="flex flex-col items-center gap-y-[4px]">
              <div className="body text-sub-text">초대받고 오셨나요?</div>
              <div className="label-bold">우리 가족 찾기</div>
            </div>
          </button>

          <button
            onClick={handleInviteFamily}
            className="flex-1 flex flex-col items-center justify-center border-2 border-sub-2 py-[20px] bg-bg rounded-lg shadow-[2px_2px_2px_0_rgba(0,0,0,0.12)] gap-y-[16px]"
          >
            <img src={ticket} alt="ticket" className="w-[15vw] h-[15vw] max-w-[60px] max-h-[60px]" />
            <div className="flex flex-col items-center gap-y-[4px]">
              <div className="body text-sub-text">처음이신가요?</div>
              <div className="label-bold">가족 초대하기</div>
            </div>
          </button>
      </div>
    </div>
  );
};

export default Onboard;
