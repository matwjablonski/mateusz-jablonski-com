import { FC } from 'react';
import { Section } from './ui';
import { Event } from '../../types/common/Event.types';
import LastEvent from '../LastEvent';

type LastEvents = {
  events: Event[];
}

const LastEvents: FC<LastEvents> = ({ events }) => {
  return (
    <Section>
      {events.map((event) => (
        <LastEvent key={event.slug} {...event} passed={new Date(event.rawEventDate) < new Date()}/>
      ))}
    </Section>
  )
}

export default LastEvents;
