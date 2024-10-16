import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// json-server API 엔드포인트 설정
const API_URL = 'http://localhost:3000/guestbookEntries';

// Styled Components 정의
const GuestbookWrapper = styled.div`
  background-color: #efebe9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
  font-family: 'Noto Sans KR', sans-serif;

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px auto;
    width: 90%;
  }
`;
 
const Title = styled.h2`
  color: #4a4a4a;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  color: #555;
  font-size: 1rem;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  width: 100%;

  &:focus {
    border-color: #f5a623;
    outline: none;
    box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  width: 100%;
  min-height: 100px;

  &:focus {
    border-color: #f5a623;
    outline: none;
    box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #8d6e63;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f4c3e;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 10px;
  }
`;

const MessageList = styled.ul`
  margin-top: 20px;
  list-style: none;
  padding: 0;
`;

const MessageItem = styled.li`
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  strong {
    color: #f5a623;
  }

  span {
    display: block;
    color: #777;
    font-size: 14px;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const NoMessage = styled.p`
  color: #999;
  text-align: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #8d6e63;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #6f4c3e;
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Popup = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  background-color: #e57373;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #ef5350;
  }
`;

// 방명록 컴포넌트
const Guestbook = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState(''); // 비밀번호 상태 추가
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태
  const entriesPerPage = 3;

  // 데이터 가져오기 (GET)
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        setGuestbookEntries(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 데 실패했습니다.', error);
      }
    };
    fetchEntries();
  }, []);

  // 방명록 제출 함수 (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '' || message.trim() === '' || password.trim() === '') {
      alert('이름, 메시지 및 비밀번호를 입력해 주세요.');
      return;
    }

    const newEntry = { name, message, password, date: new Date().toLocaleString() };

    try {
      const response = await axios.post(API_URL, newEntry);
      setGuestbookEntries([...guestbookEntries, response.data]); // 새 메시지를 리스트에 추가
      setName(''); // 입력값 초기화
      setMessage('');
      setPassword(''); // 비밀번호 초기화
      setIsPopupOpen(false); // 팝업 닫기
    } catch (error) {
      console.error('데이터를 추가하는 데 실패했습니다.', error);
    }
  };

  // 현재 페이지에 해당하는 메시지 목록
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = guestbookEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  // 페이지 변경 함수
  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < Math.ceil(guestbookEntries.length / entriesPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <GuestbookWrapper>
      <Title>방명록</Title>

      {currentEntries.length === 0 ? (
        <NoMessage>아직 남겨진 메시지가 없습니다.</NoMessage>
      ) : (
        <MessageList>
          {currentEntries.map((entry, index) => (
            <MessageItem key={index}>
              <strong>{entry.name}</strong>: {entry.message}
              <span>{entry.date}</span>
            </MessageItem>
          ))}
        </MessageList>
      )}

      <Button onClick={() => setIsPopupOpen(true)}>작성하기</Button>

      <Pagination>
        <PageButton onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          이전
        </PageButton>
        <span>{currentPage}</span>
        <PageButton onClick={() => handlePageChange('next')} disabled={currentPage >= Math.ceil(guestbookEntries.length / entriesPerPage)}>
          다음
        </PageButton>
      </Pagination>

      {isPopupOpen && (
        <PopupOverlay>
          <Popup>
            <h3>방명록 작성하기</h3>
            <Form onSubmit={handleSubmit}>
              <div>
                <Label>이름</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <Label>메시지</Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="메시지를 남겨 주세요"
                />
              </div>
              <div>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                />
              </div>
              <Button type="submit">남기기</Button>
            </Form>
            <CloseButton onClick={() => setIsPopupOpen(false)}>닫기</CloseButton>
          </Popup>
        </PopupOverlay>
      )}
    </GuestbookWrapper>
  );
};

export default Guestbook;
