import Columns from '../Columns';
import styles from './MyStory.module.scss';
import Lo from '../../public/images/about/lo.jpg';
import Company from '../../public/images/about/pierwsza-firma.jpg';
import Sonalake from '../../public/images/about/sonalake.jpg';
import Image from 'next/image';

const MyStory = () => (
    <section className={styles.myStory}>
        <div className={styles.row}>
            <Columns>
                <div className={styles.episode}>
                    <h2>Jak to się zaczęło?</h2>
                    <p>Programowaniem zacząłem się interesować już dawno temu. Mając zaledwie 12 lat wraz z dwójką moich przyjaciół snuliśmy marzenia o wielkich projektach IT, braliśmy udział w różnych konkursach informatycznych i świetnie się przy tym bawiliśmy.</p>
                    <blockquote className={styles.blockquote}>
                        <p>Nigdy nie przypuszczałem, że programowanie stanie się moją pasją i zawodem.</p>
                    </blockquote>
                </div>
                <div>
                    <figure className={styles.image}>
                        <Image src={Lo} alt="To ja wraz ze znajomymi przed II LO. Rok 2008."/>
                        <figcaption>To ja wraz ze znajomymi przed II LO. Rok 2008.</figcaption>
                    </figure>
                </div>
            </Columns>
        </div>
        <div className={styles.row}>
            <Columns>
                <div>
                    <figure className={styles.image}>
                        <Image src={Company} alt="Pierwsze kroki z Wordpress i Magento. Rok 2011."/>
                        <figcaption>Pierwsze kroki z Wordpress i Magento. Rok 2011.</figcaption>
                    </figure>
                </div>
                <div className={styles.episode}>
                    <p>W 2011 roku życie pokierowało moją karierę w kierunku tworzenia stron internetowych.</p>
                    <p>Od samego początku czułem, że się w tym odnajduję, że sprawia mi to dużo radości, a osiągane efekty popychają mnie dalej - coś kazało mi zagłębiać się w ten temat i wyciągać z niego coraz więcej dla siebie.</p>
                    <p>Niewątpliwie dużą rolę w moim życiu odegrali moi pierwsi mentorzy i współpracownicy.</p>
                </div>
            </Columns>
        </div>
        <div className={styles.lastRow}>
            <Columns>
                <div className={styles.episode}>
                    <p>Kilka lat później postanowiłem spróbować swoich sił w edukacji. Na ścieżkę mentorską wstąpiłem pod koniec 2016 roku.</p>
                    <p>Od tamtego czasu nieustannie staram się rozwijać nie tylko swoje umiejętności techniczne, ale również miękkie - przemawianie, pisanie, rozmawianie.</p>
                    <p>Zrozumiałem jak ważną rolę pełni mentor - trener podczas każdej sesji mentorskiej, warsztatów czy szkoleń. Można być świetnym programistą i nie mieć zacięcia do uczenia innych.</p>
                </div>
                <div>
                    <figure className={styles.image}>
                        <Image src={Sonalake} alt="Szkolenie wewnętrzne w Sonalake. Rok 2020."/>
                        <figcaption>Szkolenie wewnętrzne w Sonalake. Rok 2020.</figcaption>
                    </figure>
                </div>
            </Columns>
        </div>
    </section>
)

export default MyStory;
