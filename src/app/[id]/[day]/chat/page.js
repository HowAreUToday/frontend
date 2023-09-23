"use client";

import Image from 'next/image';
import Link from 'next/link';
import './chat.css';
import { useEffect, useState, useRef } from "react";

// use client
function ClientHome(props) {
  const [messages, setMessages] = useState([]); // 대화 메시지 배열
  const [userMessage, setUserMessage] = useState(''); // 사용자가 입력한 메시지 상태
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 파일
  const [showModal, setShowModal] = useState(false);
  const chatContainerRef = useRef(null);

  const id = props.params.id
  const day = props.params.day

  useEffect(() => {
    const checkData = async () => {
      const check = await checkDaily();
      if (check != null) {
        // 주소로 리다이렉션
        window.location.href = `/${id}/${day}/daily`;
      }
    };

    checkData();
  }, []);

  const checkDaily = async () => {
    const requestBody = {
      "id": id,
      "day": day,
    };
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "data/checkDaily", {
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
      const result = await response.json();

      if (!result.text) {
        return null;
      }


      return "1";
    } catch (error) {
      return "error1";
    }
  };



  // 메시지를 받을 때마다 스크롤을 아래로 이동
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // 메시지가 도착할 때마다 scrollToBottom 함수 호출
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // messages 배열은 메시지를 저장하는 배열입니다.

  // 모달 열기 함수
  const openModal = () => {
    setShowModal(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setShowModal(false);
  };




  // AI 응답 시뮬레이션 함수 (임시 예시)
  const simulateAIResponse = async (userMessage) => {
    const requestBody = {
      "userMessage": userMessage,
      "day": day,
    };
    try {

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "data/chatAI", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        return "400에러 생성 실패";
      }

      const result = await response.json();
      return result.text;

    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
      throw error; // 오류 처리를 위해 에러를 다시 던집니다.
    }
  };

  // 사용자가 메시지를 입력할 때 호출되는 함수
  const handleUserMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  // 엔터 키를 눌렀을 때 메시지 전송
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // 메시지를 전송할 때 호출되는 함수
  const handleSendMessage = async () => {
    if (userMessage.trim() === '' && !selectedImage) {
      return; // 빈 메시지 전송 방지
    }

    const user = userMessage;
    setUserMessage('');
    
    // 사용자가 입력한 메시지를 메시지 배열에 추가
    if (userMessage.trim() !== '') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `${user}`, type: 'group-96-oiF', }, // 사용자 메시지
      ]);
    }

    // // 이미지 메시지 추가
    // if (selectedImage) {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { image: selectedImage, type: 'group-96-oiF' }, // 이미지 메시지
    //   ]);
    // }

    // AI 응답 생성 및 추가 (임시 예시)
    const aiResponse = await simulateAIResponse(user);
    // const aiResponseWithBreaks = aiResponse.replace('\n', '<br>');

    const aiResponseWithBreaks = aiResponse.split('\\n').map((line, index) => (
      <span key={index}>
        {line}
        {index !== aiResponse.length - 1 && <br />}
      </span>
    ));


    setMessages((prevMessages) => [
      ...prevMessages,
      { text: aiResponseWithBreaks, type: 'group-95-bcB' }, // AI 응답 메시지
    ]);
  
    // 메시지 입력 필드 및 이미지 초기화

    setSelectedImage(null);
  };

  // 이미지 업로드 input 요소의 참조
  const imageInputRef = useRef();

  // 이미지 선택 시 호출되는 함수
  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  // 이미지 업로드 버튼을 누르면 이미지 선택 input 클릭
  const handleImageUploadClick = () => {
    openModal();
    // imageInputRef.current.click();
  };

  const handleHomeClick = () => {

    window.location.href = `/${id}/home`;

  };

  const handleGoDaily = async () => {
    try {
      const loader = document.getElementById("loader");
      loader.style.display = "block";

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}data/${id}/${day}/makedaily`;
      const response = await fetch(url, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },

      });

      if (!response.ok) {
        return "400에러 생성 실패";
      }

      // 주소로 리다이렉션
      window.location.href = `/${id}/${day}/daily`;

    } catch (error) {
      console.error("데이터 가져오기 오류:", error);
      throw error; // 오류 처리를 위해 에러를 다시 던집니다.
    }finally {
    // 로딩 스피너를 숨깁니다.
    const loader = document.getElementById("loader");
    loader.style.display = "none";
    }
  }

  return (
    <div className="item--ZNf" id="4:460">
      <div id="loader" class="loader"></div>

      <div className="auto-group-fkst-ANT" id="D9vWPRYgXLcs3ATDcbfkST" >
        <p className="how-are-you-today-Et7" id="4:461" onClick={() => handleHomeClick()}>HOW ARE YOU TODAY?</p>
        <button className="logout-button" onClick={handleGoDaily}>대화종료</button>
      </div>

      {showModal && (
        <div className="dialog">
          <div className="dialog-content">
            <p>서비스 준비 중입니다.</p>
            <button onClick={closeModal}>닫기</button>
          </div>
        </div>
      )}

      {/* 대화 메시지를 렌더링 */}
      <div className="message-container" ref={chatContainerRef}>

        {messages.map((message, index) => (
          <div key={index} className={`${message.type}`}>
            {message.text && <div> {message.text}</div>}
            {message.image && (
              <img src={URL.createObjectURL(message.image)} alt="사용자가 업로드한 이미지" />
            )}
          </div>
        ))}
      </div>

      <div className="auto-group-zgb1-ZyZ" id="D9vWhVru6v7znkaWwftMh9">
        <div className="auto-group-tmh9-S1m" id="D9vWhVru6v7znkaWwftMh9">
          {/* 사용자가 입력한 메시지를 입력하는 입력 필드 */}
          <img
            className="image-2-i5m"
            src="../../loadimg.svg"
            id="13:45"
            onClick={handleImageUploadClick}
          />
          <input
            type="text"
            className="group-92-mJw"
            id="4:467"
            placeholder="채팅을 입력하세요"
            value={userMessage}
            onChange={handleUserMessageChange}
            onKeyPress={handleKeyPress} // 엔터 키 이벤트 핸들링 추가
          />
          {/* 메시지 전송 버튼 */}
          <div className="group-94-caT" id="4:473">
            <img
              className="image-1-juy"
              src="../../chatsend.svg"
              id="4:490"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </div >
  );
}

export default ClientHome;
