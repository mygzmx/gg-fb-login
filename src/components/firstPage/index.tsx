import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import delImage1 from '@/common/images/del_image1.png';
import delImage2 from '@/common/images/del_image2.png';
import delImage3 from '@/common/images/del_image3.png';
import delImage4 from '@/common/images/del_image4.png';
import delImage6 from '@/common/images/del_image6.png';
import delImage8 from '@/common/images/del_image8.png';
import uncheckedIcon from '@/common/images/unchecked.png';
import { Toast } from "antd-mobile";
import { IUserInfo } from "@/typings/index.interfaces";
import SwitchIcon from "@/common/images/switch-more.png";
import styles from "@/components/firstPage/index.module.scss";

interface IProps {
  onNext: () => void;
  onSwitch: () => void;
  userInfo: IUserInfo;
  checkedIcon: React.ReactNode;
  footerBtnClass: string;
  isAccept: boolean;
  onSetIsAccept: (isAccept: boolean) => void;
  avatarDefault: string;
}

enum EAgreeId {
  personalData = 1,
  thirdParty = 2,
  consumptionHistory = 3,
  accountBalance = 4,
  pleaseLog = 6,
  ifYouHave = 7,
  howToCancel = 8,
}

const FirstPage: FC<IProps> = (
  { avatarDefault, isAccept, userInfo, onNext, onSwitch, onSetIsAccept, checkedIcon, footerBtnClass }
) => {
  const { t } = useTranslation();

  const agreeData = [
    { id: EAgreeId.personalData, title: t('personalData'), text: t('personalDataIntro'), img: delImage1 },
    { id: EAgreeId.thirdParty, title: t('thirdParty'), text: '', img: delImage2 },
    { id: EAgreeId.consumptionHistory, title: t('consumptionHistory'), text: '', img: delImage3 },
    {
      id: EAgreeId.accountBalance,
      title: t('accountBalance'),
      text: t('allYourCoins'),
      img: delImage4
    },
    { id: EAgreeId.ifYouHave, title: t('ifYouHave'), text: '', img: delImage6 },
    { id: EAgreeId.pleaseLog, title: t('pleaseLog'), text: '', img: delImage6 },
    { id: EAgreeId.howToCancel, title: t('howToCancel'), text: t('youCanGo'), img: delImage8 },
  ]

  // next按钮
  const nextStep = async () => {
    if (!isAccept) {
      Toast.show(t('toastYouNeed')); // 请同意协议
      return;
    }
    onNext();
  }

  const onImgError = (e: any) => {
    e.target.style.visibility = 'hidden';
    e.target.src = avatarDefault;
    e.target.srcset = avatarDefault;
    e.target.onload = function (){
      e.target.style.visibility = 'visible';
    }
  }

  return (
    <>
      <div className={styles.firstContent}>

        {userInfo.userId ? <>
          <div className={styles.userTitle}>{t('accountInformation')}</div>
          <div className={styles.userCard}>
            <img
              className={styles.userAvatar}
              src={(userInfo.avatar || avatarDefault)}
              onError={onImgError}
              alt=">"/>
            <div className={styles.userRight}>
              <div className={styles.userIntro}>
                <div className={styles.userName}>
                  {userInfo.userName}
                </div>
                <div className={styles.userId}>
                  ID {userInfo.userId || ''}
                </div>
              </div>

              <div className={styles.switchBtn} onClick={() => onSwitch()}>
                <span>{t('switchAccount')}</span>
                <img className={styles.switchIcon} src={SwitchIcon} alt=">"/>
              </div>
            </div>
          </div>
        </> : null}

        <div className={styles.mainIntro}>{t('firstMainSub')}</div>
        <div className={styles.mainLabel}>{t('firstMainLabel')}</div>
        <div className={styles.mainList}>
          {agreeData.map(item => {
            return <div key={item.id} className={styles.listItem}>
              <img src={item.img} alt="" className={styles.listItemIcon}/>
              <div className={styles.itemBox}>
                <h4>{item.title}</h4>
                <p className={styles.itemTxt}>{item.text}</p>
              </div>
            </div>
          })}
        </div>
      </div>
      <div className={styles.firstFooter}>
        <div className={styles.footerHeader} onClick={() => onSetIsAccept(!isAccept)}>
          {isAccept ? checkedIcon : <img src={uncheckedIcon} alt=""/>}
          <p>{t('iAccept')}</p>
        </div>
        <div className={footerBtnClass} onClick={() => nextStep()}>
          <button>{t('deleteAccount')}</button>
        </div>
      </div>
    </>
  );
}

export default FirstPage;
