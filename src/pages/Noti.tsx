import { useState } from "react";
import CommonModal from "../components/common/CommonModal";

const Noti = () => {
  const [modalMsg, _setModalMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-[10px]">
      <img src="/icon/heartToHeart.svg" alt="noti" className="w-[200px]" />
      <div className="body-font">아직 알림이 없어요</div>

      {modalOpen && (
        <CommonModal
          desc={modalMsg}
          confirmLabel="확인"
          onConfirmClick={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Noti;
