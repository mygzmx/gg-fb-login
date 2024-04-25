import React, { FC } from "react";
import FbFtIcon from "@/common/images/fb-ft.png";
import { useTranslation } from "react-i18next";
import GGFtIcon from "@/common/images/gg-ft.png";
import { facebookBtn } from "@/utils/loginInit";
import { ILoginData } from "@/typings/index.interfaces";
import { Toast } from "antd-mobile";
import styles from "@/views/xsydb/LoginBtn/index.module.scss";

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
      <img className={styles.fbWhiteIcon} src={FbFtIcon} alt=""/>
      <span>{t('fbLogin')}</span>
    </button>

    <button className={styles.ggLoginBtn} onClick={() => Toast.show(t("loginFailedTry"))}>
      <img className={styles.ggWhiteIcon} src={GGFtIcon} alt=""/>
      <span>{t('ggLogin')}</span>
      <div className={styles.ggIframe} id="google_btn"/>
    </button>
  </>
}

export default LoginBtn;
