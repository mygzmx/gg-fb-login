import React, { FC } from "react";
import styles from '@/components/loading/index.module.scss'

interface IProps {

}

export const CardLoading: FC<IProps> = () => {
  return <div className={styles.loadingCard}>
    <div className={styles.cube1}/>
    <div className={styles.cube2}/>
  </div>
}
