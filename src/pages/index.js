import React, { useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";
import "antd/dist/antd.css";
import Gallery from "../components/gallery";
import Greeting from "../components/greeting";
import Title from "../components/title";
import "../styles/index.css";

import GroovePaper from "../assets/GroovePaper.png";
import Share from "../components/share";
import Song from "../assets/song.mp3";
// import Location from "../components/location";
// import CongratulatoryMoney from "../components/congratulatoryMoney";
// import Quote from "../components/quote";

import AOS from "aos";
import "aos/dist/aos.css";
import Guestbook from "../components/guestbook";

// markup
// const { Footer } = Layout;

const Wrapper = styled.div`
  background: #efebe9;
  background-image: url(${GroovePaper});
  width: 100%;
`;

const IndexPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    document.body.appendChild(script);

    return () => {
      document.body.romoveChile(script);
    };
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  });
  return (
    <Wrapper>
      <audio autoPlay loop>
        {/* <source src={Song} /> */}
        <track kind="captions" src={Song} srcLang="en" label="English" />
      </audio>
      <Title />
      <Greeting />
      <Gallery />
      {/* <Location /> */}
      {/* <Quote /> */}
      {/* <CongratulatoryMoney /> */}
      <Guestbook />
      <Share />
      {/* <Footer
        style={{
          background: "#D7CCC8",
          backgroundImage: `url(${GroovePaper})`,
          opacity: 0.6,
          textAlign: "center",
        }}
      >
        Copyright © 2022 Shin Jooyoung
      </Footer> */}
    </Wrapper>
  );
};

export default IndexPage;
