import React from "react";
import styled from "styled-components";
import { Divider } from "antd";
import {
  GROOM_NAME,
  GROOM_FATHER_NAME,
  GROOM_MOTHER_NAME,
  BRIDE_NAME,
  BRIDE_FATHER_NAME,
  BRIDE_MOTHER_NAME,
} from "../config";
import Flower from "../public/assets/flower1.png";

const Wrapper = styled.div`
  padding-top: 42px;
  margin: 0 auto;
  width: 70%;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

const Content = styled.p`
  font-size: 0.72rem;
  line-height: 1.75;
  opacity: 0.75;
  margin-bottom: 16px;
  width: 100%;
  text-align: center;
`;

const GroomBride = styled.p`
  font-size: 0.875rem;
  line-height: 1.75;
  opacity: 0.85;
  margin-bottom: 0px;
  width: 100%;
  text-align: center;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 1.375rem;
  padding-bottom: 42px;
`;

/**
 * @author taekwon
 * @returns
 */
const Greeting = () => {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 32, marginBottom: 32 }} plain>
        <Title data-aos="fade-up">저희 결혼합니다</Title>
      </Divider>
      <Image data-aos="fade-up" src={Flower} />
      <Content data-aos="fade-up">
        저희 두 사람, 서로의 인연을 결혼으로 맺었습니다.
        <br />
        <br />
        소중한 분들께 저희의 결혼 소식을 전하며,
        <br />
        <br />
        저희의 앞날을 축복해 주시면
        <br />
        <br />
        더없는 기쁨으로 간직하겠습니다.
      </Content>
      <GroomBride data-aos="fade-up">
        {GROOM_FATHER_NAME} · {GROOM_MOTHER_NAME}의 아들 {GROOM_NAME}
        <br />
        {BRIDE_FATHER_NAME} · {BRIDE_MOTHER_NAME}의 딸 {BRIDE_NAME}
      </GroomBride>
    </Wrapper>
  );
};

export default Greeting;
