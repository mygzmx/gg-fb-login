import React, { FC } from "react";
import styles from "@/components/pageTitle/index.module.scss";

interface IProps {
  title: string;
  logoImg: string;
  appName: string;
}

const PageTitle: FC<IProps> = ({ title, logoImg, appName }) => {

  return <header className={styles.titleBox}>
    <div className={styles.titleTxt}>{title}</div>
    <div className={styles.logoBox}>
      <img className={styles.logo} src={logoImg} alt=""/>
      <span>{appName}</span>
    </div>
  </header>
}

export default PageTitle;
