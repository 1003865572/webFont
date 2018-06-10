const axios = require('axios')
const querystring = require('query-string')

const baseUrl = 'https://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const needAccessToken = req.query.needAccessToken
  console.log(user)
  if (needAccessToken && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'need login'
    })
    return
  }

  const query = Object.assign({}, req.query, {
    accesstoken: (needAccessToken && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: querystring.stringify(Object.assign({}, req.body, {
      accesstoken: (needAccessToken && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(resp => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch(err => {
    if (err.response) {
      delete err.response.request
      delete err.response.request
      res.status(err.response.status).send({
        success: false,
        data: err.response.data
      })
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
