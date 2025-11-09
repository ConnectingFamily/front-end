import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/common/CommonButton";
import CommonModal from "../components/common/CommonModal";
import lock from "../../public/icon/lock.svg";
import down from "../../public/icon/down.svg";
import message from "../../public/icon/message.svg";
import send from "../../public/icon/send.svg";
import more from "../../public/icon/more.svg";
import emoji from "../../public/icon/emoji.svg";
import emojiOn from "../../public/icon/emojiOn.svg";
import emojiThx from "../../public/icon/emojiThx.svg";
import emojiSry from "../../public/icon/emojiSry.svg";
import emojiLuv from "../../public/icon/emojiLuv.svg";
import emojiBest from "../../public/icon/emojiBest.svg";
import emojiOk from "../../public/icon/emojiOk.svg";
import emojiUnderstand from "../../public/icon/emojiUnderstand.svg";
import X from "../../public/icon/X.svg";

const DailyQuestion = () => {
  const navigate = useNavigate();
  const [isAnswerExpanded, setIsAnswerExpanded] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});
  const [nudgedMembers, setNudgedMembers] = useState<Record<string, boolean>>({});
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<{ id: string; label: string; src: string } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  
  // TODO: API에서 댓글 데이터 받아오기
  const [comments, setComments] = useState([
    {
      id: 1,
      userName: "혜린",
      timeAgo: "지금",
      emoji: "best",
      content: "",
      hasContent: true,
    },
    {
      id: 2,
      userName: "혜린",
      timeAgo: "2분 전",
      content: "저도 그 때 대화가 기억에 남아요.",
      hasContent: true,
    },
    {
      id: 3,
      userName: "혜린",
      timeAgo: "2분 전",
      content: "저도 그 때 대화가 기억에 남아요.",
      hasContent: true,
    },
  ]);

  // TODO: API에서 질문 데이터 받아오기
  const questionData = {
    questionNumber: 1,
    question: "가족과 최근 나눴던 대화 중 가장 기억에 남는 순간은 언제인가요?",
    isAllAnswered: true,
    myAnswered: true,
    myAnswer: "며칠 전 엄마가 밤늦게 과일 깎아서 방에 가져다주셨어요. 아무 말 안 했는데도 제가 힘든 걸 느끼고 챙겨주는 게 느껴져서 기분이 좋았어요.",
  };

  // TODO: API에서 가족 멤버 답변 상태 받아오기
  const familyMembers = [
    {
      name: "엄마",
      status: "answered", // "locked" | "not_answered" | "answered"
      answer: "며칠 전에 늦게까지 공부하느라 힘들어 보이길래 간식 챙겨주면서 잠깐 이야기했어요. 별 말은 아니었지만 그냥 곁에 있어주는 게 좋았어요.",
    },
    {
      name: "아빠",
      status: "answered",
      answer: "주말에 같이 차 타고 가다가 이런저런 얘기를 나눴는데, 진로에 대해 진지하게 상의해준 게 오랜만이었어요.",
    },
    {
      name: "동생",
      status: "answered",
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
    setIsCommentOpen(true);
  };

  const handleCloseComment = () => {
    setIsCommentOpen(false);
  };

  const handleSendComment = () => {
    if (!commentText.trim() && !selectedEmoji) {
      return;
    }
    // TODO: 댓글 전송 API 호출 (commentText와 selectedEmoji 전달)
    console.log("댓글 전송:", commentText, selectedEmoji);
    
    // 임시로 댓글 리스트에 추가 (실제로는 API 응답으로 처리)
    const newComment = {
      id: comments.length + 1,
      userName: "나", // TODO: 실제 사용자 이름
      timeAgo: "지금",
      emoji: selectedEmoji?.id || undefined,
      content: commentText.trim(),
      hasContent: !!commentText.trim(),
    };
    
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    setSelectedEmoji(null);
  };

  // 이모지 ID를 이미지로 매핑
  const getEmojiById = (emojiId?: string) => {
    if (!emojiId) return null;
    return emojiList.find(emoji => emoji.id === emojiId);
  };

  const handleEmojiToggle = () => {
    setIsEmojiOpen(!isEmojiOpen);
  };

  const handleEmojiSelect = (emoji: { id: string; label: string; src: string }) => {
    setSelectedEmoji(emoji);
    // setIsEmojiOpen(false);
  };

  const handleRemoveEmoji = () => {
    setSelectedEmoji(null);
  };

  const handleMoreClick = (commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === commentId ? null : commentId);
  };

  const handleEditComment = (commentId: number) => {
    // TODO: 댓글 수정 기능
    console.log("댓글 수정:", commentId);
    setOpenMenuId(null);
  };

  const handleDeleteComment = (commentId: number) => {
    setDeleteCommentId(commentId);
    setOpenMenuId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteCommentId) {
      // TODO: 댓글 삭제 API 호출
      console.log("댓글 삭제:", deleteCommentId);
      setComments((prev) => prev.filter((comment) => comment.id !== deleteCommentId));
      setDeleteCommentId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteCommentId(null);
  };

  const emojiList = [
    { id: "thx", label: "고마워요", src: emojiThx },
    { id: "sry", label: "미안해요..", src: emojiSry },
    { id: "luv", label: "사랑해요", src: emojiLuv },
    { id: "best", label: "최고예요!", src: emojiBest },
    { id: "ok", label: "괜찮아요", src: emojiOk },
    { id: "understand", label: "이해해요", src: emojiUnderstand },
  ];

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

      {/* 댓글 바텀 시트 */}
      {isCommentOpen && (
        <>
          {/* 배경 오버레이 */}
          <div
            className="fixed inset-0 bg-black/32 z-[998]"
            onClick={() => {
              handleCloseComment();
              setOpenMenuId(null);
            }}
          />
          
          {/* 바텀 시트 */}
          <div className="fixed bottom-0 left-0 right-0 w-full max-w-[420px] mx-auto bg-white rounded-t-[16px] shadow-[0_-4px_8px_rgba(0,0,0,0.08)] z-[999] flex flex-col max-h-[90vh]">
            {/* 헤더 */}
            <div className="flex flex-row items-center justify-center h-[57px] px-5 border-b border-[#EAEAEA]">
              <div className="label-bold text-text">댓글</div>

            </div>

            {/* 댓글 리스트 */}
            <div className="flex-1 overflow-y-auto pt-4">
              <div className="flex flex-col gap-y-4">
                {comments.map((comment, index) => {
                  const commentEmoji = getEmojiById(comment.emoji);
                  return (
                    <div key={comment.id} className={`flex flex-row gap-3 pb-4 ${index < comments.length - 1 ? "border-b border-[#EAEAEA] pb-4" : ""}`}>
                      
                      <div className="flex-1 flex flex-col gap-y-[8px] pl-[12px]">
                        <div className="flex flex-row items-center gap-[8px]">
                          <div className="label-bold text-text">{comment.userName}</div>
                          <div className="caption text-sub-text">{comment.timeAgo}</div>
                        </div>
                        <div className="flex flex-row items-center gap-2 pl-[12px] flex-wrap">
                          {commentEmoji && (
                            <img 
                              src={commentEmoji.src} 
                              alt={commentEmoji.label} 
                              className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px]"
                            />
                          )}
                          {comment.hasContent && comment.content && (
                            <div className="body text-text">{comment.content}</div>
                          )}
                        </div>
                      </div>

                      {/* 옵션 메뉴 */}
                      <div className="relative flex-shrink-0 mr-5">
                        <button 
                          onClick={(e) => handleMoreClick(comment.id, e)}
                          className="w-6 h-6 flex items-center justify-center focus:outline-none"
                        >
                          <img src={more} alt="more" className="w-6 h-6" />
                        </button>
                        
                        {/* 팝업 메뉴 */}
                        {openMenuId === comment.id && (
                          <div 
                            className="absolute right-0 top-8 bg-[#FFF6ED] rounded-[4px] flex flex-col shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10 min-w-[81px]"
                            style={{ boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }}
                          >
                            <button
                              onClick={() => handleEditComment(comment.id)}
                              className="px-4 py-3 body text-text hover:bg-[#FFE5C7] rounded-t-[4px] text-left"
                            >
                              수정하기
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="px-4 py-3 body text-text hover:bg-[#FFE5C7] rounded-b-[4px] text-left border-t border-[#EAEAEA]"
                            >
                              삭제하기
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 댓글 입력 필드 */}
            <div 
              className="px-5 max-px-[20px] pt-[12px] border-t border-[#EAEAEA]"
              style={{ boxShadow: '0px -4px 8px 0px #00000014' }}
            >
              <div className="flex flex-col">
                {/* 입력 영역 */}
                <div className="flex flex-row items-start gap-[10px] mb-[12px]">
                  {/* 이모지 버튼 */}
                  <button 
                    onClick={handleEmojiToggle}
                    className="w-[24px] h-[24px] flex items-center justify-center flex-shrink-0 my-auto"
                  >
                    <img 
                      src={isEmojiOpen ? emojiOn : emoji} 
                      alt="emoji" 
                      className="w-[24px] h-[24px]" 
                    />
                  </button>

                  {/* 선택된 이모지 표시 영역 */}
                  <div className="flex-1 flex flex-col gap-2">
                    {selectedEmoji && (
                      <div className="relative w-fit gap-x-[8px] flex flex-row items-start">
                        <img 
                          src={selectedEmoji.src} 
                          alt={selectedEmoji.label} 
                          className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px] items-center"
                        />
                        <button
                          onClick={handleRemoveEmoji}
                          className="w-[16px] h-[16px] flex items-center justify-center bg-white rounded-full text-sub-text"
                        >
                          <img src={X} alt="X" className="w-[16px] h-[16px]" />
                        </button>
                      </div>
                    )}

                    {/* 입력 필드 */}
                    <textarea
                      value={commentText}
                      onChange={(e) => {
                        setCommentText(e.target.value);
                        // 높이 자동 조절
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      placeholder={"따뜻한 공감과 이해의 댓글을 남겨주세요."}
                      className="flex-1 max-h-[120px] py-[8px] rounded-[8px] body !line-height-1 text-text focus:outline-none resize-none overflow-y-auto"
                      rows={1}
                      onKeyDown={(e) => {
                        // Shift + Enter: 줄바꿈, Enter만: 전송
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendComment();
                        }
                      }}
                    />
                  </div>

                  {/* 전송 버튼 */}
                  <div
                    onClick={handleSendComment}
                    className={`w-[24px] h-[24px] flex items-center justify-center bg-none flex-shrink-0 my-auto`}
                  >
                    <img src={send} alt="send" className="w-[24px] h-[24px]" />
                  </div>
                </div></div></div>
                <div className="px-5 max-px-[20px] border-t border-[#EAEAEA] bg-outline">
                  <div className="flex flex-col">

                {/* 이모지 선택 그리드 */}
                {isEmojiOpen && (
                  <div className="flex flex-col gap-[16px] pt-[24px] z-[999]">
                    <div className="label-bold text-text">공감 표현하기</div>
                    <div className="grid grid-cols-3 gap-y-[20px] mb-[7.81vh] max-mb-[66px]">
                      {emojiList.map((emoji) => (
                        <button
                          key={emoji.id}
                          onClick={() => handleEmojiSelect(emoji)}
                          className="flex items-center justify-center rounded-[8px]"
                        >
                          <img 
                            src={emoji.src} 
                            alt={emoji.label} 
                            className="w-[20.35vw] h-[20.35vw] max-w-[80px] max-h-[80px] items-center"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* 댓글 삭제 확인 모달 */}
      {deleteCommentId && (
        <CommonModal
          title="댓글을 삭제할까요?"
          desc="삭제한 댓글은 다시 복구할 수 없어요."
          confirmLabel="삭제"
          onConfirmClick={handleConfirmDelete}
          cancelLabel="취소"
          onCancelClick={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default DailyQuestion;
