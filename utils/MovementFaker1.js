const https = require('https');
const path = require('path');
const vm = require('vm');
const { R_OK } = require('fs').constants;
const fs = require('fs').promises;
const JS_REGEX = /smash-h5\/index\.js":(([\d\D])+?(!function([\d\D])+?)},"\.\/node_modules)/gmi
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36';
//'okhttp/3.12.1;jdmall;android;version/9.5.4;build/88136;screen/1440x3007;os/11;network/wifi;';
const SCRIPT_URL = 'https://storage11.360buyimg.com/tower/babelnode/js/vendors.683f5a61.js';
let smashUtils;
const DATA = {appid:'50087',sceneid:'JLHBhPageh5',id:"h5launch",uid:"-1"};
class MoveMentFaker {
  constructor() {
  }

  async run() {
    if (!smashUtils) {
      await this.init();
    }
    var t = Math.floor(1e7 + 9e7 * Math.random()).toString();
    var e = await smashUtils.get_risk_result({
      id: DATA.id,
      data: {
        random: t
      }
    }).log;
    var o = JSON.stringify({
      followShop: 0,
      log: e || -1,
      random: t,
      sceneid: DATA.sceneid
    })
    return o;
  }

  async init() {
    var window = {},
        document = {},
        navigator = {},
        screen = {},
        T = {},
        location2 = {};
    try {
      process.chdir(__dirname);
      const jsContent = await this.getJSContent(path.basename(SCRIPT_URL), SCRIPT_URL);
      const fnMock = new Function;
      const ctx = {
        window: {
          addEventListener: fnMock ,
          innerHeight: GetRandomNum(1000, 1800),
          innerWidth: GetRandomNum(400, 700),
          devicePixelRatio: GetRandomNum(1, 3), //设备像素差
        },
        document: {
          addEventListener: fnMock,
          removeEventListener: fnMock,
          cookie: "mba_muid=16474217306251324452805; __jda=233249292.16474217306251324452805.1647421730.1649261534.1650801811.4; __jdv=233249292%7Cdirect%7C-%7Cnone%7C-%7C1650801811864; mba_sid=16508018118662648489497087058.10; __jdc=233249292; __jd_ref_cls=Mnpm_ComponentApplied; joyytoken=50087MDF0SXJFcjAyMQ==.RX9HcUFFf0B0S0d8SjtFQDkCLRUSfR4gDEVlRGlEWHgMdwxFNxMHRzMjJi5KEzhDAzZDBB08Ai5+JR8FCg==.fe11cc98"
        },
        screen :{
          availHeight: GetRandomNum(1000, 1800),
          availWidth: GetRandomNum(400, 700),
          height: GetRandomNum(1000, 1800),
          width: GetRandomNum(400, 700),
          colorDepth: 32 //屏幕颜色深度,电脑一般24,手机32
        },
        // navigator : {
        //   appCodeName: "Mozilla",
        //   appName: "Netscape",
        //   hardwareConcurrency: 'xx', //CPU核心数,手机为xx
        //   language: "zh-CN",
        //   cookieEnabled: true,
        //   platform: 'iphone', //运行系统:iphone,Win32,Win64
        //   doNotTrack: 'xx', //电脑为空,手机为xx
        //   userAgent: '',
        //   vendor: 'Apple Computer, Inc.', //苹果系统:Apple Computer, Inc.   电脑系统:Google Inc.
        //   product: 'Gecko',
        //   productSub: "20030107",
        //   connection: {
        //     downlink: 10,
        //     effectiveType: "4g",
        //     onchange: null,
        //     rtt: 50,
        //     saveData: false
        //   }
        // },
        T : {
          "q": -88545,
          "appid": "",
          "etid": "1,2,3,4,5,6,7,8",
          "cf_v": "02",
          "encrypt_id": "1,6,6,1",
          "openMonitor": "0",
          "openPre": "0",
          "collectStatus": "1",
          "collect_vote": "100",
          "collect_rate": "120",
          "joyytoken": "MDFtb0xHRDAyMQ==.XFl4cHxeVntzfFRXfjkIWR0OfyNaXn1wOlxDemtyQV4ydTpcETI=.760052d1",
          "default_encrypt_id": "1,3,*,1",
          "default_cf_v": "00",
          "code": 0,
          "xcd": "c1"
        },
        Int_Bool : true,
        navigator: { userAgent: UA }
      };

      vm.createContext(ctx);
      vm.runInContext(jsContent, ctx);
      smashUtils = ctx.window.smashUtils;
      var ae = {
        getCookie: function (t) {
          var e, n = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
          return (e = document.cookie.match(n)) ? unescape(e[2]) : null
        }
      };
      //DATA = {appid:'50087',sceneid:'JLHBhPageh5',id:"h5launch",uid: "-1"};
      smashUtils.init(DATA);

    } catch (e) {
      console.log(e)
    }
  }

  async getJSContent(cacheKey, url) {
    try {
      await fs.access(cacheKey, R_OK);
      const rawFile = await fs.readFile(cacheKey, { encoding: 'utf8' });
      return rawFile;
    } catch (e) {
      let jsContent = await MoveMentFaker.httpGet(url);
      let matchResult = JS_REGEX.exec(jsContent);
      if (matchResult && matchResult.length != 0) {
        jsContent = matchResult[3];
      }
      fs.writeFile(cacheKey, jsContent);
      return jsContent;
    }
  }

  static httpGet(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.indexOf('http') !== 0 ? 'https:' : '';
      const req = https.get(protocol + url, (res) => {
        res.setEncoding('utf-8');

        let rawData = '';

        res.on('error', reject);
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => resolve(rawData));
      });

      req.on('error', reject);
      req.end();
    });
  }
}

async function getBody($) {
  //$.cookie = "__jdv=122270672%7Cdirect%7C-%7Cnone%7C-%7C1647768014940;__jdc=122270672;__jda=122270672.1647768014939577684719.1647768014.1647768014.1647771555.2;joyytoken=50087MDFGeUVaUDAyMQ==.d09xbWdxS3xpYnZMfCRlME01Y2h3QQMZLndVc3Zmakg7aC53Bzs=.714d2241;__jd_ref_cls=Babel_dev_expo_other_Taskredpacket;mba_muid=1647768014939577684719.1.1647773021472";
  const zf = new MoveMentFaker(null);
  // const zf = new MoveMentFaker($.secretp, $.cookie);
  const ss = await zf.run();

  return ss;
}
function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
};
MoveMentFaker.getBody = getBody;
module.exports = MoveMentFaker;