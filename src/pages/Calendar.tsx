import { useNavigate } from "react-router-dom";
import dayHeart from "../../public/icon/dayHeart.svg";
import up from "../../public/icon/up.svg";

const Calendar = () => {
  const navigate = useNavigate();
  // TODO: API에서 캘린더 데이터 받아오기
  const summaryData = {
    answeredQuestions: 12,
    consecutiveDays: 8,
  };

  // TODO: API에서 답변한 날짜 데이터 받아오기
  const answeredDates = [
    { year: 2025, month: 9, day: 2 },
    { year: 2025, month: 9, day: 3 },
    { year: 2025, month: 9, day: 4 },
    { year: 2025, month: 9, day: 5 },
    { year: 2025, month: 9, day: 6 },
  ];

  // 캘린더 데이터 생성
  const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    // 첫 주의 빈 칸
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // 날짜 채우기
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAnswered = (year: number, month: number, day: number) => {
    return answeredDates.some(
      (date) => date.year === year && date.month === month && date.day === day
    );
  };

  const calendars = [
    { year: 2025, month: 9 },
    { year: 2025, month: 8 },
  ];

  const weekDays = ["월", "화", "수", "목", "금", "토", "일"];

  return (
    <div className="w-full flex flex-col bg-bg">
      {/* 요약 카드 */}
      <div className="px-5 py-5 max-px-[20px] max-py-[20px]">
        <div className="flex flex-row gap-[16px] items-center justify-center">
          {/* 답변한 질문 카드 */}
          <button
            onClick={() => navigate("/answered-questions")}
            className="w-[167px] bg-[#FFF9F4] rounded-[4px] border-[3px] border-white flex flex-col gap-[8px] py-[16px] px-[10px] items-center justify-center"
            style={{ boxShadow: '2px 2px 2px rgba(0,0,0,0.12)' }}
          >
            <div className="body text-sub-text">답변한 질문</div>
            <div className="title text-text">{summaryData.answeredQuestions}개</div>
          </button>

          {/* 연속 답변 일수 카드 */}
          <div 
            className="w-[167px] bg-[#FFF9F4] rounded-[4px] border-[3px] border-white flex flex-col gap-[8px] py-[16px] px-[10px] items-center justify-center"
            style={{ boxShadow: '2px 2px 2px rgba(0,0,0,0.12)' }}
          >
            <div className="body text-sub-text">연속 답변 일수</div>
            <div className="title text-text">{summaryData.consecutiveDays}일</div>
          </div>
        </div>
      </div>

      {/* 캘린더 리스트 */}
      <div className="flex flex-col gap-8 max-gap-[32px] px-5 pb-6">
        {calendars.map((cal) => {
          const calendarDays = generateCalendar(cal.year, cal.month);
          const monthName = `${cal.month}월`;

          return (
            <div key={`${cal.year}-${cal.month}`} className="flex flex-col gap-[4px]">
              {/* 년/월 헤더 */}
              <div className="body text-text text-center">
                {cal.year}년 
              </div>
              <div className="title text-text text-center">
                {monthName}
              </div>

              {/* 요일 헤더 */}
              <div className="pt-[12px] grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <div
                    key={day}
                  className="text-center body text-sub-text"
                >
                  {day}
                </div>
                ))}
              </div>

              {/* 캘린더 그리드 */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={index} className="aspect-square" />;
                  }

                  const hasAnswer = isAnswered(cal.year, cal.month, day);

                  return (
                    <div
                      key={index}
                      className="aspect-square flex items-center justify-center relative"
                    >
                      {hasAnswer ? (
                        <img
                          src={dayHeart}
                          alt="answered"
                          className="w-10 h-10 max-w-[40px] max-h-[40px]"
                        />
                      ) : (
                        <div className="body text-text">{day}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 상단으로 스크롤 버튼 - 화면에 고정 */}
      <button
        onClick={handleScrollToTop}
        className="fixed bottom-[72px] right-[20px] w-12 h-12 max-w-[48px] max-h-[48px] !rounded-full bg-[#FFE3C7] flex items-center justify-center p-3 shadow-[2px_2px_4px_rgba(0,0,0,0.12)] z-10"
      >
        <img src={up} alt="scroll to top" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Calendar;

