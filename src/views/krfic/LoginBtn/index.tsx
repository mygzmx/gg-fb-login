import React, { FC } from "react";
import GGLogo from "@/common/images/gg-logo.png";
import { useTranslation } from "react-i18next";
import FbLogo from "@/common/images/fb-logo.png";
import { facebookBtn } from "@/utils/loginInit";
import { ILoginData } from "@/typings/index.interfaces";
import styles from "@/views/krfic/LoginBtn/index.module.scss";
import { Toast } from "antd-mobile";

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
      <img className={styles.fbWhiteIcon} src={FbLogo} alt=""/>
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
