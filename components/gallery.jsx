import React from "react";
import Image from "next/image";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

// WebP로 변환된 최적화된 이미지 경로
const photos = [
  "/assets/wedding/DSC00087.webp",
  "/assets/wedding/DSC00418.webp",
  "/assets/wedding/DSC00167.webp",
  "/assets/wedding/DSC00616.webp",
  "/assets/wedding/DSC00802-.webp",
  "/assets/wedding/DSC00632.webp",
  "/assets/wedding/DSC00369.webp",
  "/assets/wedding/DSC00645.webp",
  "/assets/wedding/DSC00861-.webp",
  "/assets/wedding/DSC00510.webp",
  "/assets/wedding/DSC00453.webp",
  "/assets/wedding/DSC00238-.webp",
  "/assets/wedding/DSC00848.webp",
  "/assets/wedding/DSC00680.webp",
  "/assets/wedding/DSC00444.webp",
  "/assets/wedding/DSC00568-.webp",
  "/assets/wedding/DSC00744.webp",
  "/assets/wedding/DSC01038.webp",
];

// 스타일링
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

const renderImageItem = (item, index) => (
  <div style={{ position: "relative", width: "100%", height: "500px" }}>
    <Image
      src={item.original}
      alt={`Gallery Photo ${index + 1}`}
      fill
      style={{ objectFit: "cover" }}
      placeholder="blur"
      blurDataURL={item.original}
      priority={index === 0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      quality={80}
    />
  </div>
);

const Gallery = () => {
  const images = photos.map((photo, index) => ({
    original: photo,
    thumbnail: photo,
  }));

  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        items={images}
        showPlayButton={false}
        showFullscreenButton={false}
        lazyLoad
        renderItem={renderImageItem}
      />
    </Wrapper>
  );
};

export default Gallery;
