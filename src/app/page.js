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

const style = `
  .item--Amu {
    align-items: center;
    background-color: #ffffff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 14.2rem 2.8rem 14.1rem 2.7rem;
    position: relative;
    width: 100%;

    .how-are-you-today-K2X {
        color: #000000;
        flex-shrink: 0;
        font-family: Inter, 'Source Sans Pro';
        font-size: 4rem;
        font-weight: 900;
        line-height: 1.2125;
        margin: 0rem 4.2rem 41.4rem 0rem;
        max-width: 29.3rem;
    }

    .group-86-9nF {
        background-color: #fee500;
        border-radius: 1.2rem;
        box-sizing: border-box;
        flex-shrink: 0;
        height: 5rem;
        padding: 1.5rem 11rem 1.5rem 9.0rem;
        width: 100%;
        max-width: 500px;

        .group-88-sCT {
            align-items: center;
            display: flex;
            height: 100%;
            width: 100%;

            .kakaoimg-1-DGK {
                flex-shrink: 0;
                height: 2rem;
                margin-right: 1.1rem;
                object-fit: cover;
                vertical-align: top;
                width: 2rem;
            }

            .item--YZV {
                color: rgba(0, 0, 0, 0.8500000238);
                flex-shrink: 0;
                font-family: Inter, 'Source Sans Pro';
                font-size: 1.5rem;
                font-weight: 900;
                line-height: 1.2125;
                text-align: center;
                white-space: nowrap;
            }
        }
    }
}`;

// 컴포넌트 파일 안에 CSS 스타일 추가
const ClientHomeStyle = () => (
  <style jsx>{styles}</style>
);

export default {ClientHome,ClientHomeStyle};
