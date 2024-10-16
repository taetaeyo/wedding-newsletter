import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Divider, message } from "antd";
import { MessageFilled, LinkOutlined } from "@ant-design/icons";
import styled from "styled-components";

import {
  KAKAOTALK_API_TOKEN,
  KAKAOTALK_SHARE_IMAGE,
  WEDDING_INVITATION_URL,
  GROOM_NAME,
  BRIDE_NAME,
} from "../../config";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 100%;
  text-align: center;
`;

const Title = styled.span`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
`;

const KakaoTalkShareButton = styled(Button)`
  background: #fee500;
  border-color: #fee500;
  color: #181600;
  width: 100%;
  &:hover {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
  &:focus {
    background-color: #fcf07e !important;
    border-color: #fcf07e !important;
    color: #17160b !important;
  }
`;

const LinkShareButton = styled(Button)`
  background-color: rgba(217, 125, 131, 0.2);
  border-color: rgba(217, 125, 131, 0.2) !important;
  color: var(--title-color) !important;
  font-weight: 400 !important;
  align-items: center;
  width: 100%;
  &:hover {
    background-color: rgb(217 125 131 / 48%) !important;
    border-color: rgb(217 125 131 / 48%) !important;
    color: var(--title-color) !important;
  }
`;

/**
 * Share component for sharing wedding invitation
 * @author taekwon
 * @returns {JSX.Element}
 */
const Share = () => {
  const createKakaoButton = () => {
    if (!window.Kakao) {
      message.error("Kakao SDK가 로드되지 않았습니다.");
      return;
    }

    const kakao = window.Kakao;

    if (!kakao.isInitialized()) {
      kakao.init(KAKAOTALK_API_TOKEN);
    }

    kakao.Link.createDefaultButton({
      objectType: "feed",
      container: "#sendKakao",
      content: {
        title: `${GROOM_NAME}❤${BRIDE_NAME} 결혼 소식`,
        description: "아래의 '소식장 열기' 버튼을 눌러 읽어주세요🤵👰",
        imageUrl: KAKAOTALK_SHARE_IMAGE,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "청첩장 열기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
      installTalk: true,
    });

    setTimeout(() => {
      const sendKakaoButton = document.getElementById("sendKakao");
      if (sendKakaoButton) {
        sendKakaoButton.click();
        message.success("카카오톡으로 소식장을 공유합니다!");
      }
    }, 100);
  };

  return (
    <Wrapper>
      <Divider
        data-aos="fade-up"
        plain
        style={{ marginTop: 0, marginBottom: 32 }}
      >
        <Title>결혼 소식장 공유하기</Title>
      </Divider>
      <KakaoTalkShareButton
        style={{ margin: 0 }}
        icon={<MessageFilled />}
        id="sendKakao"
        size="large"
        onClick={createKakaoButton}
      >
        카카오톡으로 공유하기
      </KakaoTalkShareButton>
      <CopyToClipboard text={WEDDING_INVITATION_URL}>
        <LinkShareButton
          style={{ margin: 0 }}
          icon={<LinkOutlined />}
          size="large"
          onClick={() => message.success("링크가 복사되었습니다.")}
        >
          링크 복사하기
        </LinkShareButton>
      </CopyToClipboard>
    </Wrapper>
  );
};

export default Share;