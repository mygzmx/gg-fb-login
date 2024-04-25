export interface AnyObject {
  [key: string]: any;
}

export interface IUserInfo {
  userId: string;
  userName?: string;
  avatar?: string;
}

export interface INetLoginReq {
  loginType: "google" | "facebook";
  bindId: string; // [google|facebook]的bindId即用户唯一编号 非AES加密
  email: string; // email地址 非AES加密
}

// 用户状态 0 正常 1 已注销
export enum EUserStatus {
  Normal = 0,
  Unregistered= 1
}

export interface INetLoginRes {
  haveUser: boolean; // 是否找到用户
  uid: string; // 用户ID  AES加密
  userStatus: EUserStatus;
  deviceInfo: string; // 安卓用户的默认渠道号+用户邮箱的AES加密字符串
  thirdInfo: string; // 用户三方设备brandId和uid的AES加密字符串
}

export interface INetLogoutReq {
  uid: string; // 用户Id AES加密字符串
  loginType: "google" | "facebook";
  bindId: string; // 三方的绑定id AES加密字符串
  plineEnum?: 'WEBFIC' | 'NOVELREAD'  | 'GOSTORY' | 'KRFIC' | 'DRAMABOX'
  deviceInfo: string; // 安卓用户的默认渠道号+用户邮箱的AES加密字符串
  thirdInfo: string; // 用户三方设备brandId和uid的AES加密字符串
}

// 三方登陆获取信息
export interface ILoginData {
  loginType: "google" | "facebook";
  avatar: string;
  bindId: string;
  email: string;
  userName: string;
}
