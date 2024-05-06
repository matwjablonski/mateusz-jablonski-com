import { FC } from 'react';
import { Event } from '../../types/common/Event.types';
import { DateBox, JustIn, Place, Title, Wrapper } from './ui';
import ContentTypeLabel, { ContentTypeEnum } from '../ContentTypeLabel';
import { differenceInDays } from 'date-fns';
import { useTranslations } from '../../hooks/useTranslations';

type LastEvent = { passed: boolean; } & Pick<Event, 'typeOfEvent' | 'title' | 'eventDate' | 'place' | 'rawEventDate'>;

const LastEvent: FC<LastEvent> = ({ typeOfEvent, title, eventDate, place, passed, rawEventDate }) => {
  const daysToEvent = rawEventDate && !passed ? differenceInDays(new Date(rawEventDate) , new Date()) : null;

  const { t, translate } = useTranslations();

  return <Wrapper passed={passed}>
    <div>
      <ContentTypeLabel contentType={typeOfEvent as ContentTypeEnum} reverse={!passed} />
      <Title passed={passed}>{title}</Title>
    </div>
    <div>
      <DateBox passed={passed}>
        {eventDate} {!passed && <JustIn>
        {daysToEvent === 0 ? t.HOME.NEXT_EVENT_TODAY : translate({
          value: t.HOME.NEXT_EVENT_IN,
          variables: [ daysToEvent.toString(), daysToEvent === 1 ? t.COMMON.DAY : t.COMMON.DAYS]
        })}
        </JustIn>}
      </DateBox>
      <Place passed={passed}>{place}</Place>
    </div>
  </Wrapper>
}

export default LastEvent;
