import { Title, Wrapper, Chapter, Topics, Topic } from './ui';
import { useTranslations } from '../../hooks/useTranslations';
import { useMemo } from 'react';

interface TrainingProgramProps {
  content: string;
}

const TrainingProgram = ({ content }: TrainingProgramProps) => {
  const { t } = useTranslations();

  const renderContent = useMemo(() => {
    const elements: React.ReactNode[] = [];
    let key = 0;

    const normalizedContent = content.replace(/\n/g, '');
    const regex = /<(h3|ol|ul)>(.*?)<\/\1>|<(p|br)>(.*?)<\/\3>|<br\s*\/?>/g;
    let match;

    while ((match = regex.exec(normalizedContent)) !== null) {
      const tag = match[1] || match[3];
      const innerContent = match[2] || match[4] || '';

      if (tag === 'h3') {
        const text = innerContent.replace(/<\/?[^>]+(>|$)/g, '');
        elements.push(<Chapter key={key++}>{text}</Chapter>);
      } else if (tag === 'ol' || tag === 'ul') {
        const listItems: React.ReactNode[] = [];
        const liRegex = /<li>(.*?)<\/li>/g;
        let liMatch;
        let liKey = 0;

        while ((liMatch = liRegex.exec(innerContent)) !== null) {
          const liContent = liMatch[1];
          
          const parseInline = (text: string): React.ReactNode[] => {
            const parts: React.ReactNode[] = [];
            const inlineRegex = /<(strong|em)>(.*?)<\/\1>|([^<]+)/g;
            let inlineMatch;
            let inlineKey = 0;

            while ((inlineMatch = inlineRegex.exec(text)) !== null) {
              if (inlineMatch[1] === 'strong') {
                parts.push(<strong key={inlineKey++}>{inlineMatch[2]}</strong>);
              } else if (inlineMatch[1] === 'em') {
                parts.push(<em key={inlineKey++}>{inlineMatch[2]}</em>);
              } else if (inlineMatch[3]) {
                parts.push(inlineMatch[3]);
              }
            }

            return parts.length > 0 ? parts : [text];
          };

          listItems.push(
            <Topic key={liKey++}>
              {parseInline(liContent)}
            </Topic>
          );
        }

        if (listItems.length > 0) {
          elements.push(<Topics key={key++}>{listItems}</Topics>);
        }
      }
    }

    return elements;
  }, [content]);

  return (
    <Wrapper>
      <Title>{t.WORKSHOPS.PROGRAM.TITLE}</Title>
      {renderContent}
    </Wrapper>
  )
}

export default TrainingProgram;
