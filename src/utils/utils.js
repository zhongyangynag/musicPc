export function checkBrowser() {
    const browser = {
        versions: (function () {
            let u = navigator.userAgent
            // app = navigator.appVersion;
            return {
                //移动终端浏览器版本信息
                trident: u.indexOf("Trident") > -1, //IE内核
                presto: u.indexOf("Presto") > -1, //opera内核
                webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
                gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
                iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf("iPad") > -1, //是否iPad
                webApp: u.indexOf("Safari") == -1 //是否web应该程序，没有头部与底部
            };
        })(),
        language: (
            navigator.browserLanguage || navigator.language
        ).toLowerCase()
    };
    // console.log(this.$route.query)
    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (browser.versions.ios) {
            if (ua.match(/ipad/i) == "ipad") {
                return 3 //ipad
            } else {
                return 2 //iphone
            }
            //是否在IOS浏览器打开

        }
        if (browser.versions.android) {
            //是否在安卓浏览器打开
            console.log('安卓浏览器打开')
            return 1 //安卓
        }
    } else {
        //否则就是PC浏览器打开
        console.log('PC浏览器打开')
        return 0 //pc

    }
}

//检查当前歌曲是否可用
export function check(val) {
    return new Promise((resolve, reject) => {
        this.request({
                method: "get",
                url:  "/check/music",
                params: {
                    id: val,

                }
            }
        ).then(res => {
            resolve(res)

        }).catch(error => {
            reject(error)
        })
    })

}

//获取歌曲播放地址
export function getSong(val) {
    return new Promise((resolve, reject) => {
        this.request({
                method: "get",
                url:  "/song/url",
                params: {
                    id: val,
                }
            }
        ).then(res => {
            resolve(res)

        }).catch(error => {
            reject(error)
        })
    })

}


export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}


