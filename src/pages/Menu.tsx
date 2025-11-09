import { useState } from "react";
import CommonModal from "../components/common/CommonModal";

const Menu = () => {
  const [modalMsg, _setModalMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-[10px]">
      <img src="/icon/heartToHeart.svg" alt="noti" className="w-[200px]" />
      <div className="body-font">준비 중인 페이지에요</div>

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

export default Menu;
