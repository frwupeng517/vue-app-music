import originalJsonp from 'jsonp'

/*
    利用jsonp插件和promise封装一个新的jsonp方法
*/
export default function jsonp (url, data, option) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + param(data)
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

export function param (data) {
    let url = ''
    for (var k in data) {
        let value = data[k] !== undefined ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    // 删掉第一个 &
    return url ? url.substring(1) : ''
}
