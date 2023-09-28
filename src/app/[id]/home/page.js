"use client";

import Image from 'next/image';
import Link from 'next/link';
import './home.css';
import React, { useEffect, useState } from "react";

function ClientHome() {
  const [MemberId, setMemberidId] = useState(-1);
  const [IsMobile, setIsMobile] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [today, setToday] = useState(new Date());
  const [data, setData] = useState({});


const emoticonMap = {
  0: "😡", // 노여워하는
  1: "😌", // 느긋
  2: "😰", // 걱정스러운
  3: "😳", // 당혹스러운
  4: "😨", // 당황
  5: "🤐", // 마비된
  6: "😊", // 만족스러운
  7: "😔", // 배신당한
  8: "😞", // 버려진
  9: "😳", // 부끄러운
  10: "😠", // 분노
  11: "😟", // 불안
  12: "😢", // 비통한
  13: "😞", // 상처
  14: "😤", // 성가신
  15: "😫", // 스트레스 받는
  16: "😢", // 슬픔
  17: "😊", // 신뢰하는
  18: "😡", // 신이 난
  19: "😞", // 실망한
  20: "😈", // 악의적인
  21: "😤", // 안달하는
  22: "😌", // 안도
  23: "😠", // 억울한
  24: "😞", // 열등감
  25: "😡", // 염세적인
  26: "😢", // 외로운
  27: "😔", // 우울한
  28: "😞", // 고립된
  29: "😔", // 좌절한
  30: "😞", // 후회되는
  31: "😡", // 혐오스러운
  32: "😔", // 한심한
  33: "😊", // 자신하는
  34: "😄", // 기쁨
  35: "😤", // 툴툴대는
  36: "😳", // 남의 시선을 의식하는
  37: "😕", // 회의적인
  38: "😞", // 죄책감의
  39: "😵", // 혼란스러운
  40: "😰", // 초조한
  41: "😃", // 흥분
  42: "😱", // 충격 받은
  43: "😔", // 취약한
  44: "😌", // 편안한
  45: "😤", // 방어적인
  46: "😠", // 질투하는
  47: "😨", // 두려운
  48: "😢", // 눈물이 나는
  49: "😡", // 짜증내는
  50: "😳", // 조심스러운
  51: "😔", // 낙담한
  52: "😡", // 환멸을 느끼는
  53: "😢", // 희생된
  54: "🙏", // 감사하는
  55: "🤢", // 구역질 나는
  56: "😫", // 괴로워하는
  57: "😔", // 가난한, 불우한
};

//   const getUserIdFromCookie = () => {
//   // document.cookie를 사용하여 쿠키 문자열을 가져옵니다.
//   const cookies = document.cookie;

//   // 쿠키 문자열을 분할하여 각 쿠키를 배열로 만듭니다.
//   const cookieArray = cookies.split(";");

//   // 'userId' 쿠키를 찾습니다.
//   let userId = null;
//   for (let i = 0; i < cookieArray.length; i++) {
//     const cookie = cookieArray[i].trim();
//     if (cookie.startsWith("userId=")) {
//       userId = cookie.substring("userId=".length);
//       break;
//     }
//   }

//   return userId;
// };

  // 값 가져오기
  const fetchData = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "data/home", {
      method: "Get",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', 
      body: JSON.stringify(), // 요청 페이로드를 조정해야 할 수도 있습니다.
    })
      .then((response) => response.json())
      .then((result) => {
        setMemberidId(result.id)
        console.log(result.daily);
        setData({
          name: result.name,
          mood: result.mood || "상태메세지",
          img: result.img,
          daily: result.daily,
        });
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  };

  const handleLogout = () => {
    document.cookie = "userId=; path=/;";

    

    // 로그아웃 후 필요한 추가 작업을 수행합니다.

    // 로그아웃 후 페이지 리로딩
    window.location.href = "https://kauth.kakao.com/oauth/logout?client_id=" + process.env.NEXT_PUBLIC_LOGIN_API_KEY+"&logout_redirect_uri=https://howareyoutoday.vercel.app/";
  }



  const year = today.getFullYear(); // 연도
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 월 (0부터 시작하므로 1을 더하고 두 자리로 포맷)
  const day = String(today.getDate()).padStart(2, '0'); // 일 (두 자리로 포맷)

  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {

    fetchData();
    
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = ['iphone', 'ipad', 'ipod', 'android'];
    const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
    setIsMobile(isMobileDevice);

    // 초기 달력 데이터 생성
    const initialCalendarData = Array(6).fill(null).map(() => Array(7).fill(null));

    // 현재 월의 시작일을 찾아서 달력 데이터 업데이트
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startingDay = firstDayOfMonth.getDay(); // 0 (일요일)부터 6 (토요일)까지
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // 현재 월의 마지막 날짜
    const lastDate = lastDayOfMonth.getDate(); // 마지막 날짜

    let dayCounter = 1;

    const updatedCalendarData = initialCalendarData.map((row, rowIndex) => {
      return row.map((_, colIndex) => {
        if (rowIndex === 0 && colIndex < startingDay) {
          // 이번 달 시작일 이전의 칸은 비워둠
          return null;
        }

        const dayValue = dayCounter;
        dayCounter++;

        // 현재 월의 마지막 날짜를 초과하는 경우 null 반환
        if (dayValue > lastDate) {
          return null;
        }

        return dayValue; // 현재 날짜로 업데이트
      });
    });

    // 추가 코드: 마지막 주가 비어있을 경우, 빈 줄 추가
    if (updatedCalendarData[5].every(day => day === null)) {
      updatedCalendarData.pop();
    }

    setCalendarData(updatedCalendarData);

    // 현재 월과 연도 설정
    setCurrentMonth(today.toLocaleString('default', { month: 'short' }));
    setCurrentYear(today.getFullYear().toString());
  }, [today]);

  // 클릭 이벤트 핸들러
  const handleDateClick = (day) => {
    // 날짜를 "1/년도-월-일/daily" 형식으로 포맷

    const formattedDate = `${currentYear}-${currentMonth}-${day}/daily`;
    // 페이지 이동
    const cleanedFormattedDate = formattedDate.replace("월", "");

    window.location.href = cleanedFormattedDate;

  };

  // 이전 달로 이동하는 함수
  const goToPreviousMonth = () => {
    const newDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    setToday(newDate);
  };

  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    const newDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    setToday(newDate);
  };

  // 이번 달 날짜 요소 렌더링
  const renderedCalendar = calendarData.map((row, rowIndex) => {
    return (
      <div className="frame-4992-vvT" id={`1:216-${rowIndex}`} key={`1:216-${rowIndex}`}>
        {row.map((day, colIndex) => {
          if (day === null) {
            return <p key={`dd${rowIndex}-${colIndex}`} />;
          }

          const isToday = parseInt(day, 10) === today.getDate();
          const isSameMonth = today.getMonth() === new Date().getMonth();
          const isSameYear = today.getFullYear() === new Date().getFullYear();

          const classNames = isToday && isSameMonth && isSameYear ? 'item-1-sao date-inactive-4Uw' : 'item-1-sao';

          return (
            <p className={classNames} id={`dd${rowIndex * 7 + colIndex + 1}`} key={`dd${rowIndex}-${colIndex}`} onClick={() => handleDateClick(day)}>
              {day}
            </p>
          );
        })}
      </div>
    );
  });

  // 일기 이동 하단 클릭 이벤트 핸들러
  const handleItemClick = (item) => {
    // item.day 또는 item.text를 사용하여 이동할 경로 생성
    const itemPath = `/${MemberId}/${item.day}/daily`; // 예시 경로

    // 페이지 이동
    window.location.href = itemPath;
  };

  const renderDailyData = () => {
    if (!data.daily) {
      return null; // data.daily가 없으면 아무것도 렌더링하지 않음
    }

    return data.daily.map((item) => (
      <div className="auto-group-cfqb-NdM" key={item.id} onClick={() => handleItemClick(item)}>
        <p className="yy-mm-dd-daily-u7V">{item.day} {emoticonMap[item.imoticon]}</p>
        <p className="item--2xo">{item.text}</p>
      </div>
    ));
  };

  const handleHomeClick = () => {
    // 홈으로 이동하는 코드를 여기에 추가
    window.location.reload();
  };

  return (
    <div className="item--47h" id="1:16">
      <div className="auto-group-qzao-ydy" id="HRDj1wSqrPtMxwDCLPQZao" >
        <p className="how-are-you-today-h4B" id="1:32" onClick={() => handleHomeClick()}>HOW ARE YOU TODAY?</p>
        <button className="logout-button" onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="auto-group-kq2x-anB" id="HRDjEWvDhgnSZGwxjYkq2X">
        <div className="image-container">
          <img className="rectangle-104-UsZ" src={data.img} id="1:36" />
        </div>        <div className="auto-group-tmmz-o99" id="HRDjM6Zb7wPNRtdEfXtMmZ">
          <p className="item--Xqq" id="1:48">{data.name}</p>
          <p className="item--dP5" id="1:49">{data.mood}</p>
        </div>
      </div>
      <div className="component-Z1q" id="1:178">
        <div className="frame-4987-BJ7" id="1:179">
          <img className="icons-GaT" src="../left.svg" id="1:180" onClick={goToPreviousMonth} />
          <p className="september-2021-noh" id="1:181">{`${currentYear}년 ${currentMonth}`}</p> {/* 현재 월과 연도 표시 */}
          <img className="icons-VCK" src="../right.svg" id="1:182" onClick={goToNextMonth} />
        </div>
        <div className="frame-4988-CcX" id="1:183">
          <p className="sat-X91" id="I1:184;1:87">SAN</p>
          <p className="sat-E3R" id="I1:185;1:87">MON </p>
          <p className="sat-L6T" id="I1:186;1:87">TUE</p>
          <p className="sat-pGX" id="I1:187;1:87">WED</p>
          <p className="sat-wM9" id="I1:188;1:87">THU</p>
          <p className="sat-fnw" id="I1:189;1:87">FRI</p>
          <p className="sat-oeF" id="I1:190;1:87">SAT</p>
        </div>
        <div className="frame-4990-Y63" id="1:191">
          {renderedCalendar}
        </div>
      </div>
      <div className="group-91-eST" id="4:421">
        {renderDailyData()}
      </div>
      <Link href={`/${MemberId}/${formattedDate}/chat`} passHref>
        <div className="group-89-x1D">Let's talk about today</div>
      </Link>
    </div>
  );
}


export default ClientHome;
