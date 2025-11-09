import { useState } from "react";
import AnswerSituation from "../components/home/AnswerSituation";
import GradientBox from "../components/home/GradientBox";
import Mission from "../components/home/Mission";
import CommonModal from "../components/common/CommonModal";

const Home = () => {
  const [modalMsg, _setModalMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const descDummy = "앞으로 마음 115개 더 모으면 가족 레벨이 올라요.";
  const questionDummy =
    "가족과 최근 나눴던 대화 중 <br/>가장 기억에 남는 순간은 언제인가요?";

  return (
    <div className="w-full flex flex-col">
      {/* gradient box */}
      <GradientBox descDummy={descDummy} questionDummy={questionDummy} />

      {/* ans situation */}
      <AnswerSituation />

      {/* today mission */}
      <Mission />

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

export default Home;
