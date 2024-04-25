import { AnyObject } from "@/typings/index.interfaces";
import { AppName } from "@/utils/getLogParams";
import { useEffect, useState } from "react";
import { SensorInit } from "@/utils/sensorLog";
import { netHiveLog } from "@/utils/netHiveLog";
import { isIos } from "@/utils/tools";

interface IHiveLog {
  track: (event: string, data?: AnyObject) => void;
}

enum EnumEvent {
  deleteLogoutPv = "未登录页面曝光",
  deleteLogoutClick = "未登录页面按钮点击",
  deleteLoginPv = "登录页面曝光",
  deleteLoginClick = "登录页面按钮点击",
  deletePopupPv = "挽留弹窗曝光",
  deletePopupClick = "挽留弹窗点击",
  outDeleteSuccess = "删除成功",
  outDeleteFailed = "删除失败",
}


const useHiveLog = (appName: AppName): IHiveLog => {
  const [sensorLog, setSensorLog] = useState();

  useEffect(() => {
    const _sensors = SensorInit(appName);
    setSensorLog(_sensors);
  }, []);

  const track = (event: string, data?: AnyObject) => {
    // @ts-ignore
    console.log(`-------------event ${EnumEvent[event]}--${event}-----------------`, JSON.stringify(data))
    const _data = data ? data : {};
    netHiveLog({
      event,
      data: {
        product_line: appName,
        os: isIos ? 'IOS' : '安卓',
        ..._data,
      },
      appName,
    });
    if (sensorLog && Reflect.has(sensorLog, 'track')) {
      // @ts-ignore
      sensorLog.track(event, {
        product_line: appName,
        os: isIos ? 'IOS' : '安卓',
        ...data,
      })
    }
  }

  return {
    track
  }
};

export default useHiveLog;
