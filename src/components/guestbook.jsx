import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components 정의
const GuestbookWrapper = styled.div`
  background-color: #efebe9;  // 배경색
  padding: 30px;  // 여백 추가
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Title = styled.h2`
  color: #4a4a4a;
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  color: #555;
  font-size: 18px;
  margin-bottom: 5px; // 라벨과 입력창 간격
`;

const Input = styled.input`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  width: 100%; // 너비를 100%로 설정하여 크기 통일

  &:focus {
    border-color: #f5a623;
    outline: none;
    box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  background-color: #fff;
  width: 100%; // 너비를 100%로 설정하여 크기 통일
  min-height: 100px;

  &:focus {
    border-color: #f5a623;
    outline: none;
    box-shadow: 0 0 5px rgba(245, 166, 35, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px;
  background-color: #8d6e63;  // 부드러운 갈색
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6f4c3e;  // 어두운 갈색
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
    margin-top: 5px;
    color: #777;
    font-size: 14px;
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
  background-color: #8d6e63;  // 부드러운 갈색
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
    background-color: #6f4c3e;  // 어두운 갈색
  }
`;

// 방명록 컴포넌트
const Guestbook = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 3; // 한 페이지에 보여줄 메시지 수

  // 로컬 스토리지에서 방명록 불러오기
  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem('guestbookEntries')) || [];
    setGuestbookEntries(savedEntries);
  }, []);

  // 방명록 제출 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || message.trim() === '') {
      alert('이름과 메시지를 입력해 주세요.');
      return;
    }

    const newEntry = { name, message, date: new Date().toLocaleString() };
    const updatedEntries = [...guestbookEntries, newEntry];

    setGuestbookEntries(updatedEntries);
    localStorage.setItem('guestbookEntries', JSON.stringify(updatedEntries));

    // 입력값 초기화
    setName('');
    setMessage('');
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
        <Button type="submit">남기기</Button>
      </Form>

      <h3>남겨진 메시지</h3>
      {currentEntries.length === 0 ? (
        <NoMessage>아직 남겨진 메시지가 없습니다.</NoMessage>
      ) : (
        <MessageList>
          {currentEntries.map((entry, index) => (
            <MessageItem key={index}>
              <strong>{entry.name}</strong>
              <span>({entry.date})</span>: {entry.message}
            </MessageItem>
          ))}
        </MessageList>
      )}

      <Pagination>
        <PageButton onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
          이전
        </PageButton>
        <span>{currentPage}</span>
        <PageButton onClick={() => handlePageChange('next')} disabled={currentPage >= Math.ceil(guestbookEntries.length / entriesPerPage)}>
          다음
        </PageButton>
      </Pagination>
    </GuestbookWrapper>
  );
};

export default Guestbook;
