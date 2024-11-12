import React from "react";
import styled from "styled-components";
import { WEDDING_DATE, GROOM_NAME, BRIDE_NAME } from "../config.js";

const MainImage = "/assets/wedding/yellowFlower.jpg";

const Layout = styled.div`
  width: 70%;
  overflow: hidden;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 42px;
  font-weight: 500 !important;
  color: var(--title-color);
  animation: fadein 3s;
  -moz-animation: fadein 3s; /* Firefox */
  -webkit-animation: fadein 3s; /* Safari and Chrome */
  -o-animation: fadein 3s; /* Opera */
`;

const TitleImage = styled.div`
  background-image: url(${MainImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center top;
  width: 100%;
  height: 70vh;
  transform: scale(${(props) => props.scale});
  transition: transform 0.3s ease;
`;

const WeddingInvitation = styled.p`
  font-size: 0.825rem;
  opacity: 0.45;
  margin-bottom: 16px;
`;

const GroomBride = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  opacity: 0.9;
  margin-bottom: 16px;
`;

const Schedule = styled.p`
  font-size: 1.06rem;
  opacity: 0.65;
  margin-bottom: 24px;
`;

const Title = () => {
  return (
    <Layout>
      <TitleWrapper>
        <WeddingInvitation>WEDDING LETTER</WeddingInvitation>
        <GroomBride>
          {/* {GROOM_NAME} &#38; {BRIDE_NAME} */}
          {GROOM_NAME} ♥ {BRIDE_NAME}
        </GroomBride>
        <Schedule>{WEDDING_DATE}</Schedule>
      </TitleWrapper>
      <TitleImage image={MainImage} />
    </Layout>
  );
};

export default Title;
