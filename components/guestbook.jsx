import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_URL = "/api/guestbook"; // Next.js API 엔드포인트

// Styled Components 정의
const GuestbookWrapper = styled.div`
  background-color: #efebe9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
  font-family: "Noto Sans KR", sans-serif;

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
  width: 100%;
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
  box-sizing: border-box;

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
  box-sizing: border-box;

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
  width: 100%;
  box-sizing: border-box;

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

  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .actions button {
    background-color: #8d6e63;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .actions button:hover {
    background-color: #6f4c3e;
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
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [guestbookEntries, setGuestbookEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const entriesPerPage = 3;

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(API_URL);
        setGuestbookEntries(response.data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchEntries();
  }, []);

  const sanitizeInput = (value, maxLength) => {
    const sanitized = value
      .replace(/[<>/'";]/g, "") // SQL 및 XSS 방지용 특수문자 제거
      .slice(0, maxLength); // 최대 길이 제한
    return sanitized;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const sanitizedName = sanitizeInput(name.trim(), 50);
    const sanitizedMessage = sanitizeInput(message.trim(), 300);
    const sanitizedPassword = sanitizeInput(password.trim(), 20);
  
    if (!sanitizedName || !sanitizedMessage || !sanitizedPassword) {
      alert("입력 값을 올바르게 입력해주세요.");
      return;
    }
  
    const newEntry = { name: sanitizedName, message: sanitizedMessage, password: sanitizedPassword };
  
    try {
      if (editingEntry) {
        const editEntry = {
          newName: sanitizedName,
          newMessage: sanitizedMessage,
          newPassword: sanitizedPassword,
        };
  
        if (!editingEntry.id) {
          alert("수정할 항목을 찾을 수 없습니다.");
          return;
        }
  
        await axios.put(`${API_URL}?id=${editingEntry.id}`, editEntry);
        setGuestbookEntries(
          guestbookEntries.map((entry) =>
            entry.id === editingEntry.id ? { ...entry, ...newEntry } : entry
          )
        );
        setEditingEntry(null);
      } else {
        await axios.post(API_URL, newEntry);
        setGuestbookEntries([{ name: sanitizedName, message: sanitizedMessage }, ...guestbookEntries]);
      }
  
      setName("");
      setMessage("");
      setPassword("");
      setIsPopupOpen(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
      console.error("Failed to add/update data", error);
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setName(entry.name);
    setMessage(entry.message);
    setPassword("");
    setIsPopupOpen(true);
  };

  const handleDelete = async (id) => {
    const deletePassword = prompt("삭제하려면 비밀번호를 입력하세요:");
    if (!deletePassword) return;

    try {
      await axios.delete(`${API_URL}?id=${id}`, { data: { deletePassword } });
      setGuestbookEntries(guestbookEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      alert("비밀번호가 틀렸습니다.");
      console.log("handleDelete error : " + error);
    }
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = guestbookEntries.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const handlePageChange = (direction) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(guestbookEntries.length / entriesPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <GuestbookWrapper>
      <Title>방명록</Title>

      {isPopupOpen && (
        <PopupOverlay onClick={handlePopupClose}>
          <Popup onClick={(e) => e.stopPropagation()}>
            <Form onSubmit={handleSubmit}>
              <Label>이름</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(sanitizeInput(e.target.value, 50))}
                placeholder="이름을 입력하세요"
              />
              <Label>메시지</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(sanitizeInput(e.target.value, 300))}
                placeholder="메시지를 입력하세요"
              />
              <Label>비밀번호</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(sanitizeInput(e.target.value, 20))}
                placeholder="비밀번호를 입력하세요"
              />
              <Button type="submit">{editingEntry ? "수정" : "작성"}</Button>
            </Form>
            {/* <CloseButton onClick={() => setIsPopupOpen(false)}>
              닫기
            </CloseButton> */}
          </Popup>
        </PopupOverlay>
      )}

      <MessageList>
        {currentEntries.length > 0 ? (
          currentEntries.map((entry) => (
            <MessageItem key={entry.id || entry.date || entry.message}>
              {/* id가 없을 경우 다른 고유값 사용 */}
              <strong>{entry.name}</strong>
              <span>{entry.date}</span>
              <p>{entry.message}</p>
              <div className="actions">
                <button onClick={() => handleEdit(entry)}>수정</button>
                <button onClick={() => handleDelete(entry.id)}>삭제</button>
              </div>
            </MessageItem>
          ))
        ) : (
          <NoMessage>작성된 방명록이 없습니다.</NoMessage>
        )}
      </MessageList>

      <Button onClick={() => setIsPopupOpen(true)}>작성하기</Button>

      <Pagination>
        <PageButton
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}>
          이전
        </PageButton>
        <PageButton
          onClick={() => handlePageChange("next")}
          disabled={
            currentPage >= Math.ceil(guestbookEntries.length / entriesPerPage)
          }>
          다음
        </PageButton>
      </Pagination>
    </GuestbookWrapper>
  );
};

export default Guestbook;
