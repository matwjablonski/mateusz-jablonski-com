import Image from "next/image";
import { ReactNode } from "react";
import Columns from "../Columns";
import styles from './MyNewsletter.module.scss';
import MyNewsImage from '../../public/mynews.png';

interface MyNewsletterProps {
  title: string;
  children: ReactNode;
}

const MyNewsletter = ({ title, children }: MyNewsletterProps ) => (
  <section className={styles.MyNewsletter}>
    <Columns flexSizes={[2, 3]}>
      <div className={styles.image}>
        <Image src={MyNewsImage} alt="" className={styles.img}/>
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.content}>{children}</div>
      </div>
    </Columns>
  </section>
)

export default MyNewsletter;
