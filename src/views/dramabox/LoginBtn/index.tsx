import React, { FC } from "react";
import FbWhite from "@/common/images/fb-white.png";
import GGLogo from "@/common/images/gg-logo.png";
import { useTranslation } from "react-i18next";
import { facebookBtn } from "@/utils/loginInit";
import { ILoginData } from "@/typings/index.interfaces";
import { Toast } from "antd-mobile";
import styles from "@/views/dramabox/LoginBtn/index.module.scss";

interface IProps {
  onLogin: (data: ILoginData) => void;
}

const LoginBtn: FC<IProps> = ({ onLogin }) => {
  const { t } = useTranslation();

  return <>
    <button
      className={styles.fbLoginBtn}
      onClick={() => facebookBtn((data) => onLogin(data), () => {
        Toast.show(t("loginFailedTry"));
      })}
    >
      <img className={styles.fbWhiteIcon} src={FbWhite} alt=""/>
      <span>{t('fbLogin')}</span>
    </button>

    <button className={styles.ggLoginBtn} onClick={() => Toast.show(t("loginFailedTry"))}>
      <img className={styles.ggWhiteIcon} src={GGLogo} alt=""/>
      <span>{t('ggLogin')}</span>
      <div className={styles.ggIframe} id="google_btn"/>
    </button>
  </>
}

export default LoginBtn;
