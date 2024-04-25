import { AnyObject } from "@/typings/index.interfaces";
import { getUserLandId, isIos, randomString } from "@/utils/tools";
import { AppName, getLogParams } from "@/utils/getLogParams";

interface ILogParams {
  appName: AppName;
  event: string;
  data: AnyObject;
}

/**
 * 前端自打点
 * @param params key值
 */
export const netHiveLog = (params: ILogParams) => {

  const { bline, server_hive, pname } = getLogParams(params.appName);

  const logData = {
    log_id: randomString(16),// 随机生成,16位字符串即可
    bline, // bline: "db" | "wf" | "nr" | "kf" | "ft"
    pline: isIos ? 'ios' : 'android',
    pkna: pname,
    cts: new Date().getTime(),
    app_version: '1.0.0',
    chid: params.data?.chid ? (params.data.chid || '') : '',
    uid: getUserLandId(),
    imei: '',
    oaid: '',
    idfa: '',
    type: 'h5_delete',
    event: `${params.event}`,
    data: params.data,
  }
  const queryStr = JSON.stringify(logData);

  fetch(`${server_hive}?json=${encodeURIComponent(queryStr)}`, {
    method: "GET",
    keepalive: true
  }).catch(error => console.log('Error:', error))
}
