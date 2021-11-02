import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

const locale = { locale: pl };

interface FormatDateArgs {
    formatString: string;
    dateObject: Date | string;
}

type FormatDateType = (args: FormatDateArgs) => string;

export const formatDate: FormatDateType = ({formatString, dateObject}) => {
    const date = dateObject ? new Date(dateObject) : new Date();

    return format(date, formatString, locale);
}

interface FormatDateAndTimeArgs {
    dateFormatString: string;
    timeFormatString: string;
    separator: string;
    dateObject: Date | string;
}

type FormatDateAndTimeType = (args: FormatDateAndTimeArgs) => string;

export const formatDateAndTimeWithSeparator: FormatDateAndTimeType = ({ 
    dateFormatString, timeFormatString, separator, dateObject
}) => {
    const date = dateObject ? new Date(dateObject) : new Date();

    return `${format(date, dateFormatString, locale)} ${separator} ${format(date, timeFormatString, locale)}`;
}
