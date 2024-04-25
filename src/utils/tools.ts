export const randomString = (len?: number | undefined) => {
  len = len || 16;
  const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = $chars.length;
  let pwd = '';
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

export const getUserLandId = () => {
  const userlandId = window.localStorage.getItem('USER_LANDPID');
  if (!userlandId) {
    const _id = randomString();
    window.localStorage.setItem('USER_LANDPID', _id);
    return _id
  }
  return userlandId;
}


export const isIos = /macintosh|mac_powerpc|mac os x/i.test(navigator.userAgent.toLowerCase()) || /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(navigator.userAgent) || /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());

export const isAndroid = /AppleWebKit.*Mobile.*/.test(navigator.userAgent) && (/android/.test(navigator.userAgent.toLowerCase()) || navigator.userAgent.indexOf('Adr') > -1);
