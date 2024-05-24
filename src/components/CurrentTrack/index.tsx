import Image from 'next/image';
import { FC } from 'react';
import { Artist, Wrapper, InfoBox, Title, ImageWrapper } from './ui';

type CurrentTrack = {
  title: string;
  artist: string;
  image: string;
};

export const CurrentTrack: FC<CurrentTrack> = ({ title, artist, image }) => (
  <Wrapper>
    <ImageWrapper>
      <Image src={image} alt={`${title} - ${artist}`} width={160} height={160} />
    </ImageWrapper>
    <InfoBox>
      <Artist>{artist}</Artist>
      <Title>{title}</Title>
    </InfoBox>
  </Wrapper>
)
