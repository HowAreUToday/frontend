"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation';

import './daily.css';

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
        setData({
          day: result.day,
          id: result.id,
          text: result.text,
        });
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
          <div className="yy-mm-dd-daily-fXD" id="4:431">{data.day}</div>
          <div className="group-93-ikP" id="4:457" onClick={() => handleChatAgain()}>chat again</div>
        </div>
        <p className="item--vrT" id="4:432">{data.text}</p>
      </div>
      <div className="group-92-jQT" id="4:450" onClick={() => handleHomeClick()}>HOME</div>
    </div>

  )
}

