import React from 'react';
import axios from 'axios'

/* eslint-disable */
export default class ApiTest extends React.Component {
  getMarkAll = () => {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
  getTopics = () => {
    axios.get('/api/topics')
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err);
      })
  }
  login = () => {
    axios.post('/api/user/login', {
      accessToken: 'ffd8ab88-029c-41fc-b62e-786d2fcfff1d',
    }).then((res) => {
      console.log(res);
    })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div >
        <button onClick={this.login} >login</button>
        <button onClick={this.getTopics} >topics</button>
        <button onClick={this.getMarkAll} >markAll</button>
      </div>
    )
  }
}
/* eslint-ensable */
