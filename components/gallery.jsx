import React from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

const GalleryPhoto1 = "/assets/wedding/DSC00087.jpg";
const GalleryPhoto2 = "/assets/wedding/DSC00418.jpg";
const GalleryPhoto3 = "/assets/wedding/DSC00167.jpg";
const GalleryPhoto4 = "/assets/wedding/DSC00616.jpg";
const GalleryPhoto5 = "/assets/wedding/DSC00802-.jpg";
const GalleryPhoto6 = "/assets/wedding/DSC00632.jpg";
const GalleryPhoto7 = "/assets/wedding/DSC00369.jpg";
const GalleryPhoto8 = "/assets/wedding/DSC00645.jpg";
const GalleryPhoto9 = "/assets/wedding/DSC00861-.jpg";
const GalleryPhoto10 = "/assets/wedding/DSC00510.jpg";
const GalleryPhoto11 = "/assets/wedding/DSC00453.jpg";
const GalleryPhoto12 = "/assets/wedding/DSC00238-.jpg";
const GalleryPhoto13 = "/assets/wedding/DSC00848.jpg";
const GalleryPhoto14 = "/assets/wedding/DSC00680.jpg";
const GalleryPhoto15 = "/assets/wedding/DSC00444.jpg";
const GalleryPhoto16 = "/assets/wedding/DSC00568-.jpg";
const GalleryPhoto17 = "/assets/wedding/DSC00744.jpg";
const GalleryPhoto18 = "/assets/wedding/DSC01038.jpg";

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

const images = Array.from({ length: 18 }, (_, index) => {
  const id = index + 1;
  return {
    id,
    original: eval(`GalleryPhoto${id}`),
    thumbnail: eval(`GalleryPhoto${id}`),
  };
});

const Gallery = () => {
  return (
    <Wrapper>
      <Divider style={{ marginTop: 0, marginBottom: 32 }} plain>
        <Title>우리의 아름다운 순간</Title>
      </Divider>
      <ImageGallery
        showPlayButton={false}
        showFullscreenButton={false}
        items={images}
      />
    </Wrapper>
  );
};

export default Gallery;
