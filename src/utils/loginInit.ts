import vConsole from "vconsole";
import { ILoginData } from "@/typings/index.interfaces";
import { debounce } from "throttle-debounce";
new vConsole();

interface IProps {
  appId: string;
  clientId: string;
  onGGSuccess: (res: any) => void;
}

// 再次尝试sdk加载
const againGoogleSdk = (clientId: string, onGGSuccess: (res: any) => void) => {
  const scriptDom = document.createElement('script');
  scriptDom.src = "https://accounts.google.com/gsi/client";
  scriptDom.async = true;
  const sDom = document.getElementsByTagName('script')[0];
  sDom.parentNode?.insertBefore(scriptDom, sDom);
  sDom.onload = function () {
    console.log('---------------againGoogleSdk---------------');
    try {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: onGGSuccess,
        context: "signin",
        // itp_support: true,
        use_fedcm_for_prompt: false,
      });
      console.log('-------------google 初始化2----------------');
    }catch (e) {
      console.log('-------------google init 失败 2----------------');
    }

  }
}

const initGoogle = (clientId: string, onGGSuccess: (res: any) => void) => {
  const _google = window.google;
  if (!_google) {
    console.log('-------------google sdk 加载失败 1------------');
    againGoogleSdk(clientId, onGGSuccess);
    return
  }
  try {
    // @ts-ignore
    _google.accounts.id.initialize({
      client_id: clientId,
      callback: onGGSuccess,
      context: "signin",
      // itp_support: true,
      use_fedcm_for_prompt: false,
    });
    console.log('-------------google 初始化----------------');
  } catch (e) {
    againGoogleSdk(clientId, onGGSuccess);
    console.log('-------------google init 失败 1----------------');
  }
}

// 再次尝试sdk加载
const againFacebookSdk = (appId: string) => {
  const scriptDom = document.createElement('script');
  scriptDom.src = "https://connect.facebook.net/en_US/sdk.js";
  scriptDom.async = true;
  // @ts-ignore
  scriptDom.crossorigin = "anonymous"
  const sDom = document.getElementsByTagName('script')[0];
  sDom.parentNode?.insertBefore(scriptDom, sDom);
  sDom.onload = function () {
    console.log('---------------againFacebookSdk---------------');
    try {
      // @ts-ignore
      window.fbAsyncInit = function () {
        var FB = window.FB;
        FB.init({ appId, xfbml: true, version: 'v19.0' });
        console.log('-------------facebook 初始化2----------------');
      }
    } catch (e) {
      console.log('-------------facebook init 失败 2----------------');
    }

  }
}

const initFacebook = (appId: string) => {
  function getFB () {
    try {
      var FB = window.FB;
      if (!FB) {
        againFacebookSdk(appId)
        console.log('-------------facebook sdk 加载失败 1-------------');
        return;
      }
      FB.init({ appId, xfbml: true, version: 'v19.0' });
      console.log('-------------facebook 初始化----------------');
    } catch (e) {
      againFacebookSdk(appId)
      console.log('-------------facebook init 失败 1-------------');
    }
  }
  getFB();
  window.fbAsyncInit = function () {
    getFB()
  }
}

// 初始化
export const loginInit = debounce(300, (props: IProps) => {
  console.log('-------SDK 初始化----------');
  initGoogle(props.clientId, props.onGGSuccess);
  googleBtn("google_btn");
  initFacebook(props.appId);
}, { atBegin: true })

// facebook 登陆
export const facebookBtn = (onSuccess: (data: ILoginData) => void, onFail: () => void) => {
  var FB = window.FB;
  if (!FB) {
    console.log('facebook sdk 加载失败');
    onFail()
  }
  try {
    FB.login(function (response: any) {
      if (response.authResponse) {
        FB.api('/me', {fields: 'name, email, picture'}, function(meRes: any) {
          console.log('response me', meRes);
          onSuccess({
            bindId: meRes.id || "",
            email: meRes.email || "",
            avatar: meRes.picture.data.url,
            userName: meRes.name,
            loginType: "facebook",
          });
        });
      } else {
        onFail()
        console.log('User cancelled login or did not fully authorize.', response);
      }
    }, { scope: "public_profile,email" });
  } catch (e) {
    onFail()
    console.log('facebook init 加载失败');
  }
}

// google btn
export const googleBtn = (elementId: string) => {
  const _google = window.google;
  if (!_google) {
    console.log('-------------google sdk 加载失败------------');
    return
  }
  try {
    const parent = document.getElementById(elementId);
    _google.accounts.id.renderButton(parent, {});
    _google.accounts.id.prompt();
  } catch (e) {
    console.log('google init 失败');
    // againGoogleSdk();
  }
}
