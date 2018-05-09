const urllib = require('url');
const http = require('http');
const pathlib = require('path');
const fs = require('fs');
const https = require('https');

// let url = 'https://reactjs.org/docs/hello-world.html'
// let url = 'https://www.baidu.com'
let url = 'http://www.taobao.com'

let req = http.request(url, res => {
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