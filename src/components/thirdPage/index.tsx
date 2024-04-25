import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "@/components/thirdPage/index.module.scss";

interface IProps {
  successIcon: React.ReactNode
}

const ThirdPage: FC<IProps> = ({ successIcon }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.thirdMain}>
      {successIcon}
      <div className={styles.mainLabel}>{t('accountDeletionIs')}</div>
    </div>
  );
}

export default ThirdPage;
