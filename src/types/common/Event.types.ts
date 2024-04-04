export type Event = {
  title: string;
  eventDate: Date;
  slug: string;
  typeOfEvent: 'lecture' | 'workshops' | 'conference' | 'webinar';
  place: string;
  rawEventDate: Date;
};

