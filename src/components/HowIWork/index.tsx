import { memo } from "react";
import styles from "./HowIWork.module.scss";

const HowIWork = memo(() => {
    const steps = [
        {
            stepNo: '01',
            title: 'Pierwszy kontakt',
            description: 'Umawiamy się na spotkanie. Możesz do mnie zadzwonić lub napisać. Podczas naszej rozmowy wyjaśnię Ci jak wygląda współpraca, odpowiem na Twoje pytania i umówimy się na pierwsze spotkanie.'
        },
        {
            stepNo: '02',
            title: 'Pierwsze spotkanie',
            description: 'Poznajemy się. Porozmawiamy o Twoich celach i motywacjach. Wspólnie stworzymy indywidualny plan rozwoju i nauki oparty o Twoje potrzeby i oczekiwania.'
        },
        {
            stepNo: '03',
            title: 'Mentoring',
            description: 'Spotykamy się, gdy tego potrzebujesz. Na spotkaniach omawiamy tematy, które poznajesz i które mogą być dla Ciebie interesujące. Wspólnie wyciągamy wnioski i podejmujemy decyzję o kolejnych krokach. Podczas spotkań mentoringowych dużą wagę przykładam do wspólnego pisania kodu, rozwiązywania problemów oraz dyskutowania na tematy programistyczne.'
        },
        {
            stepNo: '04',
            title: 'Poza sesjami',
            description: 'Co tydzień otrzymujesz ode mnie materiały do dalszej nauki. Wykonuję Code Review Twojego kodu. Możesz liczyć na moje wsparcie zawsze, gdy napotkasz problem.'
        }
    ];

    return (
        <section className={styles.howIWork}>
            <h2 className={styles.title}>Jak pracuję?</h2>
            <ul className={styles.steps}>
                {steps.map(step => (
                    <li key={`step-${step.stepNo}`} className={styles.step}>
                        <div className={styles.stepNo}>{step.stepNo}</div>
                        <div className={styles.stepContent}>
                            <h3 className={styles.stepTitle}>{step.title}</h3>
                            <p className={styles.stepDesc}>{step.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
});

HowIWork.displayName = 'HowIWork';

export default HowIWork;
