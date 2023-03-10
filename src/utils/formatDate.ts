import { format } from 'date-fns';
import { pl, enUS } from 'date-fns/locale';

const plLocale = { locale: pl };
const enLocale = { locale: enUS };

interface FormatDateArgs {
    formatString: string;
    dateObject: Date | string;
    locale?: string;
}

type FormatDateType = (args: FormatDateArgs) => string;

export const formatDate: FormatDateType = ({formatString, dateObject, locale = 'pl'}) => {
    const date = dateObject ? new Date(dateObject) : new Date();

    return format(date, formatString, locale === 'pl' ? plLocale : enLocale);
}

interface FormatDateAndTimeArgs {
    dateFormatString: string;
    timeFormatString: string;
    separator: string;
    dateObject: Date | string;
    locale?: string;
}

type FormatDateAndTimeType = (args: FormatDateAndTimeArgs) => string;

export const formatDateAndTimeWithSeparator: FormatDateAndTimeType = ({ 
    dateFormatString, timeFormatString, separator, dateObject, locale = 'pl',
}) => {
    const date = dateObject ? new Date(dateObject) : new Date();
    const properLocale = locale === 'pl' ? plLocale : enLocale;

    return `${format(date, dateFormatString, properLocale)} ${separator} ${format(date, timeFormatString, properLocale)}`;
}
