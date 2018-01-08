import originalJsonp from 'jsonp'

/*
    利用jsonp插件和promise封装一个新的jsonp方法
*/
export default function jsonp (url, data, option) { // url是一个完整的路径
    // originalUrl--->https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg    
    // {g_tk: 1928093487, inCharset: "utf-8", outCharset: "utf-8", notice: 0, format: "jsonp"…}
    url += (url.indexOf('?') === -1 ? '?' : '&') + param(data)
    // formatUrl--->https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=192…f-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1
    return new Promise((resolve, reject) => {
        originalJsonp(url, option, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param (data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    // 删掉第一个 &
    return url ? url.substring(1) : ''
    // type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0
}
