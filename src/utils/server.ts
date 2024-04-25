import { postFetch } from "@/utils/fetch";
import { INetLoginReq, INetLoginRes, INetLogoutReq } from "@/typings/index.interfaces";
import { decryptAES } from "@/utils/crypto";
import { addSign } from "@/utils/rsa";
import { AppName, getLogParams, getServerApi } from "@/utils/getLogParams";

// 登陆获取用户信息
type NetLogin = (data: INetLoginReq, appName: AppName) => Promise<INetLoginRes>;

export const netLogin: NetLogin = (data, appName) => {
  const { pname } = getLogParams(appName);
  const sign = addSign(data.loginType + data.bindId + data.email);
  const { loginApi, header } = getServerApi(appName, sign, pname);
  return postFetch(loginApi, { data, header });
}

// 注销用户
type NetLogout = (data: INetLogoutReq, appName: AppName) => Promise<void>;

export const netLogout: NetLogout = (data, appName) => {
  const sign = addSign(decryptAES(data.deviceInfo) + decryptAES(data.thirdInfo) + decryptAES(data.uid));
  const { pname } = getLogParams(appName);
  const { logoutApi, header } = getServerApi(appName, sign, pname);
  return postFetch(logoutApi, { header, data });
}
