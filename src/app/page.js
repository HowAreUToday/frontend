"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from "react";
import './login.css';
import { GetServerSideProps } from 'next';

//use client
function ClientHome() {
  // const [IsMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const userAgent = window.navigator.userAgent.toLowerCase();
  //   const mobileKeywords = ['iphone', 'ipad', 'ipod', 'android'];
  //   const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword));
  //   setIsMobile(isMobileDevice);
  // }, []);

  const kakaoLoginLink =
    'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' +
    process.env.NEXT_PUBLIC_LOGIN_API_KEY +
    '&redirect_uri=' +
    process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI + "&response_type=code";


  return (
    <div className="item--Amu" id="1:2">
      <p className="how-are-you-today-K2X" id="1:4">
        HOW ARE YOU

        <br />
        TODAY?

      </p>
      <Link href={kakaoLoginLink} >
        <div className="group-86-9nF" id="1:5">

          <div className="group-88-sCT" id="1:7">
            <img className="kakaoimg-1-DGK" src="kakao.svg" id="1:9" />
            <p className="item--YZV" id="1:8">카카오로 시작하기</p>
          </div>
        </div>
      </Link>
    </div>
  )
}


export default ClientHome;