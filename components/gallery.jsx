import React from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

// WebP로 변환된 최적화된 이미지 경로
const GalleryPhoto1 = "/assets/wedding/DSC00087.webp";
const GalleryPhoto2 = "/assets/wedding/DSC00418.webp";
const GalleryPhoto3 = "/assets/wedding/DSC00167.webp";
const GalleryPhoto4 = "/assets/wedding/DSC00616.webp";
const GalleryPhoto5 = "/assets/wedding/DSC00802-.webp";
const GalleryPhoto6 = "/assets/wedding/DSC00632.webp";
const GalleryPhoto7 = "/assets/wedding/DSC00369.webp";
const GalleryPhoto8 = "/assets/wedding/DSC00645.webp";
const GalleryPhoto9 = "/assets/wedding/DSC00861-.webp";
const GalleryPhoto10 = "/assets/wedding/DSC00510.webp";
const GalleryPhoto11 = "/assets/wedding/DSC00453.webp";
const GalleryPhoto12 = "/assets/wedding/DSC00238-.webp";
const GalleryPhoto13 = "/assets/wedding/DSC00848.webp";
const GalleryPhoto14 = "/assets/wedding/DSC00680.webp";
const GalleryPhoto15 = "/assets/wedding/DSC00444.webp";
const GalleryPhoto16 = "/assets/wedding/DSC00568-.webp";
const GalleryPhoto17 = "/assets/wedding/DSC00744.webp";
const GalleryPhoto18 = "/assets/wedding/DSC01038.webp";

const Wrapper = styled.div`
  padding-top: 42px;
  width: 70%;
  margin: 0 auto;
`;

const Title = styled.p`
  font-size: 1rem;
  color: var(--title-color);
  font-weight: bold;
  opacity: 0.85;
  margin-bottom: 0;
  text-align: center;
`;

// 이미지 데이터 생성
const images = Array.from({ length: 18 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    original: eval(`GalleryPhoto${id}`),
  };
});

const Gallery = () => {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        showPlayButton={false} // 재생 버튼 비활성화
        showFullscreenButton={false} // 전체 화면 버튼 비활성화
        lazyLoad // Lazy Loading 활성화
        items={images}
      />
    </Wrapper>
  );
};

export default Gallery;