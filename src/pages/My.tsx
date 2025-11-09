import { useState } from "react";
import CommonModal from "../components/common/CommonModal";
import Profile from "../components/my/Profile";

const My = () => {
  const [modalMsg, _setModalMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col">
      <Profile />

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

export default My;
