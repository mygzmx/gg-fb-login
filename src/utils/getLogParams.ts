import { isIos } from "@/utils/tools";
import { AnyObject } from "@/typings/index.interfaces";

export type AppName = "DramaBox" | "소설더미" | "NovelRead" | "Webfic" | "小說大全" | "小說快讀" | "小說閱讀吧";
export type GetLogParams = (appName: AppName) => { bline: string; server_hive: string; pname: string }

export const getLogParams: GetLogParams = (appName) => {
  let bline = "", server_hive = "https://log.dramaboxdb.com/h5_stand_final_log.php", pname = '';
  switch (appName) {
    case "DramaBox":
      bline = "db";
      server_hive = "https://log.dramaboxdb.com/h5_stand_final_log.php";
      pname = "com.storymatrix.drama";
      break;
    case "Webfic":
      bline = "wf";
      server_hive = "https://log.webfic.com/h5_stand_final_log.php";
      pname = isIos ? "com.ywwebfic.webficnovel" : "com.webfic.novel";
      break;
    case "NovelRead":
      bline = "nr";
      server_hive = "https://log.novelread.com/h5_stand_final_log.php";
      pname = "com.booksource.novelread";
      break;
    case "소설더미":
      bline = "kf";
      server_hive = "https://log.krfic.com/h5_stand_final_log.php";
      pname = "com.booksource.krfic";
      break;
    case "小說閱讀吧":
      bline = "ft";
      server_hive = "https://log.klynf.com/h5_stand_final_log.php";
      pname = isIos ? "com.xsydbfcp.jxbxiaoshuoyueduba" : "com.book.rmxs";
      break;
    case "小說大全":
      bline = "ft";
      server_hive = "https://log.klynf.com/h5_stand_final_log.php";
      pname = "com.dz.xsdq";
      break;
    case "小說快讀":
      bline = "ft";
      server_hive = "https://log.klynf.com/h5_stand_final_log.php";
      pname = isIos ? "com.zqzol.quanbenxiaoshuo" : "com.yj.xskd";
      break;
  }

  return { bline, server_hive, pname }
}

export type GetServerApi = (appName: AppName, sign: string, pname: string) => { loginApi: string; logoutApi: string; header: AnyObject }

export const getServerApi: GetServerApi = (appName, sign, pname) => {
  // const baseUrlFt = "https://241.qcread.cn/asg/portal/h5/thirdCancel";
  const baseUrlFt = "/asg/portal/h5/thirdCancel";
  const baseUrlEn = "/webfic/ur001"; // http://192.168.8.238:8082/webfic/ur001
  // const baseUrlDb = "https://drama.hw.dzods.cn/drama-box/ur001";
  const baseUrlDb = "/drama-box/ur001";

  let loginApi = "", logoutApi = "";
  const header = { pline: "ANDROID" };
  if (appName === "小說快讀" || appName === "小說大全" || appName === "小說閱讀吧") {
    // "https://241.qcread.cn/asg/portal/h5/thirdCancel";
    loginApi = baseUrlFt + "/thirdUserInfo.do";
    logoutApi = baseUrlFt + "/thirdUserCancellation.do";
    Reflect.set(header, "tn", sign);
    Reflect.set(header, "pname", pname);
  } else if (appName === "Webfic" || appName === "NovelRead" || appName === "소설더미") {
    // http://192.168.8.238:8082/webfic/ur001
    loginApi = baseUrlEn + "/thirdUserInfo";
    logoutApi = baseUrlEn + "/thirdUserCancellation";
    Reflect.set(header, "sn", sign);
    Reflect.set(header, "package-name", pname);
    Reflect.set(header, "p", 15);
  } else if (appName === "DramaBox") {
    // "https://drama.hw.dzods.cn/drama-box/ur001";
    loginApi = baseUrlDb + "/thirdUserInfo";
    logoutApi = baseUrlDb + "/thirdUserCancellation";
    Reflect.set(header, "sn", sign);
    Reflect.set(header, "package-name", pname);
  }

  return { loginApi, logoutApi, header }
}
