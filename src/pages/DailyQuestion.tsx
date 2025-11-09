import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import lock from "../../public/icon/lock.svg";
import down from "../../public/icon/down.svg";
import message from "../../public/icon/message.svg";

const DailyQuestion = () => {
  const navigate = useNavigate();
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});
  const [nudgedMembers, setNudgedMembers] = useState<Record<string, boolean>>({});

  // TODO: API에서 질문 데이터 받아오기
  const questionData = {
    questionNumber: 1,
    question: "가족과 최근 나눴던 대화 중 가장 기억에 남는 순간은 언제인가요?",
    isAllAnswered: false,
    myAnswered: false,
    myAnswer: "며칠 전 엄마가 밤늦게 과일 깎아서 방에 가져다주셨어요. 아무 말 안 했는데도 제가 힘든 걸 느끼고 챙겨주는 게 느껴져서 기분이 좋았어요.",
  };

  // TODO: API에서 가족 멤버 답변 상태 받아오기
  const familyMembers = [
    {
      name: "엄마",
      status: "locked", // "locked" | "not_answered" | "answered"
      answer: "며칠 전에 늦게까지 공부하느라 힘들어 보이길래 간식 챙겨주면서 잠깐 이야기했어요. 별 말은 아니었지만 그냥 곁에 있어주는 게 좋았어요.",
    },
    {
      name: "아빠",
      status: "not_answered",
      answer: "주말에 같이 차 타고 가다가 이런저런 얘기를 나눴는데, 진로에 대해 진지하게 상의해준 게 오랜만이었어요.",
    },
    {
      name: "동생",
      status: "not_answered",
      answer: "요즘 학교 생활이 힘들다고 말하길래 같이 산책하면서 이야기해줬어요. 평소엔 투덜거리기만 하는데 그날은 진심으로 들어줘서 고마웠어요.",
    },
  ];

  const handleAnswerClick = () => {
    // TODO: 답변 페이지로 이동
    navigate("/answer");
  };

  const handleNudgeClick = (memberName: string) => {
    // TODO: 마음 두드리기 API 호출 (알림 보내기)
    console.log(`${memberName}에게 마음 두드리기`);
    setNudgedMembers((prev) => ({
      ...prev,
      [memberName]: true,
    }));
  };

  const handleToggleAnswer = () => {
    setIsAnswerExpanded(!isAnswerExpanded);
  };

  const handleToggleMemberAnswer = (memberName: string) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [memberName]: !prev[memberName],
    }));
  };

  const handleMessageClick = () => {
    // TODO: 메시지/채팅 페이지로 이동
    console.log("메시지 버튼 클릭");
  };

  return (
    <div className="w-full flex flex-col">
      {/* 질문 카드 */}
      <div
        className="w-full
          bg-gradient-to-b from-[#FFFFFD] to-[#FFF6ED]
          rounded-b-[20px]
          shadow-[0_4px_8px_rgba(0,0,0,0.08)]
          flex flex-col gap-y-[1.42vh] max-gap-y-[12px]
          pt-[60px] px-5 pb-6"
      >
        {/* 질문 번호 */}
        <div className="bg-sub-1 text-main py-1 px-2 w-fit rounded">
          Q{questionData.questionNumber}
        </div>

        {/* 질문 텍스트 */}
        <div className="title text-text break-keep break-words">
          {questionData.question}
        </div>

        {/* 답변하러 가기 버튼 */}
        {!questionData.myAnswered && (
        <CommonButton
          label="답변하러 가기"
          img="/icon/next.svg"
          className="body-bold !rounded-[8px]"
          width="w-fit"
          padding="px-[12px] py-[8px]"
          onClick={handleAnswerClick}
        />
        )}
        {questionData.myAnswered && (
          <CommonButton
          label="답변 완료"
          className="body-bold !rounded-[8px]"
          width="w-fit"
          padding="px-[12px] py-[8px]"
          disabled={true}
        />
        )}
      </div>

      {/* 정보 메시지 */}
      {!questionData.isAllAnswered && (
      <div className="flex flex-row items-center gap-2 px-5 mb-[2.36vh] max-mb-[20px] mt-[2.36vh] max-mt-[20px]">
        <div className="w-4 h-4 rounded-full bg-none border border-sub-text flex items-center justify-center">
          <span className="text-sub-text text-[10px] font-bold">!</span>
        </div>
        <div className="body text-sub-text">
          모든 멤버가 답변을 작성해야 답안이 공개돼요.
          </div>
        </div>
      )}

      {/* 가족 멤버 상태 리스트 */}
      <div className="flex flex-col">
        {questionData.myAnswered && (
          <div
          className={`
            w-full
            bg-bg
            rounded-[4px]
            py-[16px] px-5
            flex flex-col gap-y-[8px]
            border-b border-[#EAEAEA]
          `}
        >
          {/* 멤버 이름 */}
          <div className="flex flex-row items-center justify-between">
            <div className="label-bold text-text">나</div>
            <button  
              onClick={handleToggleAnswer}
              className="w-[16px] h-[16px] flex items-center justify-center focus:outline-none" 
            >
              <img 
                src={down} 
                alt="down" 
                className={`w-[16px] h-[16px] transition-transform duration-300 ${
                  isAnswerExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <div 
            className={`px-[12px] body text-text overflow-hidden transition-all duration-300 ease-in-out ${
              !isAnswerExpanded ? "line-clamp-2" : ""
            }`}
            style={{
              maxHeight: isAnswerExpanded ? "1000px" : "2.8em",
            }}
          >
            {questionData.myAnswer}
          </div>
          </div>
        )}
        {familyMembers.map((member, index) => (
          <div
            key={index}
            className={`
              w-full
              bg-bg
              rounded-[4px]
              py-[16px] px-5
              flex flex-col gap-y-[8px]
              ${index < familyMembers.length ? "border-b border-[#EAEAEA]" : ""}
            `}
          >
            {/* 상태에 따른 표시 */}
            {questionData.isAllAnswered && member.status === "answered" && (
              <>
                <div className="flex flex-row items-center justify-between">
                  <div className="label-bold text-text">{member.name}</div>
                  <button  
                    onClick={() => handleToggleMemberAnswer(member.name)}
                    className="w-[16px] h-[16px] flex items-center justify-center focus:outline-none" 
                  >
                    <img 
                      src={down} 
                      alt="down" 
                      className={`w-[16px] h-[16px] transition-transform duration-300 ${
                        expandedMembers[member.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div 
                  className={`px-[12px] body text-text overflow-hidden transition-all duration-300 ease-in-out ${
                    !expandedMembers[member.name] ? "line-clamp-2" : ""
                  }`}
                  style={{
                    maxHeight: expandedMembers[member.name] ? "1000px" : "2.8em",
                  }}
                >
                  {member.answer}
                </div>
              </>
            )}

            {!questionData.isAllAnswered && (
              <>
                {/* 멤버 이름 */}
                <div className="label-bold text-text">{member.name}</div>
              </>
            )}

            {!questionData.isAllAnswered && member.status === "locked" && (
              <div className="flex flex-row items-center gap-[4px] pl-[12px]">
                <img src={lock} alt="lock" className="w-[16px] h-[16px] items-center" />
                <div className="body text-sub-text">
                  아직 답변 공개 전이에요.
                </div>
              </div>
            )}

            {!questionData.isAllAnswered && member.status === "not_answered" && (
              <div className="flex flex-row items-center justify-between px-[12px]">
                <div className="body text-sub-text">
                  아직 답변을 작성하지 않았어요.
                </div>
                <CommonButton
                  label="마음 두드리기"
                  bgColor="bg-sub-1"
                  textColor={nudgedMembers[member.name] ? "text-[#ffffff] body" : "text-text body"}
                  className="!w-fit !rounded-[8px]"
                  padding="px-4 py-2.5"
                  onClick={() => handleNudgeClick(member.name)}
                  disabled={nudgedMembers[member.name] || false}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 메시지 버튼 - isAllAnswered가 true일 때만 표시 */}
      {questionData.isAllAnswered && (
        <button
          onClick={handleMessageClick}
          className="fixed bottom-[72px] right-[20px] w-12 h-12 !rounded-full bg-sub-1 flex items-center justify-center shadow-[2px_2px_4px_rgba(0,0,0,0.12)] z-10"
        >
          <img 
            src={message} 
            alt="message" 
            className="w-6 h-6" 
          />
        </button>
      )}
    </div>
  );
};

export default DailyQuestion;
