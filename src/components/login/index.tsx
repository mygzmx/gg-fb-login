import React, { FC } from "react";
import backIcon from "@/common/images/ic_back.png";
import styles from "@/components/login/index.module.scss";

interface IProps {
  visible: boolean;
  goBack: () => void;
  loginImg: string;
  appName: string;
  loginBtn: React.ReactNode;
}

export const LoginPage:FC<IProps> = ({ visible, goBack, loginImg, appName, loginBtn }) => {
  return <div className={styles.loginBox} style={visible ? {} : { width: "0", height: "0", overflow: 'hidden' }}>
    <div className={styles.titleBox}>
      <div className={styles.backIcon} onClick={() => goBack()}>
        <img src={backIcon} alt="<"/>
      </div>
    </div>
    <div className={styles.content}>
      <img className={styles.logo} src={loginImg} alt="<"/>
      <h1>{appName}</h1>
      <div className={styles.loginBtn}>
        { loginBtn }
      </div>
    </div>
  </div>
}
