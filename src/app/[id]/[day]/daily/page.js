"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import './daily.css';

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

//use client
export default function ClientHome(props) {
  const [data, setData] = useState({});
  const id = props.params.id
  const day = props.params.day

  // 값 가져오기
  const fetchData = () => {
    fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "data/" + day + "/daily", {
      method: "Get",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(), // 요청 페이로드를 조정해야 할 수도 있습니다.
    })
      .then((response) => response.json())
      .then((result) => {
        if (typeof result.text == 'string') {
          const aiResponseWithBreaks = result.text.split('\\n').map((line, index) => (
            <span key={index}>
              {line}
              {index !== result.text.length - 1 && <br />}
            </span>
          ));
          setData({
            day: result.day,
            id: result.id,
            text: aiResponseWithBreaks,
            imoticon: result.imoticon
          });
        } else{
          setData({
            day: result.day,
            id: result.id,
            text: result.text,
            imoticon: result.imoticon,
          });
        }
        
        console.log(result)
      })
      .catch((error) => {
        console.error("데이터 가져오기 오류:", error);
      });
  };


  const router = useRouter();



  useEffect(() => {
    fetchData();
  }, []);

  if (data.id == 0) {
    router.push(`../${day}/chat`);  // Chat 페이지로 이동
  }

  const [IsMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const mobileKeywords = ['iphone', 'ipad', 'ipod', 'android'];
    const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
    setIsMobile(isMobileDevice);
  }, []);

  const handleHomeClick = () => {
    // 홈으로 이동하는 코드를 여기에 추가
    window.location.href = `/${id}/home`;
  };

  const handleChatAgain = () => {
    const checkData = async () => {
      const check = await removeDaily();
      if (check != null) {
        // 주소로 리다이렉션
        window.location.href = `/${id}/${day}/chat`;
      }
    };

    checkData();
  }

  const removeDaily = async () => {
    const requestBody = {
      "id": id,
      "day": day,
    };
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "data/cahtAgain", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        return null;
      }
      return "1";
    } catch (error) {
      return "error1";
    }
  };




  return (
    <div className="item--YVD" id="4:317">
      <div className="auto-group-8zdv-fTM" id="V5p36pBQzERKNhUBMe8zDV" >
        <p className="how-are-you-today-btj" id="4:319" onClick={() => handleHomeClick()}>HOW ARE YOU TODAY?</p>
      </div>
      <div className="group-92-Vz7" id="4:429">
        <div className="auto-group-svvw-Ppb" id="V5p3F4Sg5fKu7a3ykWSVvw">
          <div className="yy-mm-dd-daily-fXD" id="4:431">{data.day} </div>
          {emoticonMap[data.imoticon]}
          <div className="group-93-ikP" id="4:457" onClick={() => handleChatAgain()}>chat again</div>
        </div>
        <p className="item--vrT" id="4:432">{data.text}</p>
      </div>
      <div className="group-92-jQT" id="4:450" onClick={() => handleHomeClick()}>HOME</div>
    </div>

  )
}

