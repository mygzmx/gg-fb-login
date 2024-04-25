import { AppName, getLogParams } from "@/utils/getLogParams";
import { getUserLandId, isAndroid, isIos } from "@/utils/tools";


export const SensorInit = (appName: AppName) => {
  const { bline } = getLogParams(appName);

  // @ts-ignore
  var sensors = window['sensorsDataAnalytic201505'];
  const sever_sensors = "https://sc-sa.dzfread.cn/sa?project=W_test";
  // const sever_sensors = "https://xxx";
  sensors.init({
    server_url: sever_sensors,
    is_track_single_page: false, // !important
    name: 'sensors',
    cross_subdomain: false, // 不同域名不同用户
    use_client_time: true,
    send_type: 'beacon', // ajax beacon
    // heatmap: {}, // 全埋点
    show_log: false, // window.location.hostname === 'landpage.hw.dzods.cn', // 设置 true 后会在网页控制台打 logger，会显示发送的数据,设置 false 表示不显示。
  });

  // 注册公共属性
  sensors.registerPage({
    referrer: document.referrer,
    b_line: bline, // 业务线
    p_line: isIos ? 'ios' : (isAndroid ? 'android' : 'incompatible'), // 产品线
    landpage_type: "站外H5注销", //	落地页类型
    page_version: "", // 页面版本
    last_update: "20240418",
    uni_id: getUserLandId(), // 唯一标识
    url: window.location.href,
    channel_code: "", // 渠道号
    ua: navigator.userAgent,
  });


  return sensors;
}
