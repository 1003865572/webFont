const router = require('express').Router()
const axios = require('axios')

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', (req, res, next) => {
  axios.post(`${baseUrl}/accesstoken`, {})
    .then(resp => {
      if (resp.status === 200 && resp.data.success) {
        res.session.user = {
          accessToken: req.body.accesstoken,
          loginName: resp.data.loginname,
          id: resp.data.id,
          avatarUrl: resp.data.avatar_url
        }
        res.json({
          success: true,
          data: resp.data
        })
      }
    })
    .catch(err => {
      if (err.response) {
        res.json({
          success: false,
          data: err.response
        })
      } else {
        next(err)
      }
    })
})

module.exports = router
