import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useTranslations } from '../../hooks/useTranslations'
import TwitterIcon from '../../public/icons/twitter-bold.svg';
import FacebookIcon from '../../public/icons/facebook-bold-color.svg';
import LiIcon from '../../public/icons/li-bold-color.svg';
import MailIcon from '../../public/icons/mail.svg';
import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';


const AuthorMediumBox = ({ name, description, linkedIn, email, facebook, twitter }) => {
  const { t, translate } = useTranslations();

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <p className="font-body text-main-700 text-sm">{children}</p>,
    },
  };

  return <div
    className="mb-6 last:border-b last:border-main-100 last:pb-6"
  >
    <h4 className="
      mb-2
      text-main 
      font-medium
      font-heading
    ">{translate({
      value: t.PODCAST.COMMON.AUTHOR,
      variables: [ name ]
    })}</h4>
    <div className="mb-2">{documentToReactComponents(description, options)}</div>
    <div className="flex gap-6">
      {email && <a target="_blank" rel="noopener noreferrer nofollow" href={`mailto:${email}`}>
        <Image src={MailIcon} width={24} height={24} alt="" />
      </a>}
      {linkedIn && <a target="_blank" rel="noopener noreferrer nofollow" href={linkedIn}>
        <Image src={LiIcon} width={24} height={24} alt="" />
      </a>}
      {facebook && <a target="_blank" rel="noopener noreferrer nofollow" href={facebook}>
        <Image src={FacebookIcon} width={16} height={26} alt="" />
      </a>}
      {twitter && <a target="_blank" rel="noopener noreferrer nofollow" href={twitter}>
        <Image src={TwitterIcon} width={24} height={19} alt="" />
      </a>}
    </div>
  </div>
}

export default AuthorMediumBox;
