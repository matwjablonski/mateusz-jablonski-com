import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { AwardedNote, Description, Name, Subtitle, Tag, TagList, Title, Wrapper } from './ui'
import { options } from './options'
import Link from 'next/link'

export const Certificate = ({ name, description, workshopsTitle, workshopsSlug, dateOfWorkshops, id }) => {
  return (
    <Wrapper>
      <Title>
        Certyfikat
        <Subtitle>
          ukończenia warsztatów <Link href={`/workshops/${workshopsSlug}`} target="_blank">{workshopsTitle}</Link>
        </Subtitle>
      </Title>
      <AwardedNote>zaświadczam, że dnia {dateOfWorkshops}</AwardedNote>
      <Name>{name}</Name>
      <Description>{documentToReactComponents(description, options)}</Description>
      <TagList>
        <Tag><strong>Wystawiający:</strong> Mateusz Jabłoński</Tag>
        <Tag><strong>Data wystawienia:</strong> {dateOfWorkshops}</Tag>
        <Tag><strong>ID certyfikatu:</strong> {id}</Tag>
      </TagList>
    </Wrapper>
  )
}
