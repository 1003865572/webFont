const urllib = require('url');
const http = require('http');
const pathlib = require('path');
const fs = require('fs');
const https = require('https');

// let url = 'https://reactjs.org/docs/hello-world.html'
// let url = 'https://www.baidu.com'

function requestUlr (url, headers) {
    const urlObj = urllib.parse(url);
    let httpMod = null
    if (urlObj.protocol === 'http:') {
        httpMod = http;
    } else if (urlObj.protocol === 'https:') {
        httpMod = https;
    } else {
        throw new Error(`协议无法识别：${urlObj.protocol}`);
    }
    return new Promise((resolve, reject) => {
        let url = 'http://www.taobao.com'

        let req = http.request({
            host: 'www.taobao.com',
            path: '/',
            headers: {}
        }, res => {
            const { statusCode } = res;
            if (statusCode >= 200 && statusCode < 300 || statusCode === 304) {
                var ws = fs.createWriteStream(pathlib.resolve('tmp', 'taobao.html'))
                res.pipe(ws)
            } else if (statusCode === 302) {
                console.log('失败', statusCode);
                console.log(res.headers);
            }
        })

        req.write('');
        req.end();
    })
}

