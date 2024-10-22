import React from "react";
import ImageGallery from "react-image-gallery";
import { Divider } from "antd";
import styled from "styled-components";
import "react-image-gallery/styles/css/image-gallery.css";

const GalleryPhoto1 = "/assets/wedding/GalleryPhoto1.jpg";
const GalleryPhoto2 = "/assets/wedding/GalleryPhoto2.jpg";
const GalleryPhoto3 = "/assets/wedding/GalleryPhoto3.jpg";
const GalleryPhoto4 = "/assets/wedding/GalleryPhoto4.jpg";
const GalleryPhoto5 = "/assets/wedding/GalleryPhoto5.jpg";
const GalleryPhoto6 = "/assets/wedding/GalleryPhoto6.jpg";

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

const images = [
  {
    id: 1,
    original: GalleryPhoto1,
    thumbnail: GalleryPhoto1,
  },
  {
    id: 2,
    original: GalleryPhoto2,
    thumbnail: GalleryPhoto2,
  },
  {
    id: 3,
    original: GalleryPhoto3,
    thumbnail: GalleryPhoto3,
  },
  {
    id: 4,
    original: GalleryPhoto4,
    thumbnail: GalleryPhoto4,
  },
  {
    id: 5,
    original: GalleryPhoto5,
    thumbnail: GalleryPhoto5,
  },
  {
    id: 6,
    original: GalleryPhoto6,
    thumbnail: GalleryPhoto6,
  },
];

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
