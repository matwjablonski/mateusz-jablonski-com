import { PropsWithChildren } from "react";
import { useTranslations } from "../../hooks/useTranslations";

export const WorkshopWrapper = ({ children }: PropsWithChildren<{}>) => (
    <div className="flex basis-1/2 grow-0 shrink flex-col items-start mt-0 mx-4 mb-6 sm:mb-0">
        {children}
    </div>
)

export const DaysBadge = ({ days }: { days: number }) => {
    const { t } = useTranslations();

    return (
        <div className="absolute top-4 left-4 bg-main-500 text-main-100 text-lg font-medium px-4 py-3 rounded-sm w-max">
            {days} {days === 1 ? t.COMMON.DAY : t.COMMON.DAYS}
        </div>
    )
}

export const LevelBadge = ({ level }: { level: string }) => {
    return (
        <div className="absolute top-4 right-4 bg-white text-main-500 text-lg font-medium px-4 py-3 rounded-sm w-max">
            {level}
        </div>
    )
}