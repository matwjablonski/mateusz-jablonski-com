import { FC } from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import ReadIcon from '../../public/icons/book-off.svg';
import ListenIcon from '../../public/icons/music-off.svg';
import Image from 'next/image';

type NoActivity = {
  activityName: 'read' | 'listen';
}

const icons = {
  read: ReadIcon,
  listen: ListenIcon,
}

export const NoActivity: FC<NoActivity> = ({ activityName }) => {
  const { t } = useTranslations();
  const getActivityLabel = () => t.ABOUT.CURRENT[activityName.toUpperCase()].NO_ACTIVITY;

  return (
    <div className="flex justify-center items-center p-15 flex-col">
      <h4 className="mb-6 text-main-700 text-md font-heading">{getActivityLabel()}</h4>
      <Image src={icons[activityName]} alt="" width={100} />
    </div>
  )
}
