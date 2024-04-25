import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FirstPage from "@/components/firstPage";
import logoImg from "@/common/logos/webfic.png";
import loginImg from "@/views/webfic/images/webfic-login.png";
import PageTitle from "@/components/pageTitle";
import { LoginPage } from "@/components/login";
import { Dialog, Toast } from "antd-mobile";
import { EUserStatus, ILoginData, INetLogoutReq, IUserInfo } from "@/typings/index.interfaces";
import { ReactComponent as IconSuccess } from "@/common/images/success.svg";
import ThirdPage from "@/components/thirdPage";
import { ReactComponent as IconChecked } from "@/common/images/checked.svg";
import classNames from "classnames";
import LoginBtn from "@/views/webfic/LoginBtn";
import { loginInit } from "@/utils/loginInit";
import jwtDecode from "jwt-decode";
import AvatarDefaultIcon from "@/common/images/avatar.png";
import { netLogin, netLogout } from "@/utils/server";
import { decryptAES, encryptAES } from "@/utils/crypto";
import useHiveLog from "@/hooks/useHiveLog";
import styles from '@/views/webfic/index.module.scss';

const clientId = "405897231295-eh4tcgo5pgib9uh41clo15o860ema7d4.apps.googleusercontent.com";
const appId = "1133017727074766";
const appName = "Webfic"

const LogoutPage = () => {
  const { t } = useTranslation();
  const [stepCount, setStepCount] = useState(1); // 第几步骤
  const HiveLog = useHiveLog(appName);
  const [userInfo, setUserInfo] = useState<IUserInfo>({ userId: '', avatar: '', userName: '' });
  const [isAccept, setIsAccept] = useState(false); // 是否接受协议
  const [userTemp, setUserTemp] = useState<INetLogoutReq>({
    uid: "",
    loginType: "google",
    bindId: '',
    plineEnum: 'WEBFIC',
    deviceInfo: '',
    thirdInfo: '',
  });

  useEffect(() => {
    document.title = appName;
    loginInit({ clientId, appId, onGGSuccess })
  }, []);

  useEffect(() => {
    if (stepCount === 1) {
      if (!userInfo.userId) {
        // 未登录页面曝光
        HiveLog.track("deleteLogoutPv")
      } else {
        // 登录页面曝光
        HiveLog.track("deleteLoginPv", {
          user_id: userInfo.userId,
        });
      }
    }
  }, [stepCount]);

  // gg 回调函数
  const onGGSuccess = (res: any) => {
    if (res && res.credential) {
      try {
        const data = (jwtDecode(res.credential) || {}) as { sub: string; email: string; name: string; picture: string; };
        onLogin({
          loginType: 'google',
          bindId: data?.sub || "",
          email: data?.email || "",
          userName: data.name || "",
          avatar: data.picture || "",
        });
      } catch (e) {
        Toast.show(t("loginFailed"));
      }
    }
  }

  // 删除账户按钮
  const onNext = () => {
    if (userInfo.userId) {
      // 登录页面按钮点击
      HiveLog.track("deleteLoginClick", {
        user_id: userInfo.userId,
      });
      // 挽留弹窗曝光
      HiveLog.track("deletePopupPv", {
        user_id: userInfo.userId,
      });
      Dialog.confirm({
        // title: '提示',
        bodyClassName: styles.dialogBody,
        maskStyle: { background: 'rgba(0,0,0,0.7)' },
        content: t('afterDeleting'),
        cancelText: t('cancel'),
        confirmText: t('confirm'),
        onConfirm: () => {
          // 挽留弹窗点击
          HiveLog.track("deletePopupClick", {
            user_id: userInfo.userId,
            button_name: '确认'
          });
          deleteAccount();
        },
        onCancel: () => {
          // 挽留弹窗点击
          HiveLog.track("deletePopupClick", {
            user_id: userInfo.userId,
            button_name: '取消'
          });
        }
      });
    } else {
      // 未登录页面按钮点击
      HiveLog.track("deleteLogoutClick");
      setStepCount(2);
    }
  }

  // 切换账户
  const onSwitch = () => {
    setStepCount(2);
  }

  // 删除账号 -- 注销失败：停留在注销规则界面，提示 toast “注销失败 ” （无须返回具体原因)
  const deleteAccount = async () => {
    netLogout(userTemp, appName).then(res => {
      // 删除成功
      HiveLog.track("outDeleteSuccess", {
        user_id: userInfo.userId,
      });
      setStepCount(3);
    }).catch(() => {
      Toast.show(t("failedToDelete"));
      // 删除失败
      HiveLog.track("outDeleteFailed", {
        user_id: userInfo.userId,
      });
    })
  }

  // 登陆
  const onLogin = (data: ILoginData) => {
    const { loginType, bindId, avatar, email, userName } = data;
    if (bindId) {
      netLogin({ loginType, bindId, email }, appName).then(res => {
        if (res.haveUser && res.userStatus === EUserStatus.Normal) {
          setUserTemp(prevState => ({
            ...prevState,
            uid: res.uid,
            loginType,
            bindId: encryptAES(bindId),
            deviceInfo: res.deviceInfo || "",
            thirdInfo: res.thirdInfo || "",
          }))
          setUserInfo({
            userId: decryptAES(res.uid),
            avatar,
            userName
          })
          // 获取用户信息成功；
          setStepCount(1);
        } else {
          // 账号未绑定过app的用户ID，请切换账号重试
          Dialog.alert({
            bodyClassName: classNames(styles.dialogBody, styles.dialogAlert),
            maskStyle: { background: 'rgba(0,0,0,0.7)' },
            content: t('theAccount1') + appName + t('theAccount2'),
            confirmText: t('iKnow'),
          });
        }
      }).catch(() => {
        // 登陆失败异常
        Toast.show(t("loginFailed"));
      });
    } else {
      // 登陆失败异常
      Toast.show(t("loginFailed"));
    }
  }
  // 返回按钮
  const goBack = () => {
    setStepCount(1);
  }

  return (
    <div className={styles.logoutWrap}>
      {(stepCount === 1 || stepCount === 3) ?
        <PageTitle title={t('accountDeletion')} logoImg={logoImg} appName={appName}/> : null}
      {/*<LoginPage goBack={goBack} logoImg={logoImg} />*/}
      {stepCount === 1 ?
        <FirstPage
          isAccept={isAccept}
          onSetIsAccept={(isAccept) => setIsAccept(isAccept)}
          userInfo={userInfo}
          avatarDefault={AvatarDefaultIcon}
          onNext={onNext}
          onSwitch={onSwitch}
          checkedIcon={<IconChecked className={styles.acceptIcon}/>}
          footerBtnClass={classNames(styles.btnBox, !isAccept && styles.btnBoxDisabled)}
        /> : null}
      <LoginPage
        visible={stepCount === 2}
        loginImg={loginImg}
        appName={''}
        goBack={goBack}
        loginBtn={<LoginBtn onLogin={onLogin}/>}
      />
      {stepCount === 3 ? <ThirdPage successIcon={<IconSuccess className={styles.successIcon}/>}/> : null}
    </div>
  );
}

export default LogoutPage;
