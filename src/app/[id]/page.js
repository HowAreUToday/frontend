"use client";

import { useEffect, useState } from "react";
import axios from 'axios';

//use client
export default function ClientHome() {
  useEffect(() => {
    // Kakao 로그인 시 발생한 'code' 값을 가져와서 Java 백엔드의 '/kakao' 엔드포인트에 전달합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Java 백엔드의 '/kakao' 엔드포인트에 'code'를 전달하여 Kakao 로그인 및 액세스 토큰 획득을 수행합니다.
      sendCodeToBackend(code);
    }
  }, []);

  const sendCodeToBackend = async (code) => {
    try {
      // Java 백엔드의 '/kakao' 엔드포인트에 'code'를 전달하여 Kakao 로그인 및 액세스 토큰 획득을 수행합니다.
      const response = await axios.get(`http://localhost:9090/member/kakao?code=${code}`);

      // Java 백엔드에서의 응답을 처리합니다.
      console.log('Java 백엔드에서의 응답:', response.data);

      // 필요한 작업을 수행합니다. 예를 들어, 응답에서 액세스 토큰을 추출하거나 사용자 정보를 업데이트할 수 있습니다.
    } catch (error) {
      // 오류 처리
      console.error('Java 백엔드로 코드를 보내는 중 오류 발생:', error);
    }
  };

  return (
    <div>
      로그인하는 중
    </div>
  );
}